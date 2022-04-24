const Router = require("@koa/router");
const installProductRouter = require("./_product");
const installVerkoperRouter = require("./_verkoper");
const installUserRouter = require("./_user");

/**
 * @swagger
 * components:
 *   parameters:
 *     idParam:
 *       in: path
 *       name: productId
 *       description: id
 *       required: true
 *       schema:
 *         type: integer
 *     idParamVerkoper:
 *       in: path
 *       name: verkoperId
 *       description: id
 *       required: true
 *       schema:
 *         type: integer
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Base:
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: integer
 *       example:
 *         id: 1
 *     ListResponse:
 *       required:
 *         - limit
 *         - offset
 *       properties:
 *         limit:
 *           type: integer
 *           description: Limit actually used
 *           example: 1
 *         offset:
 *           type: integer
 *           description: Offset actually used
 *           example: 1
 */
module.exports = (app) => {
  const router = new Router({
    prefix: "/api",
  });

  installProductRouter(router);
  installVerkoperRouter(router);
  installUserRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};
