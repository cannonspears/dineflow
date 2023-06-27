const knex = require("../db/connection");

function list() {
  return knex("reservations").select("*");
}

function create(reservation) {
  return knex("reservations").insert(reservation).returning("*");
}

module.exports = {
  list,
  create,
};
