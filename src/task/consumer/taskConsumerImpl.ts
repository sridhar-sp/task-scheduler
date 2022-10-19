import Consumer from "../../rabbitmq/consumer";
import Task from "../task";
import TaskConsumer from "./taskConsumer";
import TaskRepository from "../repository";
import config from "../../config";
import logger from "../../logger/logger";

const TAG = "TaskConsumer";

class TaskConsumerImpl implements TaskConsumer {
  private taskRepository: TaskRepository;
  private consumer: Consumer;

  public static create(taskRepository: TaskRepository): TaskConsumer {
    return new TaskConsumerImpl(taskRepository, Consumer.create(config.rabbitMQURL));
  }

  private constructor(taskRepository: TaskRepository, consumer: Consumer) {
    this.taskRepository = taskRepository;
    this.consumer = consumer;
  }

  consume(taskType: string, handler: (task: Task) => void): void {
    this.consumer.consume(taskType.toString(), async (payload: string) => {
      const task = Task.fromJson(payload);
      const isTaskValid = await this.taskRepository.isTaskValid(task.taskId);
      logger.logInfo(
        TAG,
        `Time to execute ${taskType} isTaskValid=${isTaskValid} received at ${new Date().toTimeString()}`
      );
      if (isTaskValid) {
        handler(task);
      }
    });
  }
}

export default TaskConsumerImpl;
