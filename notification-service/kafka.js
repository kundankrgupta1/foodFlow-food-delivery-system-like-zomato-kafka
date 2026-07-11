import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    clientId: "notification-service",
    brokers: ["localhost:9092"]
})
