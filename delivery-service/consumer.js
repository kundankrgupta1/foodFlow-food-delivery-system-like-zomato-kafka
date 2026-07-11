import { kafka } from "./kafka.js";
import producer from "./producer.js";

const consumer = kafka.consumer({
    groupId: "delivery-group"
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function startConsumer() {
    await consumer.connect();
    console.log("✅ Delivery Consumer Connected");

    await producer.connectProducer();

    await consumer.subscribe({
        topics: ["food.ready"],
        fromBeginning: false
    });

    console.log("🍕 waiting for food ready...");

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const order = JSON.parse(message.value.toString());
            if (order?.status === 'READY') {

                await delay(5000); //5s
                await producer.publishOrderPickedUp({
                    ...order,
                    status: "PICKEDUP",
                    deliveryPartner: {
                        name: "Shyam Kumar",
                        phone: "+91-9883478445"
                    }
                });
                console.log("📤 order.pickedup published");
            }

            await delay(10000); // 10s
            await producer.publishOrderDelivered({
                ...order,
                status: "DELIVERED"
            })
            console.log("📤 order.delivered published");
        }
    })
}

startConsumer().catch((e) => console.error("Delivery consumer error:", e));
