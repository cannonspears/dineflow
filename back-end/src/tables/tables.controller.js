const service = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

// Application Middleware/Validators
const validateHasRequiredProperties = hasProperties("table_name", "capacity");

const VALID_PROPERTIES = ["table_name", "capacity"];

function validateHasOnlyCorrectProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );
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

function validateCapacityProperty(req, res, next) {
  const { data: { capacity } = {} } = req.body;
  if (!+capacity) {
    return next({
      status: 400,
      message: `"capacity" must be a number.`,
    });
  } else if (capacity < 1) {
    return next({
      status: 400,
      message: `"capacity" must be at least 1.`,
    });
  } else {
    next();
  }
}

function validateTableNameProperty(req, res, next) {
  const { data: { table_name } = {} } = req.body;
  if (table_name.length < 2) {
    return next({
      status: 400,
      message: `"table_name" must have 2 or more characters.`,
    });
  } else {
    next();
  }
}

async function validateTableExists(req, res, next) {
  const table = await service.read(req.params.table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({
    status: 404,
    message: `table ${req.params.table_id} cannot be found.`,
  });
}

async function validateReservationExists(req, res, next) {
  const { reservation_id } = req.body.data;
  if (!reservation_id) {
    next({
      status: 400,
      message: `"reservation_id" cannot be undefined.`,
    });
  }
  const reservation = await reservationsService.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `"reservation_id" ${reservation_id} cannot be found.`,
  });
}

function validateSeatedCapacity(req, res, next) {
  const { capacity, table_name } = res.locals.table;
  if (capacity < res.locals.reservation.people) {
    next({
      status: 400,
      message: `${table_name} does not have enough space.`,
    });
  } else {
    next();
  }
}

function validateReservationIsSeated(req, res, next) {
  const { status } = res.locals.reservation;

  if (status === "seated") {
    return next({
      status: 400,
      message: "Reservation already seated.",
    });
  }
  next();
}

function validateTableIsAvailable(req, res, next) {
  const reservation = res.locals.table.reservation_id;
  if (reservation !== null) {
    next({
      status: 400,
      message: `Table ${res.locals.table.table_name} is currently occupied.`,
    });
  }
  next();
}

function validateOccupiedTable(req, res, next) {
  const { table } = res.locals;

  if (!table.reservation_id) {
    return next({
      status: 400,
      message: `${table.table_name} is not occupied.`,
    });
  }
  next();
}

// RESTful API Functions
async function list(req, res, next) {
  res.status(200).json({ data: await service.list() });
}

async function create(req, res, next) {
  res.status(201).json({ data: await service.create(req.body.data) });
}

async function read(req, res, next) {
  res.status(200).json({ data: res.locals.table });
}

async function update(req, res) {
  const updatedTable = {
    ...req.body.data,
    table_id: res.locals.table.table_id,
  };

  const updatedReservation = {
    ...res.locals.reservation,
    reservation_id: res.locals.reservation.reservation_id,
    status: "seated",
  };

  await reservationsService.updateStatus(updatedReservation);

  res.status(202).json({ data: await service.update(updatedTable) });
}
async function destroy(req, res, next) {
  const updatedTable = {
    ...res.locals.table,
    reservation_id: null,
  };

  const reservation_id = res.locals.table.reservation_id;
  const reservation = await reservationsService.read(reservation_id);

  const updatedReservation = {
    ...reservation,
    status: "finished",
  };

  await reservationsService.updateStatus(updatedReservation);
  res.json({ data: await service.update(updatedTable) });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    validateBodyHasData,
    validateHasRequiredProperties,
    validateHasOnlyCorrectProperties,
    validateCapacityProperty,
    validateTableNameProperty,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(validateTableExists), asyncErrorBoundary(read)],
  update: [
    validateBodyHasData,
    asyncErrorBoundary(validateReservationExists),
    asyncErrorBoundary(validateTableExists),
    validateReservationIsSeated,
    validateSeatedCapacity,
    validateTableIsAvailable,
    asyncErrorBoundary(update),
  ],
  delete: [
    asyncErrorBoundary(validateTableExists),
    validateOccupiedTable,
    asyncErrorBoundary(destroy),
  ],
};
