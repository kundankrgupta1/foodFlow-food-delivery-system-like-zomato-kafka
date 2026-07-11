import crypto from "crypto";
import express from "express";
import producer from "./producer.js";

const app = express();

app.use(express.json());

await producer.connectProducer();

app.post("/order", async (req, res) => {
    try {
        const order = {
            date: new Date().toISOString().split("T")[0],
            orderId: Date.now(),
            customerName: req.body.customerName,
            items: req.body.items,
        };

        await producer.publishOrder(order);

        res.status(200).json({
            message: 'order created and published',
            order
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
        });
    }
});

app.listen(3000, () => {
    console.log(`Order service is running on 3000`);
});
