const knex = require("../db/connection");

function create(table) {
  return knex("tables").insert(table).returning("*");
}

module.exports = {
  create,
};
