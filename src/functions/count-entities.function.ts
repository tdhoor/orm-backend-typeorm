import { DB } from "../db";
import { Address } from "../entity/address.entity";
import { Customer } from "../entity/customer.entity";
import { OrderItem } from "../entity/order-item.entity";
import { Order } from "../entity/order.entity";
import { ProductCategory } from "../entity/product-category.entity";
import { Product } from "../entity/product.entity";

export async function countEntities() {
    return {
        address: await DB.manager.count(Address),
        customer: await DB.manager.count(Customer),
        order: await DB.manager.count(Order),
        orderItem: await DB.manager.count(OrderItem),
        product: await DB.manager.count(Product),
        productCategory: await DB.manager.count(ProductCategory),
    }
}