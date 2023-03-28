import { Request, Response, NextFunction } from "express";
import { ICrudController } from "@core/models/controllers/crud-controller.mock";
import { execTest } from "@core/functions/exec-test.function";
import { Address } from "../entity/address.entity";
import { DB } from "../db"
import { countEntities } from "../functions/count-entities.function";

class AddressController implements ICrudController {
    createOne(req: Request, res: Response, next: NextFunction) {
        execTest(() => {
            return DB.manager.save(Address, req.body);
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
            return DB.manager.findOne(Address, {
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
            return DB.manager.find(Address, { take: 100 })
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
            return DB.manager.save(Address, req.body);
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
            const id = +req.params.id
            await DB.manager.delete(Address, id);
            return id;
        }, countEntities)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).send(error);
            })
    }
}

export const addressController = new AddressController();