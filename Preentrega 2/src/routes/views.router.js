import { Router } from "express";
import { __dirname } from "../utils/path.js";
import ProductManager from "../managers/product.manager.js";


const router = Router()
const productManager = new ProductManager(`${__dirname}/db/productos.json`)


router.get("/", async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts(limit);
        res.render("home", { products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/realtimeproducts", async (req, res) => {
    res.render("realtimeproducts");
});

export default router;