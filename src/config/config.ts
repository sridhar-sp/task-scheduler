import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 3000,
  isClusterModeEnabled: process.env.PORT || false,
  rabbitMQURL: process.env.RABBIT_MQ_URL || "",
  redisURL: process.env.REDIS_URL || "",
  appName: process.env.APP_NAME || "Distributed Task scheduler using RabbitMQ",
  version: "1.0.0",
};
