import express from 'express'
import { __dirname } from './utils/path.js'
import cartRouter from './routes/carts.router.js'
import productsRouter from './routes/products.router.js'
import viewsRouter from './routes/views.router.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'



const port = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(express.static(`${__dirname}/public`))


app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', `${__dirname}/views`)
app.use('/', viewsRouter)

app.use('/api/carts/', cartRouter)
app.use('/api/products/', productsRouter)


const httpServer = app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`)
})

const socketServer = new Server(httpServer)