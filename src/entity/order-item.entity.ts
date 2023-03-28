import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { IOrderItem } from "@core/models/entities/order-item.model"
import { Order } from "./order.entity"
import { Product } from "./product.entity"

@Entity()
export class OrderItem implements IOrderItem {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "int" })
    quantity: number

    @Column({ nullable: true })
    orderId: number

    @Column({ nullable: true, default: null })
    productId: number

    @ManyToOne(type => Order, order => order.orderItems, {
        onDelete: "CASCADE"
    })
    order: Order

    @ManyToOne(type => Product, product => product.orderItems, {
        onDelete: "CASCADE",
    })
    product: Product
}
