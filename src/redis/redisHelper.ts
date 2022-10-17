import redis, { RedisClient } from "redis";
import config from "../config";
import Logger from "../logger";

const TAG = "RedisHelper";

class RedisHelper {
  redisClient: RedisClient;

  constructor() {
    this.redisClient = redis.createClient(config.REDIS_URL, { no_ready_check: true });
    this.redisClient.on("error", function (error) {
      Logger.logError(TAG, error);
    });
  }

  setString(key: string, value: string): Promise<boolean> {
    return new Promise((resolve, reject: (error: Error) => void) => {
      this.redisClient.set(key, value, (err, reply) => {
        if (err == null) resolve(true);
        else reject(err);
      });
    });
  }

  getString(key: string): Promise<string | null> {
    return new Promise((resolve: (value: string | null) => void, reject: (error: Error) => void) => {
      this.redisClient.get(key, (err, reply) => {
        if (err == null) resolve(reply);
        else reject(err);
      });
    });
  }

  delete(key: string): Promise<boolean> {
    return new Promise((resolve, reject: (error: Error) => void) => {
      this.redisClient.del(key, (err, reply) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }

  exist(key: string): Promise<boolean> {
    return new Promise((resolve: (isExist: boolean) => void, reject: (error: Error) => void) => {
      this.redisClient.exists(key, (err, reply) => {
        if (err == null) resolve(reply == 1);
        else reject(err);
      });
    });
  }

  expire(key: string, ttlInSeconds: number): Promise<void> {
    return new Promise((resolve: () => void, reject: (error: Error) => void) => {
      this.redisClient.expire(key, ttlInSeconds, (err, reply) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}

export default RedisHelper;
