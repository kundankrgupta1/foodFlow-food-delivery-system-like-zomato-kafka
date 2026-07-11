import { generateInvoice } from "./invoice.js";
import { kafka } from "./kafka.js";

const consumer = kafka.consumer({
    groupId: "billing-group"
});

async function startConsumer() {
    await consumer.connect();
    console.log("✅ Billing Consumer Connected");

    await consumer.subscribe({
        topic: 'order.created',
        fromBeginning: false
    })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const order = JSON.parse(message.value.toString());

            console.log("===============================");
            console.log(`Order Received, Generating Invoice...`);
            console.log("===============================");
            generateInvoice(order);
        },
    })
}
startConsumer().catch((e) => console.log(e));
