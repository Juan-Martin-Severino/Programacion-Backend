import { Router } from "express";
import * as controller from "../controllers/product.controller.js"
import { productValidator } from '../middlewares/productValidator.js'
import { idValidator } from "../middlewares/idValidator.js";



const router = Router();

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.post("/", productValidator, controller.create);

router.put("/:id", idValidator, controller.update);

router.delete("/:id", controller.remove);

export default router;