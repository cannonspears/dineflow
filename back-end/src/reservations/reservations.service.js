const knex = require("../db/connection");

function listByDate(date) {
  return knex("reservations").where({ reservation_date: date }).orderBy("reservation_time");
}

function create(reservation) {
  return knex("reservations").insert(reservation).returning("*");
}

function read(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

module.exports = {
  listByDate,
  create,
  read,
};
