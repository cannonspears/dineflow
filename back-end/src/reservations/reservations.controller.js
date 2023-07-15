const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const hasRequiredProperties = hasProperties(
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
      message: `"People" must be a number and greater than 1.`,
    });
  }
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
    hasRequiredProperties,
    validateHasOnlyCorrectProperties,
    validatePeopleProperty,
    asyncErrorBoundary(create),
  ],
};
