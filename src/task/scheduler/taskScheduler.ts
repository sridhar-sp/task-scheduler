import Task from "../task";

interface TaskScheduler {
  scheduleTask(delayInMilliseconds: number, task: Task): Promise<string>;
  invalidateTask(taskId: string): Promise<void>;
}

export default TaskScheduler;
