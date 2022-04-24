const Role = require("../../core/roles");

module.exports = {
  seed: async (knex) => {
    // first delete all entries
    await knex("user").delete();

    // then add the fresh places
    await knex("user").insert([
      {
        userId: "1",
        voornaam: "bram",
        achternaam: "de coster",
        email: "bram.decoster1@gmail.com",
        geboorteDatum: 4042001,
        password:
          "$argon2id$v=19$m=131072,t=6,p=1$tD2yqa0FRCsHI8Zu3SzvrQ$Ey9R+dDoPqB6waJmqZ6odHc19/RP3/m2p6T8bqzfspQ",
        roles: "admin",
      },
      {
        userId: "2",
        voornaam: "test",
        achternaam: "user",
        email: "test.user@gmail.com",
        geboorteDatum: 1511200,
        password:
          "$argon2id$v=19$m=131072,t=6,p=1$lpQ9IiaPIU/l7DhOSZM8vQ$Kdl6q9QkhYnxUWDgVzdQxEXCjQLk/1cjDfP5zlab9ss",
        roles: "user",
      },
    ]);
  },
};
