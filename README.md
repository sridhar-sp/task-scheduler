# Distributed Task scheduler using RabbitMQ

A sample project demonstrating how to achieve a delayed task execution using RabbitMQ deadLetterExchange and message expiration time. (No additional library is needed :)

```
APP_NAME=ShipCommander PORT=3000 yarn start
curl http://localhost:3000/schedule/torpedoAction/message/5000
```

```
APP_NAME=ShipONE PORT=3002 yarn start
 curl http://localhost:3002/setupConsumer/torpedoShip/torpedoAction
```
