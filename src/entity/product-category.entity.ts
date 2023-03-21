import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { IProductCategory } from "@core/models/entities/product-category.model"
import { Product } from "./product.entity"

@Entity()
export class ProductCategory implements IProductCategory {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: 100 })
    name: string

    @OneToMany(type => Product, product => product.productCategory)
    products: Product[]
}
