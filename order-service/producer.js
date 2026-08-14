import { Partitioners } from "kafkajs";
import admin from "./admin.js";
import { kafka } from "./kafka.js";

class Producer {

    #producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
    #topic = 'order.created';

    async init() {
        try {
            await admin.createTopics(this.#topic);

            await this.#producer.connect();
            console.log(`✅ Order Producer Connected & Topic '${this.#topic}' Verified`);
        } catch (error) {
            console.error("❌ Failed to initialize Order Producer:", error.message);
            throw error;
        }
    };

    async publishOrder(order) {
        if (!order) {
            console.warn("⚠️ Cannot publish an empty or undefined order.");
            return;
        };

        try {
            await this.#producer.send({
                topic: "order.created",
                messages: [{ value: JSON.stringify(order) }]
            });

            console.log('ORDER DETAILS:');
            console.log(order);
            console.log("📤 Order Published");
        } catch (error) {
            console.error("❌ Failed to publish order:", error.message);
        }
    }
}

export default new Producer();
