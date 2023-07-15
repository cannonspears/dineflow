const knex = require("../db/connection");

function listByDate(date) {
  return knex("reservations").where({ reservation_date: date }).orderBy("reservation_time");
}

function create(reservation) {
  return knex("reservations").insert(reservation).returning("*");
}

module.exports = {
  listByDate,
  create,
};
