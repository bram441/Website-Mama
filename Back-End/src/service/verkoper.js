const { getChildLogger } = require("../core/logger");
const { tables, getKnex } = require("../data");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("verkoper-service");
  this.logger.debug(message, meta);
};

const getAllVerkopers = async () => {
  const verkopers = await getKnex()(tables.verkoper).select();
  return verkopers;
};

const getVerkopersByName = async (naam) => {
  const verkoperByName = await getKnex()(tables.verkoper)
    .select()
    .where("naam", naam);
  return verkoperByName;
};

const getVerkoperById = async (verkoperId) => {
  const verkoperByName = await getKnex()(tables.verkoper)
    .select()
    .where("verkoperId", verkoperId);
  return verkoperByName;
};

const addVerkoper = async ({ naam, land, tel, email }) => {
  let existingVerkoper = await getVerkopersByName(naam);

  if (existingVerkoper.length === 0) {
    try {
      debugLog("Creating new verkoper");
      const newVerkoper = await getKnex()(tables.verkoper).insert({
        naam,
        land,
        tel,
        email,
      });
      debugLog("Verkoper created");
      return await getVerkoperById(newVerkoper);
    } catch (error) {
      throw new Error("could not create new verkoper");
    }
  } else {
    throw new Error("Verkoper already exists");
  }
};

const deleteVerkoperByVerkoperId = async (verkoperId) => {
  try {
    await getKnex()(tables.verkoper)
      .delete()
      .where(`${tables.verkoper}.verkoperId`, verkoperId);
    debugLog("verkoper deleted");
  } catch (error) {
    throw new Error("could not delete verkoper");
  }
};

module.exports = {
  getAllVerkopers,
  getVerkopersByName,
  addVerkoper,
  deleteVerkoperByVerkoperId,
};
