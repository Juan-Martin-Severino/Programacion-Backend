import { Router } from "express"
import CartManager from "../managers/cart.manager.js";
import { __dirname } from "../utils/path.js";

const router = Router()
const cartManager = new CartManager(`${__dirname}/db/carrito.json`);

router.post("/:idCart/product/:idProd", async (req, res, next) => {
    try {
        const { idProd } = req.params;
        const { idCart } = req.params;
        const response = await cartManager.saveProductToCart(idCart, idProd);
        res.json(response);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res) => {
    try {
        res.json(await cartManager.createCart());
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.get("/:idCart", async (req, res) => {
    try {
        const { idCart } = req.params
        res.json(await cartManager.getCartById(idCart))
    } catch (error) {
        console.log(error);
    }
});

export default router