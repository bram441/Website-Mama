const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.user, (table) => {
      table.increments("userId").notNullable().primary();

      table.string("voornaam", 255).notNullable();

      table.string("achternaam", 255).notNullable();

      table.string("email", 255).notNullable();

      table.integer("geboorteDatum", 255).notNullable();

      table.string("password").notNullable();

      table.string("roles").notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.user);
  },
};
