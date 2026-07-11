import { Partitioners } from "kafkajs";
import { kafka } from "./kafka.js";

const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });

async function connectProducer() {
    await producer.connect();
    console.log('✅ Order Producer Connected');
};

async function publishOrder(order) {

    await producer.send({
        topic: "order.created",
        messages: [{ value: JSON.stringify(order) }]
    });

    console.log('ORDER DETAILS:');
    console.log(order);
    console.log("📤 Order Published");
};

export default { connectProducer, publishOrder }
