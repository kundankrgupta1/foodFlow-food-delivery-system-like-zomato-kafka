import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    clientId: 'kitchen-service',
    brokers: ["localhost:9092"]
})
