import seedController from "../controllers/seed.controller";

const express = require("express");
const router = express.Router();

router.get("/reset", seedController.resetDb);
router.get("/:amount", seedController.seedDb);
router.get("/count", seedController.countAll);

export default router;