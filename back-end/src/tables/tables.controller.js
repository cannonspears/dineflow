const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const hasProperties = require("../errors/hasProperties");
const validateHasRequiredProperties = hasProperties("table_name", "capacity");

const VALID_PROPERTIES = ["table_name", "capacity"];

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

function validateCapacityProperty(req, res, next) {
  const { data: { capacity } = {} } = req.body;
  if (!+capacity) {
    return next({
      status: 400,
      message: `"capacity" must be a number.`,
    });
  } else if (+capacity < 1) {
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

async function list(req, res, next) {
  const data = await service.list();
  res.status(200).json({ data });
}

async function create(req, res, next) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}
s;

async function update(req, res) {
  const updatedTable = {
    ...req.body.data,
    table_id: res.locals.table.table_id,
  };

  const data = await service.update(updatedTable);
  res.status(200).json({ data });
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
  update: asyncErrorBoundary(update),
};
