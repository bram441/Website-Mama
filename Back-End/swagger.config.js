module.exports = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "huisdokter website swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Koa and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "huisdokterApi",
        url: "https://www.google.be/maps/place/Brugge/@51.2608697,3.1520689,12z/data=!3m1!4b1!4m5!3m4!1s0x47c350d0c11e420d:0x1aa2f35ac8834df7!8m2!3d51.2091807!4d3.2247552",
        email: "bram.decoster1@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:9000/",
      },
      {
        url: "https://bramdc-huisdokter-api.herokuapp.com/",
      },
    ],
  },
  apis: ["./src/rest/*.js"],
};
