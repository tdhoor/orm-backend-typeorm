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
                res.status(500).send(error);
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
                res.status(500).send(error);
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
                res.status(500).send(error);
            })
    }

    updateOne(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return DB.manager.save(Product, req.body);
        }, countEntities)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).send(error);
            })
    }

    deleteOneById(req: Request, res: Response, next: NextFunction) {
        execTest(async () => {
            return await DB.manager.delete(Product, { id: +req.params.id });
        }, countEntities)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).send(error);
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
                res.status(500).send(error);
            })
    }
}

export const productController = new ProductController();