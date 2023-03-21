import { customerController } from "../controllers/customer.controller";

const express = require("express");
const router = express.Router();

router.get("/", customerController.getAll);
router.get("/:id", customerController.getOneById);
router.get("/:id/orders", customerController.getCustomerOrders);
router.get("/:id/products", customerController.getCustomerProducts);
router.post("/", customerController.createOne);
router.post("/bulk", customerController.createMany);
router.put("/", customerController.updateOne);
router.delete("/:id", customerController.deleteOneById);

export default router;