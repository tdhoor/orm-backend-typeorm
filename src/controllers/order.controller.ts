import { Request, Response, NextFunction } from "express";
import { ICrudController } from "@core/models/controllers/crud-controller.mock";
import { execTest } from "@core/functions/exec-test.function";
import { Order } from "../entity/order.entity";
import { DB } from "../db"
import { countEntities } from "../functions/count-entities.function";

class OrderController implements ICrudController {
    createOne(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return DB.manager.save(Order, req.body);
        }, countEntities)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json({ msg: "Error creating order" })
                console.log(error);
            })
    }

    getOneById(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return DB.manager.findOne(Order, {
                where: {
                    id: +req.params.id
                },
                relations: ["orderItems"]
            })
        }, countEntities)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json({ msg: "Error getting order" })
                console.log(error);
            })
    }

    getAll(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return DB.manager.find(Order, {
                relations: ["orderItems"],
                order: {
                    createdAt: "DESC"
                },
                take: 100
            })
        }, countEntities)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json({ msg: "Error getting orders" })
                console.log(error);
            })
    }

    updateOne(req: Request, res: Response, next: NextFunction) {
        execTest(async () => {
            const { id, ...order } = req.body;
            await DB.manager.update(Order, id, order);
            return await DB.manager.findOne(Order, {
                where: {
                    id
                }
            })
        }, countEntities)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json({ msg: "Error updating order" })
                console.log(error);
            })
    }

    deleteOneById(req: Request, res: Response, next: NextFunction) {
        execTest(async () => {
            const id = +req.params.id
            await DB.manager.delete(Order, id);
            return id;
        }, countEntities)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json({ msg: "Error deleting order" })
                console.log(error);
            })
    }
}

export const orderController = new OrderController();