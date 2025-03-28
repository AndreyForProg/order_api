import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { orderRateLimiter } from './src/config/rateLimit.js'
import orderRoutes from './src/routes/order.routers.js'
import userRoutes from './src/routes/user.routers.js'
import productRoutes from './src/routes/product.routers.js'
import { loggerMiddleware } from './src/middlewares/logger.js'
import { errorHandler, notFound } from './src/middlewares/error.js'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())
app.use(loggerMiddleware)

app.use('/orders', orderRateLimiter, orderRoutes)
app.use('/users', userRoutes)
app.use('/products', productRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
