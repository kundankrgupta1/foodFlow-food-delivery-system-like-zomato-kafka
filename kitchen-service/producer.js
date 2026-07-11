import { Partitioners } from "kafkajs";
import { kafka } from "./kafka.js";

const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });

async function connectProducer() {
    await producer.connect();
    console.log("✅ Kitchen Producer Connected");
};

async function publishFoodReady(order) {
    await producer.send({
        topic: "food.ready",
        messages: [
            {
                value: JSON.stringify(order)
            }
        ]
    });
    console.log("🍕 Food is Ready");
    console.log('ORDER DETAILS:');
    console.log(order);
}

export default { connectProducer, publishFoodReady };
