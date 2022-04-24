const { tables } = require("../../src/data");
const { withServer, loginAdmin } = require("../supertest.setup");

const data = {
  producten: [
    {
      productId: 4,
      verkoperId: 1,
      naam: "testProduct4",
      prijs: 10.0,
      aantal: 50,
      beschrijving: "test",
    },
    {
      productId: 5,
      verkoperId: 1,
      naam: "testProduct5",
      prijs: 15.0,
      aantal: 70,
      beschrijving: "test test",
    },
    {
      productId: 6,
      verkoperId: 2,
      naam: "testProduct6",
      prijs: 20.5,
      aantal: 10,
      beschrijving: "test test test",
    },
  ],
};

const dataToDelete = {
  producten: [4, 5, 6],
};

describe("producten", () => {
  let request;
  let knex;
  let loginHeader;

  withServer(({ knex: k, supertest: s }) => {
    knex = k;
    request = s;
  });

  beforeAll(async () => {
    loginHeader = await loginAdmin(request);
  });

  const url = "/api/product";

  describe("GET /api/product/", () => {
    beforeAll(async () => {
      await knex(tables.product).insert(data.producten);
    });

    afterAll(async () => {
      await knex(tables.product)
        .whereIn("productId", dataToDelete.producten)
        .delete();
    });

    test("it should 200 and paginate the list of products", async () => {
      const response = await request
        .get(`${url}/`)
        .set("Authorization", loginHeader);
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(3);
      expect(response.body[0]).toEqual({
        productId: 4,
        verkoperId: 1,
        naam: "testProduct4",
        prijs: 10.0,
        aantal: 50,
        beschrijving: "test",
      });
      expect(response.body[1]).toEqual({
        productId: 5,
        verkoperId: 1,
        naam: "testProduct5",
        prijs: 15.0,
        aantal: 70,
        beschrijving: "test test",
      });
      expect(response.body[2]).toEqual({
        productId: 6,
        verkoperId: 2,
        naam: "testProduct6",
        prijs: 20.5,
        aantal: 10,
        beschrijving: "test test test",
      });
    });
  });

  describe("GET /api/product/:productNaam", () => {
    beforeAll(async () => {
      await knex(tables.product).insert(data.producten[0]);
    });

    afterAll(async () => {
      await knex(tables.product)
        .where("productId", dataToDelete.producten[0])
        .delete();
    });

    test("it should 201 and return the requested product", async () => {
      const productNaamTest = data.producten[0].naam;
      const response = await request
        .get(`${url}/${productNaamTest}`)
        .set("Authorization", loginHeader);

      expect(response.status).toBe(200);
      expect(response.body[0]).toEqual({
        productId: 4,
        verkoperId: 1,
        naam: productNaamTest,
        prijs: 10.0,
        aantal: 50,
        beschrijving: "test",
      });
    });
  });

  describe("POST /api/product/addProduct", () => {
    const productenToDelete = [];

    afterAll(async () => {
      await knex(tables.product)
        .whereIn("productId", productenToDelete)
        .delete();
    });

    test("it should 201 and return the added product", async () => {
      const response = await request
        .post(`${url}/addProduct`)
        .set("Authorization", loginHeader)
        .send({
          naam: "testProduct7",
          verkoperId: 3,
          prijs: 25,
          aantal: 200,
          beschrijving: "test x 5",
        });

      expect(response.status).toBe(201);
      expect(response.body[0].productId).toBeTruthy();
      expect(response.body[0].verkoperId).toBe(3);
      expect(response.body[0].naam).toBe("testProduct7");
      expect(response.body[0].prijs).toBe(25);
      expect(response.body[0].aantal).toBe(200);
      expect(response.body[0].beschrijving).toBe("test x 5");

      productenToDelete.push(response.body[0].productId);
    });
  });

  describe("DELETE /api/product/deleteProduct/:productId", () => {
    beforeAll(async () => {
      await knex(tables.product).insert({
        productId: 100,
        verkoperId: 3,
        naam: "testProduct10",
        prijs: 2000,
        aantal: 50,
        beschrijving: "testtje",
      });
    });

    test("it should 204 and return nothing", async () => {
      const response = await request
        .delete(`${url}/deleteProduct/100`)
        .set("Authorization", loginHeader);
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });
  });
});
