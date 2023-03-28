import "reflect-metadata"
import * as dotenv from 'dotenv';
import { DataSource } from "typeorm";
import { Address } from "./entity/address.entity";
import { Customer } from "./entity/customer.entity";
import { Order } from "./entity/order.entity";
import { OrderItem } from "./entity/order-item.entity";
import { Product } from "./entity/product.entity";
import { ProductCategory } from "./entity/product-category.entity";

dotenv.config();

export const DB = new DataSource({
    type: process.env.POSTGRES_DB_TYPE as any,
    host: process.env.POSTGRES_DB_HOST,
    port: +process.env.POSTGRES_DB_PORT,
    username: process.env.POSTGRES_DB_USER,
    password: process.env.POSTGRES_DB_PASSWORD,
    database: process.env.POSTGRES_DB_NAME,
    synchronize: true,
    logging: false,
    entities: [
        Address, Customer, Order, OrderItem, Product, ProductCategory
    ],
    pool: {
        max: 5
    },
    subscribers: [],
    dropSchema: true
});