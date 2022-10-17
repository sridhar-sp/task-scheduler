import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT || 3000,
  IS_CLUSTER_MODE_ENABLED: process.env.PORT || false,
  RABBIT_MQ_URL: process.env.RABBIT_MQ_URL || "",
  REDIS_URL: process.env.REDIS_URL || "",
  APP_NAME: "Distributed Task scheduler using RabbitMQ",
  VERSION: "1.0.0",
};
