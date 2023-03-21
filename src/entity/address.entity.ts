import { Entity, PrimaryGeneratedColumn, Column, OneToOne, Relation, JoinColumn } from "typeorm"
import { IAddress } from "@core/models/entities/address.model";
import { Customer } from "./customer.entity";

@Entity()
export class Address implements IAddress {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: 100 })
    street: string

    @Column("varchar", { length: 100 })
    city: string

    @Column("varchar", { length: 20 })
    zipCode: string

    @Column("varchar", { length: 100 })
    country: string

    @Column({ unique: true })
    customerId: number

    @OneToOne(type => Customer, customer => customer.address, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    @JoinColumn()
    customer: Relation<Customer>
}
