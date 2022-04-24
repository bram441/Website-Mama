module.exports = {
  seed: async (knex) => {
    // first delete all entries
    await knex("product").delete();

    // then add the fresh places
    await knex("product").insert([
      {
        productId: 1,
        verkoperId: 1,
        naam: "Product1",
        prijs: 10.0,
        aantal: 50,
        beschrijving: "test",
      },
      {
        productId: 2,
        verkoperId: 1,
        naam: "Product2",
        prijs: 15.0,
        aantal: 70,
        beschrijving: "test test",
      },
      {
        productId: 3,
        verkoperId: 2,
        naam: "Product3",
        prijs: 20.5,
        aantal: 10,
        beschrijving: "test test test",
      },
    ]);
  },
};
