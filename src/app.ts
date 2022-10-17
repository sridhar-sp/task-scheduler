import express from "express";
import config from "./config/config";
import Consumer from "./rabbitmq/consumer";
import Producer from "./rabbitmq/producer";
import Logger from "./logger";
import swaggerMiddleware from "./swagger/swagger";

const TAG = "app";

const app = express();
const PORT = config.PORT;

const producer = Producer.create(config.RABBIT_MQ_URL!!);

app.use("/api-docs", swaggerMiddleware.ui, swaggerMiddleware.doc);
app.use("/api-docs.json", (req: express.Request, res: express.Response) => {
  res.send(swaggerMiddleware.swaggerSpecification);
});
app.get("/", (req: express.Request, res: express.Response) => {
  res.send(`Welcome, Application is running at ${PORT} at process ${process.pid}\n`);
});

/**
 * @swagger
 * /sendDelayedMessage/{queueName}/{message}/{timeInMillis}:
 *   get:
 *     description: Send a message
 *     parameters:
 *      - in : path
 *        name : taskType
 *        schema :
 *          type : string
 *        required : true
 *        description : Queue to receive the delayed message
 *      - in : path
 *        name : message
 *        schema :
 *          type: string
 *        required: true
 *        description : Message
 *      - in : path
 *        name : timeInMillis
 *        schema :
 *          type : integer
 *        required: true
 *        description : Delay in milli seconds
 *     responses:
 *       200:
 *         description: Message sent status succes {status_bool}
 */
app.get("/schedule/:taskType/:message/:timeInMillis", async (req: express.Request, res: express.Response) => {
  const taskType: string = req.params.taskType;
  const message: string = req.params.message;
  const timeInMillis: number = parseInt(req.params.timeInMillis);
  producer.sendDelayedMessageToQueue(taskType, timeInMillis, message);
  res.send(`Task Scheduled. This request handled by process ${process.pid}\n`);
});

/**
 * @swagger
 * /sendDelayedMessage/{queueName}/{message}/{timeInMillis}:
 *   get:
 *     description: Send a message
 *     parameters:
 *      - in : path
 *        name : queueName
 *        schema :
 *          type : string
 *        required : true
 *        description : Queue to receive the delayed message
 *      - in : path
 *        name : message
 *        schema :
 *          type: string
 *        required: true
 *        description : Message
 *      - in : path
 *        name : timeInMillis
 *        schema :
 *          type : integer
 *        required: true
 *        description : Delay in milli seconds
 *     responses:
 *       200:
 *         description: Message sent status succes {status_bool}
 */
app.get(
  "/sendDelayedMessageTemp/:queueName/:message/:timeInMillis",
  async (req: express.Request, res: express.Response) => {
    const queueName: string = req.params.queueName;
    const message: string = req.params.message;
    const timeInMillis: number = parseInt(req.params.timeInMillis);
    producer.sendDelayedMessageToQueue(queueName, timeInMillis, message);
    res.send(`Initiated the delayed nessage, this request handled in process ${process.pid}\n`);
  }
);

/**
 * @swagger
 * /setupConsumer/{consumerName}/{queueName}:
 *   get:
 *     description: Setup a consumer to consume messages from a specified queue
 *     parameters:
 *      - in : path
 *        name : consumerName
 *        schema :
 *          type: string
 *        required: true
 *        description : Consumer name
 *      - in : path
 *        name : queueName
 *        schema :
 *          type : string
 *        required : true
 *        description : Queue to consume messages from
 *     responses:
 *       200:
 *         description: Message sent status succes {status_bool}
 */
app.get("/setupConsumer/:consumerName/:queueName", async (req: express.Request, res: express.Response) => {
  const consumerName: string = req.params.consumerName;
  const queueName: string = req.params.queueName;
  const consumer: Consumer = Consumer.create(config.RABBIT_MQ_URL!!);
  consumer.consume(queueName, (payload) => {
    Logger.log(
      TAG,
      `Consumer from process ${process.pid} received the message ${payload} at at ${new Date().toTimeString()}`
    );
  });

  res.send(`Consumer setup initiated, this request handled in process ${process.pid} \n`);
});

app.listen(PORT, () => {
  Logger.log(TAG, `Application is running at ${PORT} at process ${process.pid} \n`);
});

Logger.log(TAG, "Application instance created");
