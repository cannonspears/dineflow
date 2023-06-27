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

function hasOnlyValidProperties(req, res, next) {
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

async function list(req, res) {
  res.json({ data: await service.list() });
}

function nextId() {
  const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
  return uint32.toString(16);
}

async function create(req, res) {
  const newReservation = req.body.data;

  const now = new Date().toISOString();
  newReservation.reservation_id = nextId();
  newReservation.created_at = now;
  newReservation.updated_at = now;

  res.status(201).json({
    data: await service.create(req.body.data),
  });
}

module.exports = {
  list,
  create: [hasOnlyValidProperties, hasRequiredProperties, asyncErrorBoundary(create)],
};
