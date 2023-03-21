import { addressController } from "../controllers/address-controller";

const express = require("express");
const router = express.Router();

router.get("/", addressController.getAll);
router.get("/:id", addressController.getOneById);
router.post("/", addressController.createOne);
router.put("/", addressController.updateOne);
router.delete("/:id", addressController.deleteOneById);

export default router;