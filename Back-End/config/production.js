module.exports = {
  log: {
    level: "info",
    disabled: false,
  },

  cors: {
    origins: ["http://localhost:3000", "https://hogent-web.github.io"],
    maxAge: 3 * 60 * 60,
  },
  database: {
    client: "mysql2",
    name: "webproject",
    host: "localhost",
    port: 3306,
  },
  auth: {
    argon: {
      saltLength: 16,
      hashLength: 32,
      timeCost: 6,
      memoryCost: 2 ** 17,
    },
    jwt: {
      expirationInterval: 60 * 60 * 1000, // ms (1 hour)
      issuer: "http://localhost:3000",
      audience: "http://localhost:3000",
    },
  },
};
