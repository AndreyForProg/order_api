import express from 'express'
import ProductController from '../controllers/ProductController.js'
import ProductService from '../services/ProductService.js'
import Product from '../models/Product.js'

const router = express.Router()

const productModel = new Product()

const productService = new ProductService(productModel)
const productController = new ProductController(productService)

router.get('/', productController.getAllProducts.bind(productController))

export default router
