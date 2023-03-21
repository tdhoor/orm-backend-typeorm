import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm"
import { IOrder } from "@core/models/entities/order.model"
import { Customer } from "./customer.entity"
import { OrderItem } from "./order-item.entity"

@Entity()
export class Order implements IOrder {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "float" })
    totalPrice: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column({ nullable: true })
    customerId: number

    @ManyToOne(type => Customer, customer => customer.orders, {
        onDelete: "SET NULL"
    })
    customer: Customer

    @OneToMany(type => OrderItem, orderItem => orderItem.order)
    orderItems: OrderItem[]
}
