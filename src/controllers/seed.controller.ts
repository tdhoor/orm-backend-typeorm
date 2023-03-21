import { createMock } from "@core/functions/create-entity-mock.function";
import { Customer } from "../entity/customer.entity";
import { Order } from "../entity/order.entity";
import { ProductCategory } from "../entity/product-category.entity";
import { Product } from "../entity/product.entity";
import { Address } from "../entity/address.entity";
import { OrderItem } from "../entity/order-item.entity";
import { deleteAllEntities } from "../functions/delete-all-entities.function";
import { insert } from "../functions/insert.function";
import { countEntities } from "src/functions/count-entities.function";

async function seedDb(req, res, next) {
    try {
        const amount: number = +req.params.amount;
        let p1 = performance.now();

        await deleteAllEntities();
        console.log("DB cleared");

        let customers = createMock.customers(amount);
        let addresses = createMock.addresses(amount);
        let categories = createMock.productCategories((amount / 1000) < 100 ? 100 : (amount / 1000));
        let products = createMock.products(amount, categories);
        let { orders, orderItems } = createMock.orders(amount, 0, products, false);

        await insert(Customer, customers);
        console.log("customers created");
        customers = null;

        await insert(Address, addresses);
        console.log("addresses created");
        addresses = null;

        await insert(ProductCategory, categories);
        console.log("categories created");
        categories = null;

        await insert(Product, products);
        console.log("products created");
        products = null;

        await insert(Order, orders);
        console.log("orders created");
        orders = null;

        await insert(OrderItem, orderItems);
        console.log("orderItems created");
        orderItems = null;

        console.log(performance.now() - p1);
        console.log('====================================');
        const count = await countEntities();
        res.status(200).json({ message: "DB seeded", count });
        console.log('====================================');
    } catch (error) {
        res.status(500).json({ message: "Error seeding DB", error });
    }
}

export default {
    seedDb
}