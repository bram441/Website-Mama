const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.verkoper, (table) => {
      table.increments("verkoperId").notNullable().primary();

      table.string("naam", 255).notNullable();

      table.string("land", 255).notNullable();

      table.string("tel", 500).notNullable();

      table.string("email", 255).notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.verkoper);
  },
};
