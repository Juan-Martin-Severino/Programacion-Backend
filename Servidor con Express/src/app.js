import express from "express"
import { ProductManager } from "./productManager.js";


//Seteo de la variable que contiene el puerto

const port = 8080

const pManager = new ProductManager("./productos.json")


//Creación de la aplición del servidor

const app = express()


//Ejecución del servidor

app.listen(port, () => console.log(`El servidor está escuchando en el puerto ${port}`))


app.get("/products", async (req, res) => {

    try {
        const limit = req.query.limit
        const products = await pManager.getProducts()
        const filteredProducts = products.filter(product => product.id <= limit)
        const result = limit ? filteredProducts : products
        res.send(result)
    } catch (error) {
        res.send(error.message)
    }
})

app.get("/products/:productId", async (req, res) => {

    try {
        const productId = parseInt(req.params.productId)
        const products = await pManager.getProducts()
        const product = products.find(e => e.id === productId)
        const result = product ? product : `El producto con id: ${productId} no existe`
        res.send(result)


    } catch (error) {
        res.send(error.message)

    }
})
