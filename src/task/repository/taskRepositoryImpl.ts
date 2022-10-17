import TaskRepository from "./taskRepository";
import RedisHelper from "../../redis/redisHelper";

class TaskRepositoryImpl implements TaskRepository {
  private redisHelper: RedisHelper;

  public static create(redisHelper: RedisHelper): TaskRepositoryImpl {
    return new TaskRepositoryImpl(redisHelper);
  }

  private constructor(redisHelper: RedisHelper) {
    this.redisHelper = redisHelper;
  }
  createTask(taskId: string, ttlInSeconds: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.redisHelper
        .setString(taskId, "")
        .then(() => this.redisHelper.expire(taskId, ttlInSeconds))
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }
  deleteTask(taskId: string): Promise<void> {
    return new Promise(async (resolve: () => void, reject: (error: Error) => void) => {
      this.redisHelper
        .delete(taskId)
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }
  isTaskValid(taskId: string): Promise<boolean> {
    return new Promise(async (resolve: (isExist: boolean) => void, reject: (error: Error) => void) => {
      this.redisHelper
        .exist(taskId)
        .then((isExist) => resolve(isExist))
        .catch((error) => reject(error));
    });
  }
}

export default TaskRepositoryImpl;
