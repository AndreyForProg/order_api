import express from 'express'
import UserController from '../controllers/UserController.js'
import UserService from '../services/UserService.js'
import User from '../models/User.js'

const router = express.Router()

const userModel = new User()

const userService = new UserService(userModel)
const userController = new UserController(userService)

router.get('/', userController.getAllUsers.bind(userController))

export default router
