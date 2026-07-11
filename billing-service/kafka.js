import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    clientId: 'billing-service',
    brokers: ["localhost:9092"]
})