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

    @Column({ nullable: true })
    productId: number

    @ManyToOne(type => Order, order => order.orderItems, {
        cascade: true,
        onDelete: "CASCADE"
    })
    order: Order

    @ManyToOne(type => Product, product => product.orderItems, {
        cascade: true,
        onDelete: "CASCADE"
    })
    product: Product
}
