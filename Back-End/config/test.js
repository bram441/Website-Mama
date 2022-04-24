module.exports = {
  log: {
    level: "silly",
    disabled: false,
  },
  cors: {
    origins: ["http://localhost:3000", "https://bram441.github.io"],
    maxAge: 3 * 60 * 60,
  },
  database: {
    client: "mysql2",
    host: "localhost",
    port: 3306,
    name: "webproject_test",
  },
  auth: {
    argon: {
      saltLength: 16,
      hashLength: 32,
      timeCost: 6,
      memoryCost: 2 ** 17,
    },
    jwt: {
      secret:
        "eenveelveelveeltemoeilijksecretdatniemandooitzalradenandersisdesitegehacked",
      expirationInterval: 60 * 60 * 1000, // ms (1 hour)
      issuer: "http://localhost:3000",
      audience: "http://localhost:3000",
    },
  },
};
