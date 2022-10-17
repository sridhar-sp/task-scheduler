import { v4 } from "uuid";

class Task {
  public taskId: string;
  public taskType: string; // queue name
  public ttlInSeconds: number;
  public payload: string;

  public static create(taskType: string, ttlInSeconds: number, payload: string) {
    return new Task(v4(), taskType.toString(), ttlInSeconds, payload);
  }

  public static fromJson(json: string): Task {
    return JSON.parse(json) as Task;
  }

  public constructor(taskId: string, taskType: string, ttlInSeconds: number, payload: string) {
    this.taskId = taskId;
    this.taskType = taskType;
    this.ttlInSeconds = ttlInSeconds;
    this.payload = payload;
  }

  public toJson(): string {
    return JSON.stringify(this);
  }
}

export default Task;
