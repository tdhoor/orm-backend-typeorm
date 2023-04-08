import { Request, Response, NextFunction } from "express";
import { execTest } from "@core/functions/exec-test.function";
import { Product } from "../entity/product.entity";
import { DB } from "../db"
import { IProductController } from "@core/models/controllers/product-controller.model";
import { countEntities } from "../functions/count-entities.function";

class ProductController implements IProductController {
    createOne(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return DB.manager.save(Product, req.body);
        }, countEntities)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json({ msg: "Error creating product" })
                console.log(error);
            })
    }

    getOneById(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return DB.manager.findOne(Product, {
                where: {
                    id: +req.params.id
                }
            })
        }, countEntities)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json({ msg: "Error getting product" })
                console.log(error);
            })
    }

    getAll(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return DB.manager.find(Product, {
                order: {
                    name: "ASC"
                },
                take: 100
            })
        }, countEntities)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json({ msg: "Error creating products" })
                console.log(error);
            })
    }

    updateOne(req: Request, res: Response, next: NextFunction) {
        execTest(async () => {
            const { id, ...product } = req.body;
            await DB.manager.update(Product, id, product);
            return await DB.manager.findOne(Product, {
                where: {
                    id
                }
            })
        }, countEntities)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json({ msg: "Error updating product" })
                console.log(error);
            })
    }

    deleteOneById(req: Request, res: Response, next: NextFunction) {
        execTest(async () => {
            const id = +req.params.id
            await DB.manager.delete(Product, id);
            return id;
        }, countEntities)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json({ msg: "Error deleting product" })
                console.log(error);
            })
    }

    getProductsFromCategory(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return DB.manager.find(Product, {
                where: {
                    productCategory: {
                        name: req.params.name
                    }
                },
                order: {
                    name: "ASC"
                },
                take: 100
            })
        }, countEntities)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json({ msg: "Error getting products from category" })
                console.log(error);
            })
    }
}

export const productController = new ProductController();