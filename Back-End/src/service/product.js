const { getChildLogger } = require("../core/logger");
const { tables, getKnex } = require("../data");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("product-service");
  this.logger.debug(message, meta);
};

const getAllProducts = async () => {
  const producten = await getKnex()(tables.product).select();
  return producten;
};

const getProductByName = async (naam) => {
  const productByName = await getKnex()(tables.product)
    .select()
    .where("naam", naam);
  return productByName;
};

const getProductById = async (productId) => {
  const productByName = await getKnex()(tables.product)
    .select()
    .where("productId", productId);
  return productByName;
};

const addProduct = async ({
  verkoperId,
  naam,
  prijs,
  aantal,
  beschrijving,
}) => {
  let existingNaam = await getProductByName(naam);

  if (existingNaam.length === 0 || origineleNaam === existingNaam.naam) {
    try {
      const newProduct = await getKnex()(tables.product).insert({
        verkoperId,
        prijs,
        naam,
        aantal,
        beschrijving,
      });
      debugLog("Product added");
      return await getProductById(newProduct[0]);
    } catch (error) {
      throw new Error("Could not add Product");
    }
  } else {
    throw new Error("Product already exists");
  }
};

const updateById = async (
  productId,
  { origineleNaam, naam, verkoperId, prijs, aantal, beschrijving }
) => {
  let existingNaam = await getProductByName(naam);

  if (existingNaam.length !== 0) {
    if (origineleNaam !== existingNaam[0].naam) {
      throw new Error("naam bestaat al");
    }
  }
  try {
    const updatedProduct = await getKnex()(tables.product)
      .update({
        naam,
        verkoperId,
        prijs,
        aantal,
        beschrijving,
      })
      .where("productId", productId);
    debugLog("updating product");
    return await getProductById(updatedProduct);
  } catch (error) {
    throw new Error(error);
  }
};

const deleteById = async (productId) => {
  try {
    await getKnex()(tables.product)
      .delete()
      .where(`${tables.product}.productId`, productId);
    debugLog("product deleted");
  } catch (error) {
    throw new Error("could not delete product");
  }
};

module.exports = {
  getAllProducts,
  getProductByName,
  addProduct,
  updateById,
  deleteById,
};
