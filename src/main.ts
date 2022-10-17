import cluster from "cluster";
import os from "os";
import Logger from "./logger";
import config from "./config";

const TAG = "main";

if (config.IS_CLUSTER_MODE_ENABLED && cluster.isPrimary) {
  Logger.log(TAG, "Master node called");
  const numOfCores = os.cpus().length;
  Logger.log(TAG, `${numOfCores} available`);

  for (let i = 0; i < numOfCores; i++) {
    const worker = cluster.fork();
  }
  cluster.on("online", (worker) => {
    Logger.log(TAG, `worker ${worker.id} is online`);
  });

  cluster.on("disconnect", (worker) => {
    Logger.log(TAG, `worker ${worker.id} is disconnected`);
  });

  cluster.on("exit", (worker, code, signal) => {
    Logger.log(TAG, `Worker ${worker.process.pid} died with code: ${code} and signal: ${signal}`);
    if (code !== 0) {
      Logger.log(TAG, "Starting a new worker");
      cluster.fork();
    }
  });
} else {
  require("./app");
}
