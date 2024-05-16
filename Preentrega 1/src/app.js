import express from 'express'
import { __dirname } from './path.js'
import cartRouter from './routes/carts.router.js'
import productsRouter from './routes/products.router.js'


const port = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/carts/', cartRouter)
app.use('/api/products/', productsRouter)

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`)
})