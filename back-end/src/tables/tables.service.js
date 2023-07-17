const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function create(table) {
  return knex("tables").insert(table).returning("*");
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

function update(updatedTable) {
  return knex("tables")
    .select("*")
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable, "*");
}

function destroy(table_id, reservation_id) {
  return knex.transaction(function (trx) {
    return trx("tables").where({ table_id: table_id }).update({ reservation_id: null });
  });
}

module.exports = {
  list,
  create,
  read,
  update,
  delete: destroy,
};
