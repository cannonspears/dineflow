const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const validateHasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

function validateHasOnlyCorrectProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter((field) => !VALID_PROPERTIES.includes(field));

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  } else {
    next();
  }
}

function validateBodyHasData(req, res, next) {
  const data = req.body.data;
  if (!data) {
    return next({
      status: 400,
      message: `Request body must have data.`,
    });
  } else {
    next();
  }
}

function validatePeopleProperty(req, res, next) {
  const { data: { people } = {} } = req.body;
  if (!Number.isInteger(+people)) {
    return next({
      status: 400,
      message: `"people" in party must be a number.`,
    });
  } else if (people < 1) {
    return next({
      status: 400,
      message: `"people" in party must be at least 1.`,
    });
  } else {
    next();
  }
}

function validateDateProperty(req, res, next) {
  const { reservation_date } = req.body.data;
  const date = Date.parse(reservation_date);
  const dayOfTheWeek = new Date(date);
  if (dayOfTheWeek.getUTCDay() == 2) {
    return next({
      status: 400,
      message: `"reservation_date" must not be Tuesday.`,
    });
  } else if (date && date > 0) {
    return next();
  } else {
    return next({
      status: 400,
      message: `"reservation_date" must be a date`,
    });
  }
}

function validateDateIsNotInThePast(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  let day = new Date(`${reservation_date} ${reservation_time}`);
  if (day < new Date()) {
    return next({
      status: 400,
      message: `"reservation_date" and "reservation_time" must not be in the past.`,
    });
  } else {
    next();
  }
}

function validateTimeProperty(req, res, next) {
  const { reservation_time } = req.body.data;
  if (reservation_time < "10:30" || reservation_time > "21:30") {
    return next({
      status: 400,
      message: `"reservation_time" must be between 10:30 AM and 9:30 PM`,
    });
  } else {
    next();
  }
}

async function validateReservationExists(req, res, next) {
  const reservation = await service.read(req.params.reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `${req.params.reservation_id} cannot be found.`,
  });
}

function validateReservationIsBooked(req, res, next) {
  const { status } = req.body.data;
  if (status) {
    if (status === "seated" || status === "finished") {
      return next({
        status: 400,
        message: "Cannot create seated or finished reservation.",
      });
    }
    if (status === "booked") {
      return next();
    }
  }
  return next();
}

function validateStatusProperty(req, res, next) {
  const { status } = req.body.data;
  const validStatus = ["booked", "seated", "finished", "cancelled"];
  if (!validStatus.includes(status)) {
    return next({
      status: 400,
      message: `Status cannot be unknown`,
    });
  }
  res.locals.status = status;
  next();
}

function validateReservationIsFinished(req, res, next) {
  const { reservation } = res.locals;
  if (reservation.status === "finished") {
    return next({
      status: 400,
      message: `Status is currently finished`,
    });
  }
  next();
}

async function list(req, res) {
  const { date } = req.query;
  let data;
  if (date) {
    data = await service.listByDate(date);
  }
  res.json({ data });
}

async function create(req, res) {
  res.status(201).json({ data: await service.create(req.body.data) });
}

async function read(req, res, next) {
  res.status(200).json({ data: res.locals.reservation });
}

async function update(req, res, next) {
  const updatedReservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };
  res.json({ data: await service.updateStatus(updatedReservation) });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    validateBodyHasData,
    validateHasRequiredProperties,
    validateHasOnlyCorrectProperties,
    validatePeopleProperty,
    validateDateProperty,
    validateDateIsNotInThePast,
    validateTimeProperty,
    validateReservationIsBooked,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(validateReservationExists), asyncErrorBoundary(read)],
  update: [
    asyncErrorBoundary(validateReservationExists),
    validateStatusProperty,
    validateReservationIsFinished,
    asyncErrorBoundary(update),
  ],
};
