import bodyParser from "body-parser";
import express from "express";
import config from "./config/config";
import Logger from "./logger";
import redisHelper from "./redis/redisHelperSingleton";
import swaggerMiddleware from "./swagger/swagger";
import TaskConsumerImpl from "./task/consumer";
import TaskRepositoryImpl from "./task/repository/taskRepositoryImpl";
import TaskSchedulerImpl from "./task/scheduler";
import Task from "./task/task";

const TAG = "app";

const PORT = config.port;
const appName = config.appName;

const taskRepository = TaskRepositoryImpl.create(redisHelper);
const taskScheduler = TaskSchedulerImpl.create(taskRepository);
const taskConsumer = TaskConsumerImpl.create(taskRepository);

const app = express();

app.use(bodyParser.json());

app.get("/", (req: express.Request, res: express.Response) => {
  res.send(`Welcome, ${appName} is running at ${PORT}`);
});

app.post("/schedule", async (req: express.Request, res: express.Response) => {
  const taskType: string = req.body.taskType;
  const payload: string = req.body.payload;
  const timeInMillis: number = parseInt(req.body.timeInMillis);
  const task = Task.create(taskType, timeInMillis, payload);

  taskScheduler
    .scheduleTask(timeInMillis, task)
    .then(() => {
      res.json({
        taskId: task.taskId,
        status: `The ${taskType} task is scheduled.`,
      });
    })
    .catch(() => {
      res.status(500).json({ status: `Error while scheduling task` });
    });
});

app.post("/setupConsumer", async (req: express.Request, res: express.Response) => {
  const taskType: string = req.body.taskType;

  taskConsumer.consume(taskType, (payload) => {
    Logger.logInfo(TAG, `The ${appName} received the task to execute. Task -> ${JSON.stringify(payload)}`);
  });

  Logger.logInfo(TAG, `Consumer is initiated for task ${taskType}.`);
  res.send(`Consumer setup is initiated.`);
});

app.post("/invalidateTask", async (req: express.Request, res: express.Response) => {
  const taskId: string = req.body.taskId;

  taskScheduler
    .invalidateTask(taskId)
    .then(() => {
      res.json({ status: `Task is invalidated.` });
    })
    .catch(() => {
      res.status(500).json({ status: `Error while canceling task` });
    });
});

app.use("/api-docs", swaggerMiddleware.ui, swaggerMiddleware.doc);

app.use("/api-docs.json", (req: express.Request, res: express.Response) => {
  res.send(swaggerMiddleware.swaggerSpecification);
});

app.listen(PORT, () => {
  Logger.log(TAG, `The ${appName} is running at ${PORT}`);
});

Logger.log(TAG, `${appName} instance created`);
