import { orderController } from "../controllers/order.controller";

const express = require("express");
const router = express.Router();

router.get("/", orderController.getAll);
router.get("/:id", orderController.getOneById);
router.post("/", orderController.createOne);
router.put("/", orderController.updateOne);
router.delete("/:id", orderController.deleteOneById);

export default router;