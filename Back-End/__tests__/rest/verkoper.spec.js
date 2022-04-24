const { tables } = require("../../src/data");
const { withServer, loginAdmin } = require("../supertest.setup");

const data = {
  verkopers: [
    {
      verkoperId: 4,
      naam: "verkoper4",
      land: "Belgie",
      tel: "+324784955",
      email: "testverkoper4@gmail.com",
    },
    {
      verkoperId: 5,
      naam: "verkoper5",
      land: "canada",
      tel: "+14784955",
      email: "testverkoper5@gmail.com",
    },
    {
      verkoperId: 6,
      naam: "verkoper6",
      land: "frankrijk",
      tel: "+334784955",
      email: "testverkoper6@gmail.com",
    },
  ],
};

const dataToDelete = {
  verkopers: [4, 5, 6],
};

describe("verkopers", () => {
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

  const url = "/api/verkoper";

  describe("GET /api/verkoper/", () => {
    beforeAll(async () => {
      await knex(tables.verkoper).insert(data.verkopers);
    });

    afterAll(async () => {
      await knex(tables.verkoper)
        .whereIn("verkoperId", dataToDelete.verkopers)
        .delete();
    });

    test("it should 200 and paginate the list of verkopers", async () => {
      const response = await request
        .get(`${url}/`)
        .set("Authorization", loginHeader);
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(3);
      expect(response.body[0]).toEqual({
        verkoperId: 4,
        naam: "verkoper4",
        land: "Belgie",
        tel: "+324784955",
        email: "testverkoper4@gmail.com",
      });
      expect(response.body[1]).toEqual({
        verkoperId: 5,
        naam: "verkoper5",
        land: "canada",
        tel: "+14784955",
        email: "testverkoper5@gmail.com",
      });
      expect(response.body[2]).toEqual({
        verkoperId: 6,
        naam: "verkoper6",
        land: "frankrijk",
        tel: "+334784955",
        email: "testverkoper6@gmail.com",
      });
    });
  });

  describe("POST /api/verkoper/addProduct", () => {
    const verkopersToDelete = [];

    afterAll(async () => {
      await knex(tables.verkoper)
        .whereIn("verkoperId", verkopersToDelete)
        .delete();
    });

    test("it should 201 and return the added verkoper", async () => {
      const response = await request
        .post(`${url}/addVerkoper`)
        .set("Authorization", loginHeader)
        .send({
          naam: "Testverkoper7",
          land: "België",
          tel: "+324784955",
          email: "testverkoper1@gmail.com",
        });

      expect(response.status).toBe(201);
      expect(response.body[0].verkoperId).toBeTruthy();
      expect(response.body[0].naam).toBe("Testverkoper7");
      expect(response.body[0].land).toBe("België");
      expect(response.body[0].tel).toBe("+324784955");
      expect(response.body[0].email).toBe("testverkoper1@gmail.com");

      verkopersToDelete.push(response.body[0].verkoperId);
    });
  });

  describe("DELETE /api/verkoper/deleteVerkoper/:verkoperId", () => {
    beforeAll(async () => {
      await knex(tables.verkoper).insert({
        verkoperId: 8,
        naam: "Testverkoper8",
        land: "België",
        tel: "+324784955",
        email: "testverkoper1@gmail.com",
      });
    });

    test("it should 204 and return nothing", async () => {
      const response = await request
        .delete(`${url}/deleteVerkoper/8`)
        .set("Authorization", loginHeader);
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });
  });
});
