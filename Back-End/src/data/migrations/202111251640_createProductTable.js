const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.product, (table) => {
      table.increments('productId')
        .notNullable()
        .primary();

      table.integer('verkoperId', 50)
        .notNullable();

      table.string('naam', 255)
        .notNullable();

      table.double('prijs', 255)
        .notNullable();

      table.integer('aantal', 255)
        .notNullable();
    
      table.string('beschrijving', 500)
        .notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.product);
  },
};