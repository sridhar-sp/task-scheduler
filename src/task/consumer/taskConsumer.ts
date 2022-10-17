import Task from "../task";

interface TaskConsumer {
  consume(taskType: string, handler: (task: Task) => void): void;
}

export default TaskConsumer;
