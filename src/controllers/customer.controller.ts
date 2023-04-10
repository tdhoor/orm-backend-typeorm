import { Request, Response, NextFunction } from "express";
import { ICustomerController } from "@core/models/controllers/customer-controller.model";
import { execTest } from "@core/functions/exec-test.function";
import { Customer } from "../entity/customer.entity";
import { Order } from "../entity/order.entity";
import { Product } from "../entity/product.entity";
import { DB } from "../db"
import { getMaxBatchSize } from "@core/functions/get-max-batch-size.function";

class CustomerController implements ICustomerController {
    createMany(req: Request, res: Response, next: NextFunction) {
        execTest(async () => {
            const maxBatchSize = getMaxBatchSize(req.body);
            let count = 0;
            while (req.body.length > 0) {
                const insertResult = await DB.manager.createQueryBuilder()
                    .insert()
                    .into(Customer)
                    .values(req.body.splice(0, maxBatchSize))
                    .execute();
                count += insertResult.generatedMaps.length;
            }
            return { count };
        })
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json({ msg: "Error creating customers" })
                console.log(error);
            })
    }

    getCustomerOrders(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return DB.manager.find(Order, {
                where: {
                    customerId: +req.params.id
                },
                order: {
                    createdAt: "DESC"
                },
                relations: ["orderItems"],
                take: 100
            })
        })
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json({ msg: "Error getting customer orders" })
                console.log(error);
            })
    }

    getCustomerProducts(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return DB.manager.find(Product, {
                where: {
                    orderItems: {
                        order: {
                            customer: {
                                id: +req.params.id
                            }
                        }
                    }
                },
                order: {
                    name: "ASC"
                },
                take: 100
            })
        })
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json({ msg: "Error getting customer products" })
                console.log(error);
            })
    }

    createOne(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return DB.manager.save(Customer, req.body);
        })
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json({ msg: "Error creating customer" })
                console.log(error);
            })
    }

    getOneById(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return DB.manager.findOne(Customer, {
                where: {
                    id: +req.params.id
                },
                relations: ["address"]
            })
        })
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json({ msg: "Error getting customer" })
                console.log(error);
            })
    }

    getAll(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return DB.manager.find(Customer, {
                take: 100,
                relations: ["address"]
            })
        })
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json({ msg: "Error getting customers" })
                console.log(error);
            })
    }

    updateOne(req: Request, res: Response, next: NextFunction) {
        execTest(async () => {
            const { id, ...customer } = req.body;
            await DB.manager.update(Customer, id, customer);
            return await DB.manager.findOne(Customer, {
                where: {
                    id
                }
            })
        })
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json({ msg: "Error updating customer" })
                console.log(error);
            })
    }

    deleteOneById(req: Request, res: Response, next: NextFunction) {
        execTest(async () => {
            const id = +req.params.id
            await DB.manager.delete(Customer, id);
            return id;
        })
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json({ msg: "Error deleting customer" })
                console.log(error);
            })
    }

}

export const customerController = new CustomerController();