import { generateInvoice } from "./invoice.js";
import { kafka } from "./kafka.js";

class Consumer {
    #consumer = kafka.consumer({ groupId: 'billing-group' });

    async startConsumer() {
        try {
            await this.#consumer.connect();
            console.log("✅ Billing Consumer Connected");

            await this.#consumer.subscribe({
                topics: ["order.created"],
                fromBeginning: true
            })

            await this.#consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    const order = JSON.parse(message.value.toString());

                    console.log("===============================");
                    console.log("Order Received, Generating Invoice...");
                    console.log("===============================");
                    generateInvoice(order);
                },
            })
        } catch (error) {
            console.log("Billing Consumer Error:", error.message);
        }
    }
}

export default new Consumer();
