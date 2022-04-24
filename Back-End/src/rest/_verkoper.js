const Joi = require("joi");
const Router = require("@koa/router");
const verkoperService = require("../service/verkoper");
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const Role = require("../core/roles");
const validate = require("./_validation");

/**
 * @swagger
 * tags:
 *   name: Verkoper
 *   description: Represents available Verkopers
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Verkoper:
 *       allOf:
 *         - type: object
 *           required:
 *             - verkoperId
 *             - naam
 *             - land
 *             - tel
 *             - email
 *           properties:
 *             verkoperId:
 *                type: number
 *             naam:
 *                type: "string"
 *             land:
 *                type: "string"
 *             tel:
 *                type: "string"
 *             email:
 *                type: "string"
 *           example:
 *             $ref: "#/components/examples/Verkoper"
 *   VerkoperList:
 *       allOf:
 *         - type: object
 *           required:
 *             - data
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Verkoper"
 *   examples:
 *     verkoper:
 *       verkoperId: 1
 *       naam: "verkoper1"
 *       land: België
 *       tel: "+324784955"
 *       email: "testverkoper1@gmail.com"
 *   requestBodies:
 *     addVerkoper:
 *       description: The credentials to addVerkoper.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               naam:
 *                  type: "string"
 *               land:
 *                  type: "string"
 *               tel:
 *                  type: "string"
 *               email:
 *                  type: "string"
 */

/**
 * @swagger
 * /api/verkoper/:
 *   get:
 *     summary: Get all verkopers (paginated)
 *     tags:
 *     - Verkoper
 *     responses:
 *       200:
 *         description: List of verkopers
 *     content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/VerkoperList"
 */

const getAllVerkopers = async (ctx) => {
  const verkoper = await verkoperService.getAllVerkopers();
  ctx.body = verkoper;
};

/**
 * @swagger
 * /api/verkoper/addVerkoper:
 *   post:
 *     summary: Create a new verkoper
 *     description: Creates a new verkoper.
 *     tags:
 *      - Verkoper
 *     requestBody:
 *       $ref: "#/components/requestBodies/addVerkoper"
 *     responses:
 *       201:
 *     security:
 *       - bearerAuth: []
 */
const addVerkoper = async (ctx) => {
  const newVerkoper = await verkoperService.addVerkoper(ctx.request.body);
  ctx.body = newVerkoper;
  ctx.status = 201;
};
addVerkoper.validationScheme = {
  body: {
    naam: Joi.string(),
    land: Joi.string(),
    tel: Joi.string(),
    email: Joi.string().email(),
  },
};

/**
 * @swagger
 * /api/verkoper/deleteVerkoper/{verkoperId}:
 *   delete:
 *     summary: Deletes an verkoper
 *     parameters:
 *       - $ref: "#/components/parameters/idParamVerkoper"
 *     description: Deletes an verkoper.
 *     tags:
 *      - Verkoper
 *     responses:
 *       204:
 *     security:
 *       - bearerAuth: []
 */

const deleteVerkoper = async (ctx) => {
  await verkoperService.deleteVerkoperByVerkoperId(ctx.params.verkoperId);
  ctx.status = 204;
};
deleteVerkoper.validationScheme = {
  params: {
    verkoperId: Joi.number().integer(),
  },
};

module.exports = function installVerkoperRoutes(app) {
  const router = new Router({
    prefix: "/verkoper",
  });

  const requireAdmin = makeRequireRole(Role.ADMIN);

  router.get("/", getAllVerkopers);
  router.post(
    "/addVerkoper",
    validate(addVerkoper.validationScheme),
    requireAuthentication,
    requireAdmin,
    addVerkoper
  );
  router.delete(
    "/deleteVerkoper/:verkoperId",
    validate(deleteVerkoper.validationScheme),
    requireAuthentication,
    requireAdmin,
    deleteVerkoper
  );

  app.use(router.routes()).use(router.allowedMethods());
};
