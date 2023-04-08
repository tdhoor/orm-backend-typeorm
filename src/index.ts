import "reflect-metadata"
import * as dotenv from 'dotenv';
import addressRouter from "./routes/address.route"
import customerRouter from "./routes/customer.route";
import orderRouter from "./routes/order.route copy";
import orderItemRouter from "./routes/order-item.route";
import productCategoryRouter from "./routes/product-category.route";
import productRouter from "./routes/product.route";
import seedRouter from "./routes/seed.route";
import { DB } from "./db";

dotenv.config();

const express = require("express");

const app = express();
app.use(express.json({ limit: "100mb" }));

app.use("/api/seed", seedRouter);
app.use("/api/address", addressRouter);
app.use("/api/customer", customerRouter);
app.use("/api/order", orderRouter);
app.use("/api/order-item", orderItemRouter);
app.use("/api/product-category", productCategoryRouter);
app.use("/api/product", productRouter);

setTimeout(() => {
    DB.initialize().then(async () => {
        app.listen(process.env.APP_PORT, () => {
            console.log("Server listen to port: " + process.env.APP_PORT);
        });
    });
}, 30000);
