import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    clientId: 'delivery-service',
    brokers: ["localhost:9092"]
});
