module.exports = {
  seed: async (knex) => {
    // first delete all entries
    await knex("verkoper").delete();

    // then add the fresh places
    await knex("verkoper").insert([
      {
        verkoperId: 1,
        naam: "verkoper1",
        land: "België",
        tel: "+324784955",
        email: "testverkoper1@gmail.com",
      },
      {
        verkoperId: 2,
        naam: "verkoper2",
        land: "canada",
        tel: "+14784955",
        email: "testverkoper2@gmail.com",
      },
      {
        verkoperId: 3,
        naam: "verkoper3",
        land: "frankrijk",
        tel: "+334784955",
        email: "testverkoper3@gmail.com",
      },
    ]);
  },
};
