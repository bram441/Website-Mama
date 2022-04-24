const Joi = require("joi");
const Router = require("@koa/router");
const userService = require("../service/user");
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const Role = require("../core/roles");
const validate = require("./_validation");

/**
 * @swagger
 * tags:
 *   name: Login
 *   description: Login to get the bearer token
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       allOf:
 *         - type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: "string"
 *             password:
 *               type: "string"
 *           example:
 *             $ref: "#/components/examples/Login"
 *   examples:
 *     Login:
 *       id: 1
 *       email: "xxx"
 *       password: "xxx"
 *       token: "xxx"
 *   requestBodies:
 *     Login:
 *       description: The credentials to login.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 */

const findAllUsers = async (ctx) => {
  const users = await userService.findAllUsers();
  ctx.body = users;
};

const findUserByEmail = async (ctx) => {
  const userByEmail = await userService.findUserByEmail(ctx.params.Email);
  ctx.body = userByEmail;
};
findUserByEmail.validationScheme = {
  params: {
    email: Joi.string().email(),
  },
};

const registerUser = async (ctx) => {
  const session = await userService.registerUser(ctx.request.body);
  ctx.body = session;
};
registerUser.validationScheme = {
  body: {
    voornaam: Joi.string().max(255),
    achternaam: Joi.string().max(255),
    email: Joi.string().email(),
    geboorteDatum: Joi.number(),
    password: Joi.string().min(5).max(30),
  },
};

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login to get the bearer token
 *     description: Returns the bearer token
 *     tags:
 *      - Login
 *     requestBody:
 *       $ref: "#/components/requestBodies/Login"
 *     responses:
 *       200:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               email:
 *                 type: string
 *               roles:
 *                 type: array
 *               token:
 *                 type: string
 */

const login = async (ctx) => {
  const loginUser = await userService.login(ctx.request.body);
  ctx.body = loginUser;
};
login.validationScheme = {
  body: {
    email: Joi.string().email(),
    password: Joi.string(),
  },
};

const getUserById = async (ctx) => {
  const user = await userService.getUserById(ctx.params.userId);
  ctx.body = user;
};
getUserById.validationScheme = {
  params: {
    userId: Joi.number(),
  },
};

const deleteUserById = async (ctx) => {
  const user = await userService.deleteById(ctx.params.userId);
  ctx.body = user;
};
deleteUserById.validationScheme = {
  params: {
    userId: Joi.number(),
  },
};

module.exports = function installUsersRoutes(app) {
  const router = new Router({
    prefix: "/user",
  });

  const requireAdmin = makeRequireRole(Role.ADMIN);

  router.get("/", requireAuthentication, requireAdmin, findAllUsers);
  router.get(
    "/:Email",
    requireAuthentication,
    validate(findUserByEmail.validationScheme),
    findUserByEmail
  );
  router.get(
    "/getUserById/:userId",
    validate(getUserById.validationScheme),
    getUserById
  );
  router.post(
    "/register",
    validate(registerUser.validationScheme),
    registerUser
  );
  router.post("/login", validate(login.validationScheme), login);
  router.post(
    "/delete/:userId",
    validate(deleteUserById.validationScheme),
    requireAuthentication,
    deleteUserById
  );

  app.use(router.routes()).use(router.allowedMethods());
};
