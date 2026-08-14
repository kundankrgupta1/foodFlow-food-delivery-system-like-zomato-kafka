import express from "express";
import consumer from "./consumer.js";

const app = express();

app.use(express.json());

const PORT = 3002;

await consumer.startConsumer();


app.post('/food-ready/:orderId', ((req, res) => {
    const { orderId } = req.params;


}))

app.listen(PORT, () => {
    console.log(`Kitchen service is running on ${PORT}`);
});