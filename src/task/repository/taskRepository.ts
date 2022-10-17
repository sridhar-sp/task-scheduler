interface TaskRepository {
  createTask(taskId: string, ttlInSeconds: number): Promise<void>;
  deleteTask(taskId: string): Promise<void>;
  isTaskValid(taskId: string): Promise<boolean>;
}

export default TaskRepository;
