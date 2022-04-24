const Koa = require("koa");
const config = require("config");
const { getLogger, initializeLogger } = require("./core/logger");
const koaCors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const { initializeData, shutdownData } = require("./data");
const installRest = require("./rest");
const swaggerJsdoc = require("swagger-jsdoc");
const { koaSwagger } = require("koa2-swagger-ui");
const swaggerOptions = require("../swagger.config");

const NODE_ENV = config.get("env");
const CORS_ORIGINS = config.get("cors.origins");
const CORS_MAX_AGE = config.get("cors.maxAge");
const LOG_LEVEL = config.get("log.level");
const LOG_DISABLED = config.get("log.disabled");

module.exports = async function createServer() {
  initializeLogger({
    level: LOG_LEVEL,
    disabled: LOG_DISABLED,
    isProduction: NODE_ENV === "production",
    defaultMeta: { NODE_ENV },
  });
  await initializeData();

  const app = new Koa();

  app.use(
    koaCors({
      origin: (ctx) => {
        if (CORS_ORIGINS.indexOf(ctx.request.header.origin) !== -1) {
          return ctx.request.header.origin;
        }

        return CORS_ORIGINS[0];
      },
      allowHeaders: ["Accept", "Content-Type", "Authorization"],
      maxAge: CORS_MAX_AGE,
    })
  );

  const logger = getLogger();

  app.use(bodyParser());

  const spec = swaggerJsdoc(swaggerOptions);
  app.use(
    koaSwagger({
      routePrefix: "/swagger",
      specPrefix: "/swagger/spec",
      exposeSpec: true,
      swaggerOptions: {
        spec,
      },
    })
  );

  installRest(app);

  return {
    getApp() {
      return app;
    },

    start() {
      return new Promise((resolve) => {
        const port = process.env.PORT || 9000;
        app.listen(port);
        logger.info(`🚀 Server listening on http://localhost:${port}`);
        resolve();
      });
    },

    async stop() {
      {
        app.removeAllListeners();
        await shutdownData();
        getLogger().info("Goodbye");
      }
    },
  };
};
