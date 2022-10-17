import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import config from "../config/config";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: config.APP_NAME,
      version: config.VERSION,
    },
  },
  apis: ["src/app.ts"],
};

const swaggerSpecification = swaggerJsdoc(options);

export default {
  swaggerSpecification: swaggerSpecification,
  ui: swaggerUi.serve,
  doc: swaggerUi.setup(swaggerSpecification, { explorer: true }),
};
