# Distributed Task scheduler using RabbitMQ

This is a sample demonstrating how to achieve a delayed task execution using RabbitMQ deadLetterExchange and message expiration time.

#### Consumer

##### Consumer 1

###### Name : Email-Service-1

```
APP_NAME=Email-Service-1 PORT=4000 yarn start
```

```
curl --location --request POST 'http://localhost:4000/setupConsumer' \
--header 'Content-Type: application/json' \
--data-raw '{
    "taskType":"greet"
}'
```

```
curl --location --request POST 'http://localhost:4000/setupConsumer' \
--header 'Content-Type: application/json' \
--data-raw '{
    "taskType":"offer-notification"
}'
```

##### Consumer 2

###### Name : Email-Service-2

```
APP_NAME=Email-Service-2 PORT=4001 yarn start
```

```
curl --location --request POST 'http://localhost:4001/setupConsumer' \
--header 'Content-Type: application/json' \
--data-raw '{
    "taskType":"offer-notification"
}'
```

#### Producer

##### Producer 1

###### Name : Greeter-Service

```
APP_NAME=Greeter PORT=3000 yarn start
```

```
curl --location --request POST 'http://localhost:3000/schedule' \
--header 'Content-Type: application/json' \
--data-raw '{
    "taskType":"greet",
    "payload":"Send new-year wishes to all customers with UTC 5.30 timezone",
    "timeInMillis":2500
}'
```

- Conisder `"timeInMillis":2500` is a time-offset from user current timezone.

```
curl --location --request POST 'http://localhost:3000/schedule' \
--header 'Content-Type: application/json' \
--data-raw '{
    "taskType":"greet",
    "payload":"Send new-year wishes to all customers with UTC 5.00 timezone",
    "timeInMillis":2000
}'
```

##### Producer 2

###### Name : Offer-Notification-Service

```
APP_NAME=Offer-Notification PORT=3001 yarn start
```

```
curl --location --request POST 'http://localhost:3001/schedule' \
--header 'Content-Type: application/json' \
--data-raw '{
    "taskType":"offer-notification",
    "payload":"Send black-friday offer details at midnight to premium customers",
    "timeInMillis":1500

}'
```

```
curl --location --request POST 'http://localhost:3001/schedule' \
--header 'Content-Type: application/json' \
--data-raw '{
    "taskType":"offer-notification",
    "payload":"Send black-friday offer details at morning to non-premium customers",
    "timeInMillis":3500

}'
```

- The `schedule` api will return the task id, which can be used to invalidate the task if required.

#### Invalidate scheduled task

```
curl --location --request POST 'http://localhost:3000/invalidateTask' \
--header 'Content-Type: application/json' \
--data-raw '{
    "taskId": "taskId"
}'
```
