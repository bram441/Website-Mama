const Joi = require("joi");
const Router = require("@koa/router");
const productService = require("../service/product");
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const Role = require("../core/roles");
const validate = require("./_validation");

/**
 * @swagger
 * tags:
 *   name: Producten
 *   description: Represents available products
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       allOf:
 *         - type: object
 *           required:
 *             - productId
 *             - verkoperId
 *             - naam
 *             - prijs
 *             - aantal
 *             - beschrijving
 *           properties:
 *             productId:
 *                type: number
 *             verkoperId:
 *                type: number
 *             naam:
 *                type: "string"
 *             prijs:
 *                type: number
 *             aantal:
 *                type: number
 *             beschrijving:
 *                type: "string"
 *           example:
 *             $ref: "#/components/examples/Product"
 *   ProductList:
 *       allOf:
 *         - type: object
 *           required:
 *             - data
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Product"
 *   examples:
 *     product:
 *       productId: 1
 *       verkoperId: 1
 *       naam: "Product1"
 *       prijs: 10
 *       aantal: 50
 *       beschrijving: "testje"
 *   requestBodies:
 *     addProduct:
 *       description: The credentials to addProduct.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               verkoperId:
 *                  type: number
 *               naam:
 *                  type: "string"
 *               prijs:
 *                  type: number
 *               aantal:
 *                  type: number
 *               beschrijving:
 *                  type: "string"
 *     updateProduct:
 *       description: The credentials to updateProduct.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               origineleNaam:
 *                  type: "string"
 *               verkoperId:
 *                  type: number
 *               naam:
 *                  type: "string"
 *               prijs:
 *                  type: number
 *               aantal:
 *                  type: number
 *               beschrijving:
 *                  type: "string"
 *
 */

/**
 * @swagger
 * /api/product/:
 *   get:
 *     summary: Get all products (paginated)
 *     tags:
 *     - Producten
 *     responses:
 *       200:
 *         description: List of products
 *     content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ProductList"
 */

const getAllProducts = async (ctx) => {
  const products = await productService.getAllProducts();
  ctx.body = products;
};

const getProductByName = async (ctx) => {
  const productByName = await productService.getProductByName(ctx.params.naam);
  ctx.body = productByName;
};
getProductByName.validationScheme = {
  params: {
    naam: Joi.string(),
  },
};

/**
 * @swagger
 * /api/product/addProduct:
 *   post:
 *     summary: Create a new product
 *     description: Creates a new product.
 *     tags:
 *      - Producten
 *     requestBody:
 *       $ref: "#/components/requestBodies/addProduct"
 *     responses:
 *       201:
 *     security:
 *       - bearerAuth: []
 */

const addProduct = async (ctx) => {
  const newProduct = await productService.addProduct(ctx.request.body);
  ctx.body = newProduct;
  ctx.status = 201;
};
addProduct.validationScheme = {
  body: {
    verkoperId: Joi.number().integer().positive(),
    naam: Joi.string(),
    prijs: Joi.number().integer().invalid(0).positive(),
    aantal: Joi.number().integer().positive(),
    beschrijving: Joi.string(),
  },
};

/**
 * @swagger
 * /api/product/updateProduct/{productId}:
 *   put:
 *     summary: Updates an existing product
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     description: Updates an existing product.
 *     tags:
 *      - Producten
 *     requestBody:
 *       $ref: "#/components/requestBodies/updateProduct"
 *     responses:
 *       200:
 *     security:
 *       - bearerAuth: []
 */

const updateProduct = async (ctx) => {
  const updatedProduct = await productService.updateById(ctx.params.productId, {
    ...ctx.request.body,
  });
  ctx.body = updatedProduct;
};
updateProduct.validationScheme = {
  params: {
    productId: Joi.number().integer(),
  },
  body: {
    origineleNaam: Joi.string(),
    naam: Joi.string(),
    verkoperId: Joi.number().integer().positive(),
    prijs: Joi.number().integer().invalid(0).positive(),
    aantal: Joi.number().integer().positive(),
    beschrijving: Joi.string(),
  },
};

/**
 * @swagger
 * /api/product/deleteProduct/{productId}:
 *   delete:
 *     summary: Deletes an product
 *     parameters:
 *       - $ref: "#/components/parameters/idParam"
 *     description: Deletes an product.
 *     tags:
 *      - Producten
 *     responses:
 *       204:
 *     security:
 *       - bearerAuth: []
 */

const deleteProduct = async (ctx) => {
  await productService.deleteById(ctx.params.productId);
  ctx.status = 204;
};
deleteProduct.validationScheme = {
  params: {
    productId: Joi.number().integer(),
  },
};

module.exports = function installProductRoutes(app) {
  const router = new Router({
    prefix: "/product",
  });

  const requireAdmin = makeRequireRole(Role.ADMIN);

  router.get("/", getAllProducts);
  router.get(
    "/:naam",
    validate(getProductByName.validationScheme),
    getProductByName
  );
  router.post(
    "/addProduct",
    requireAuthentication,
    validate(addProduct.validationScheme),
    requireAdmin,
    addProduct
  );
  router.put(
    "/updateProduct/:productId",
    requireAuthentication,
    validate(updateProduct.validationScheme),
    requireAdmin,
    updateProduct
  );
  router.delete(
    "/deleteProduct/:productId",
    requireAuthentication,
    validate(deleteProduct.validationScheme),
    requireAdmin,
    deleteProduct
  );

  app.use(router.routes()).use(router.allowedMethods());
};
