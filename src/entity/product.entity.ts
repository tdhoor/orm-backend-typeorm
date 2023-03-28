import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { IProduct } from "@core/models/entities/product.model"
import { ProductCategory } from "./product-category.entity"
import { OrderItem } from "./order-item.entity"

@Entity()
export class Product implements IProduct {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: 100 })
    name: string

    @Column("text")
    description: string

    @Column({ type: "float" })
    price: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column({ nullable: true, default: null })
    productCategoryId: number

    @ManyToOne(type => ProductCategory, productCategory => productCategory.products, {
        onDelete: "SET NULL"
    })
    @JoinColumn()
    productCategory: ProductCategory

    @OneToMany(type => OrderItem, orderItem => orderItem.product)
    orderItems: OrderItem[]
}
