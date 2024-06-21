import express from 'express'
import morgan from 'morgan'
import cartRouter from './routes/carts.router.js'
import productsRouter from './routes/products.router.js'
import { __dirname } from './utils/path.js'
import { initMongoDB } from './db/dbMongo.js'


const port = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))


app.use('/api/carts/', cartRouter)
app.use('/api/products/', productsRouter)

initMongoDB()

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`)
})