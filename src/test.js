const BGreen = "\033[1;32m";
const BICyan = "\033[1;96m";

const TITLE_COLOR = BGreen;
const TITLE_HIGHLIGHT_COLOR = BICyan;
const NC = "\033[0m";

console.warn = console.error = () => {}; // To hide warning from the usage of 'fetch'

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const setupConsumerOneToReceiveGreetTasks = () => {
  console.log(
    `${TITLE_COLOR}\nSetting consumer service one to consume ${TITLE_HIGHLIGHT_COLOR}greet${TITLE_COLOR} task ${NC}`
  );

  console.log(`
  curl --location --request POST 'http://localhost:4000/setupConsumer' \

  --header 'Content-Type: application/json' \

  --data-raw '{
      "taskType":"greet"
  }'`);

  fetch("http://localhost:4000/setupConsumer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      taskType: "greet",
    }),
  });
};

const setupConsumerOneToReceiveOfferNotificationTasks = () => {
  console.log(
    `${TITLE_COLOR}\nSetting consumer service one to consume ${TITLE_HIGHLIGHT_COLOR}offer notification${TITLE_COLOR} task ${NC}`
  );

  console.log(`
  curl --location --request POST 'http://localhost:4000/setupConsumer' \

  --header 'Content-Type: application/json' \

  --data-raw '{
      "taskType":"offer-notification"
  }'`);

  fetch("http://localhost:4000/setupConsumer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      taskType: "offer-notification",
    }),
  });
};

const setupConsumerTwoToReceiveOfferNotificationTasks = () => {
  console.log(
    `${TITLE_COLOR}\nSetting consumer service two to consume ${TITLE_HIGHLIGHT_COLOR}offer notification${TITLE_COLOR} task ${NC}`
  );

  console.log(`
  curl --location --request POST 'http://localhost:4001/setupConsumer' \

  --header 'Content-Type: application/json' \

  --data-raw '{
      "taskType":"offer-notification"
  }'`);

  fetch("http://localhost:4001/setupConsumer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      taskType: "offer-notification",
    }),
  });
};

const scheduleGreetTaskToExecuteAfter2Seconds = () => {
  console.log(
    `${TITLE_COLOR}\nSchedule to send new year greeting to all customer in the UTC 5.30 timezone after 2 seconds ${NC}`
  );
  console.log(`
  curl --location --request POST 'http://localhost:3000/schedule' \

  --header 'Content-Type: application/json' \
  --data-raw '{
      "taskType":"greet",
      "payload":"Send new-year wishes to all customers in the UTC 5.30 timezone.",
      "timeInMillis":2000
  }'`);

  fetch("http://localhost:3000/schedule", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      taskType: "greet",
      payload: "Send new-year wishes to all customers in the UTC 5.30 timezone.",
      timeInMillis: 2000,
    }),
  });
};

const scheduleGreetTaskToExecuteAfter3Seconds = () => {
  console.log(
    `${TITLE_COLOR}\nSchedule to send new year greeting to all customer in the UTC 4.00 timezone after 3 seconds ${NC}`
  );
  console.log(`
  curl --location --request POST 'http://localhost:3000/schedule' \

  --header 'Content-Type: application/json' \
  --data-raw '{
      "taskType":"greet",
      "payload":"Send new-year wishes to all customers in the UTC 4.00 timezone.",
      "timeInMillis":3000
  }'`);

  fetch("http://localhost:3000/schedule", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      taskType: "greet",
      payload: "Send new-year wishes to all customers in the UTC 4.00 timezone.",
      timeInMillis: 3000,
    }),
  });
};

const scheduleBlackFridayOfferNotficationTaskToExecuteAfter2SecondsForPremiumCustomers = () => {
  console.log(
    `${TITLE_COLOR}\nSchedule to send black friday offer notification to only premium paid customer after 2 seconds ${NC}`
  );
  console.log(`
  curl --location --request POST 'http://localhost:3001/schedule' \

  --header 'Content-Type: application/json' \
  --data-raw '{
      "taskType":"offer-notification",
      "payload":"Send black-friday offer details at midnight to premium customers.",
      "timeInMillis":2000
  }'`);

  fetch("http://localhost:3001/schedule", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      taskType: "offer-notification",
      payload: "Send black-friday offer details at midnight to premium customers.",
      timeInMillis: 2000,
    }),
  });
};

const scheduleBlackFridayOfferNotficationTaskToExecuteAfter4SecondsForNonPremiumCustomers = () => {
  console.log(
    `${TITLE_COLOR}\nSchedule to send black friday offer notification to all non-premium customer after 4 seconds ${NC}`
  );
  console.log(`
  curl --location --request POST 'http://localhost:3001/schedule' \

  --header 'Content-Type: application/json' \
  --data-raw '{
      "taskType": "offer-notification",
      "payload": "Send black-friday offer details at morning to non-premium customers.",
      "timeInMillis": 4000
  }'`);
  fetch("http://localhost:3001/schedule", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      taskType: "offer-notification",
      payload: "Send black-friday offer details at morning to non-premium customers.",
      timeInMillis: 4000,
    }),
  });
};

const setupConsumers = async () => {
  console.log(`${TITLE_COLOR}\nSetup consumers ${NC}`);
  setupConsumerOneToReceiveGreetTasks();
  await sleep(1000);
  setupConsumerOneToReceiveOfferNotificationTasks();
  await sleep(1000);
  setupConsumerTwoToReceiveOfferNotificationTasks();
  await sleep(1000);
  console.log(`${TITLE_COLOR}\nConsumer setup is completed ${NC}`);
};

const scheduleTasks = async () => {
  console.log(`${TITLE_COLOR}\nSchedule tasks ${NC}`);
  scheduleGreetTaskToExecuteAfter2Seconds();
  await sleep(1000);
  scheduleGreetTaskToExecuteAfter3Seconds();
  await sleep(1000);
  scheduleBlackFridayOfferNotficationTaskToExecuteAfter2SecondsForPremiumCustomers();
  await sleep(1000);
  scheduleBlackFridayOfferNotficationTaskToExecuteAfter4SecondsForNonPremiumCustomers();
  console.log(`${TITLE_COLOR}\Scheduling task completed ${NC}`);
};

const test = async () => {
  await setupConsumers();
  await scheduleTasks();
};

test();
