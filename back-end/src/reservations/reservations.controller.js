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
  }
  next();
}

function validateBodyHasData(req, res, next) {
  const data = req.body.data;
  if (!data) {
    return next({
      status: 400,
      message: `Request body must have data.`,
    });
  }
  next();
}

function validatePeopleProperty(req, res, next) {
  const { data: { people } = {} } = req.body;
  if (Number.isInteger(people) && people > 1) {
    next();
  } else {
    return next({
      status: 400,
      message: `"people" must be a number and greater than 1.`,
    });
  }
}

function validateDateProperty(req, res, next) {
  const { reservation_date } = req.body.data;
  const date = Date.parse(reservation_date);
  const newDay = new Date();
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
      message: `"reservation_date" must not be in the past.`,
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
  res.status(201).json({
    data: await service.create(req.body.data),
  });
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
    asyncErrorBoundary(create),
  ],
};
