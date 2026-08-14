import express from "express";
import consumer from "./consumer.js";

const app = express();

app.use(express.json());

const PORT = 3001;

await consumer.startConsumer();

app.listen(PORT, () => {
    console.log(`Billing service is running on ${PORT}`);
});