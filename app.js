const dotenv = require('dotenv')
const express = require('express')
const app = express()
const orderRouter = require('./src/routs/order.routers')
const port = 3020

dotenv.config()

app.use(express.json())

app.use('/api/order', orderRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
