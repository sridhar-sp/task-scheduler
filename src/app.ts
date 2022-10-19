import express from "express";
import bodyParser from "body-parser";
import config from "./config/config";
import Consumer from "./rabbitmq/consumer";
import Producer from "./rabbitmq/producer";
import Logger from "./logger";
import swaggerMiddleware from "./swagger/swagger";

const TAG = "app";

const PORT = config.port;
const appName = config.appName;

const producer = Producer.create(config.rabbitMQURL!!);
const consumer: Consumer = Consumer.create(config.rabbitMQURL!!);

const app = express();

app.use(bodyParser.json());

app.get("/", (req: express.Request, res: express.Response) => {
  res.send(`Welcome, ${appName} is running at ${PORT}`);
});

app.post("/schedule", async (req: express.Request, res: express.Response) => {
  const taskType: string = req.body.taskType;
  const payload: string = req.body.payload;
  const timeInMillis: number = parseInt(req.body.timeInMillis);
  producer.sendDelayedMessageToQueue(taskType, timeInMillis, payload);
  res.send(`The ${taskType} task is scheduled.`);
});

app.post("/setupConsumer", async (req: express.Request, res: express.Response) => {
  const queueName: string = req.body.queueName;

  consumer.consume(queueName, (payload) => {
    Logger.logInfo(TAG, `The ${appName} received the task to execute. Task -> ${payload}`);
  });

  res.send(`Consumer setup is initiated.`);
});

app.use("/api-docs", swaggerMiddleware.ui, swaggerMiddleware.doc);

app.use("/api-docs.json", (req: express.Request, res: express.Response) => {
  res.send(swaggerMiddleware.swaggerSpecification);
});

app.listen(PORT, () => {
  Logger.log(TAG, `The ${appName} is running at ${PORT}`);
});

Logger.log(TAG, `${appName} instance created`);
