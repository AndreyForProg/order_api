import { Router } from 'express'
import OrderController from '../controllers/OrderController.js'
import OrderService from '../services/OrderService.js'
import User from '../models/User.js'
import Product from '../models/Product.js'
import Order from '../models/Order.js'
import { validateRequest, createOrderSchema } from '../utils/validator.js'

const router = Router()

const userModel = new User()
const productModel = new Product()
const orderModel = new Order()

const orderService = new OrderService(userModel, productModel, orderModel)
const orderController = new OrderController(orderService)

router.post('/', validateRequest(createOrderSchema), orderController.createOrder.bind(orderController))
router.get('/:userId', orderController.getUserOrders.bind(orderController))

export default router
