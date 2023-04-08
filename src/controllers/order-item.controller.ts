import { Request, Response, NextFunction } from "express";
import { ICrudController } from "@core/models/controllers/crud-controller.mock";
import { execTest } from "@core/functions/exec-test.function";
import { OrderItem } from "../entity/order-item.entity";
import { DB } from "../db"
import { countEntities } from "../functions/count-entities.function";

class OrderItemController implements ICrudController {
    createOne(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return DB.manager.save(OrderItem, req.body);
        }, countEntities)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json({ msg: "Error creating order item" })
                console.log(error);
            })
    }

    getOneById(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return DB.manager.findOne(OrderItem, {
                where: {
                    id: +req.params.id
                }
            })
        }, countEntities)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json({ msg: "Error getting order item" })
                console.log(error);
            })
    }

    getAll(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return DB.manager.find(OrderItem, { take: 100 })
        }, countEntities)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json({ msg: "Error getting order items" })
                console.log(error);
            })
    }

    updateOne(req: Request, res: Response, next: NextFunction) {
        execTest(async () => {
            const id = +req.body.id
            await DB.manager.update(OrderItem, id, req.body);
            return await DB.manager.findOne(OrderItem, {
                where: {
                    id
                }
            })
        }, countEntities)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json({ msg: "Error updating order item" })
                console.log(error);
            })
    }

    deleteOneById(req: Request, res: Response, next: NextFunction) {
        execTest(async () => {
            const id = +req.params.id
            await DB.manager.delete(OrderItem, id);
            return id;
        }, countEntities)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json({ msg: "Error deleting order item" })
                console.log(error);
            })
    }
}

export const orderItemController = new OrderItemController();