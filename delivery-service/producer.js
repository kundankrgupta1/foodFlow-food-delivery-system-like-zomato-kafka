import { Partitioners } from "kafkajs";
import { kafka } from "./kafka.js";

const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });

async function connectProducer() {
    await producer.connect();
    console.log('✅ Delivery Producer Connected');
};

async function publishOrderPickedUp(order) {
    await producer.send({
        topic: ["order.pickedup"],
        messages: [{ value: JSON.stringify(order) }]
    });
}
async function publishOrderDelivered(order) {
    await producer.send({
        topic: ["order.delivered"],
        messages: [{ value: JSON.stringify(order) }]
    })
}

export default { connectProducer, publishOrderPickedUp, publishOrderDelivered };