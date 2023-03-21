import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn, Relation } from "typeorm"
import { ICustomer } from "@core/models/entities/customer.model";
import { Address } from "./address.entity";
import { Order } from "./order.entity";

@Entity()
export class Customer implements ICustomer {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: 500 })
    email: string

    @Column("varchar", { length: 50 })
    phone: string

    @Column("varchar", { length: 500 })
    password: string

    @Column("varchar", { length: 50 })
    firstName: string

    @Column("varchar", { length: 50 })
    lastName: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToOne(type => Address, address => address.customer, {
        cascade: true
    })
    address: Relation<Address>

    @OneToMany(type => Order, order => order.customer)
    orders: Order[]
}
