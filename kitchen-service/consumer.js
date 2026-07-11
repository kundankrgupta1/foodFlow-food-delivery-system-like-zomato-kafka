import { kafka } from "./kafka.js";
import producer from "./producer.js";

const consumer = kafka.consumer({
    groupId: "kitchen-group"
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function startConsumer() {
    await consumer.connect();
    console.log("✅ Kitchen Consumer Connected");

    await producer.connectProducer();

    await consumer.subscribe({
        topics: ["order.created"],
        fromBeginning: false
    });
    console.log("📡 Listening for Orders...");

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const order = JSON.parse(message.value.toString());
            console.log("\n===============================");
            console.log("✅ New Order Received");
            console.log("\n👨‍🍳 Preparing Food...\n");
            console.log("===============================");

            await delay(5000);
            await producer.publishFoodReady({
                ...order,
                status: "READY"
            });
        },
    })
};

startConsumer().catch((e) => console.log(e));
