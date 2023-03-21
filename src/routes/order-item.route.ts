import { orderItemController } from "../controllers/order-item.controller";

const express = require("express");
const router = express.Router();

router.get("/", orderItemController.getAll);
router.get("/:id", orderItemController.getOneById);
router.post("/", orderItemController.createOne);
router.put("/", orderItemController.updateOne);
router.delete("/:id", orderItemController.deleteOneById);

export default router;