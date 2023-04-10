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
import { calcProductCategoryAmount } from "@core/functions/calc-product-category-amount.function";

async function seedDb(req, res, next) {
    try {
        const amount: number = +req.params.amount;

        await deleteAllEntities();

        let customers = createMock.customers(amount);
        let addresses = createMock.addresses(amount, customers);

        await insert(Customer, customers);
        await insert(Address, addresses);

        let categories = createMock.productCategories(calcProductCategoryAmount(amount));
        let products = createMock.products(amount, categories);
        let customerIds = Array.from({ length: amount }).map((_, i) => i + 1);
        let { orders, orderItems } = createMock.orders(amount, customerIds, products, { addOrderIdToOrderItem: true, seperateOrderItems: true });

        await insert(ProductCategory, categories);
        await insert(Product, products);
        await insert(Order, orders);
        await insert(OrderItem, orderItems);

        const count = await countEntities();
        res.status(200).json({ message: "DB seeded", count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error seeding DB", error });
    }
}

async function resetDb(req, res, next) {
    try {
        await deleteAllEntities();
        res.status(200).json({ message: "DB reset" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error resetting DB" });
    }
}

export default {
    seedDb,
    resetDb
}