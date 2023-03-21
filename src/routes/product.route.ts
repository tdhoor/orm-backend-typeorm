import { productController } from "../controllers/product.controller";

const express = require("express");
const router = express.Router();

router.get("/", productController.getAll);
router.get("/:id", productController.getOneById);
router.get("/category/:name", productController.getProductsFromCategory);
router.post("/", productController.createOne);
router.put("/", productController.updateOne);
router.delete("/:id", productController.deleteOneById);

export default router;