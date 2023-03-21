import { productCategoryController } from "../controllers/product-category.controller";

const express = require("express");
const router = express.Router();

router.get("/", productCategoryController.getAll);
router.get("/:id", productCategoryController.getOneById);
router.post("/", productCategoryController.createOne);
router.put("/", productCategoryController.updateOne);
router.delete("/:id", productCategoryController.deleteOneById);

export default router;