import { kafka } from "./kafka.js";

const consumer = kafka.consumer({
    groupId: 'notification-group'
});

async function startConsumer() {
    await consumer.connect();
    console.log('✅ Notification Consumer Connected');

    await consumer.subscribe({
        topics: ["order.created", "food.ready", "order.pickedup", "order.delivered"],
        fromBeginning: false
    });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const order = JSON.parse(message.value.toString());

            if (topic === "order.created") {
                console.log(`Customer : ${order.customerName}`);
                console.log(`Order ID : ${order.orderId}`);

                console.log("\nSMS");
                console.log("--------------------------------------");
                console.log(`Hi ${order.customerName}, your order #${order.orderId} has been placed successfully`);

                console.log("\nEmail");
                console.log("--------------------------------------");
                console.log(
                    `Dear ${order.customerName},\n\nThank you for ordering with Food Express.\n\nYour order has been received successfully.\n\nOrder ID : ${order.orderId}\n\nWe'll notify you once the food is prepared.\n\nHave a great day 😊`
                );

            } else if (topic === "food.ready") {
                console.log(`Customer : ${order.customerName}`);
                console.log(`Order ID : ${order.orderId}`);

                console.log("\nSMS/Email Update");
                console.log("--------------------------------------");
                console.log(`🔥 Hot & Fresh! Hi ${order.customerName}, your order #${order.orderId} is ready and waiting for pickup, a delivery partner will assign shortly!`);

            } else if (topic === "order.pickedup") {
                console.log(`Customer : ${order.customerName}`);
                console.log(`Order ID : ${order.orderId}`);

                console.log("\nSMS/Email Update");
                console.log("--------------------------------------");
                console.log(`🔥 Hot & Fresh! Hi ${order.customerName}, your order #${order.orderId} is out for delivery, contact delivery partner - ${order.deliveryPartner.name} ${order.deliveryPartner.phone}`);

            } else if (topic === "order.delivered") {
                console.log(`Customer : ${order.customerName}`);
                console.log(`Order ID : ${order.orderId}`);

                console.log("\nSMS/Email Update");
                console.log("--------------------------------------");
                console.log(`🔥 Hot & Fresh! Hi ${order.customerName}, your order #${order.orderId} is delivered successfully, enjoy your meal`);
            };
            console.log("\n✅ Notification Action Completed");
            console.log("======================================\n");
        },
    });
}

startConsumer().catch(console.error);
