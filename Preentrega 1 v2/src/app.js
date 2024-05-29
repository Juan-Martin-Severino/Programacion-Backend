import express from 'express'
import cartRouter from './routes/carts.router.js'
import productsRouter from './routes/products.router.js'
import { __dirname } from './utils/path.js'


const port = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/carts/', cartRouter)
app.use('/api/products/', productsRouter)

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`)
})