import AMQBBase from "./amqpBase";
import { Message } from "amqplib/callback_api";

class Consumer extends AMQBBase {
  public static create(url: string): Consumer {
    return new Consumer(url);
  }

  private constructor(url: string) {
    super(url);
  }

  public consume(taskType: string, handler: (payload: string) => void) {
    const FINAL_QUEUE = taskType;
    const FINAL_EXCHANGE = `${taskType}_FINAL_EXCHANGE`;
    const FINAL_EXCHANGE_TYPE = "fanout";

    this.assertExchange(FINAL_EXCHANGE, FINAL_EXCHANGE_TYPE)
      .then((_) => this.assertQueue(FINAL_QUEUE, {}))
      .then((_) => this.bindQueue(FINAL_QUEUE, FINAL_EXCHANGE, ""))
      .then((_) => {
        this.channel?.consume(
          FINAL_QUEUE,
          (msg: Message | null) => {
            handler(msg?.content ? msg?.content.toString() : "");
          },
          { noAck: true }
        );
      });
  }
}

export default Consumer;
