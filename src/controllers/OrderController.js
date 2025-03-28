export default class OrderController {
  constructor(orderService) {
    this.orderService = orderService
  }

  async createOrder(req, res, next) {
    try {
      const { userId, productId, quantity } = req.body
      console.log('Creating order with:', { userId, productId, quantity })

      const order = await this.orderService.createOrder(userId, productId, quantity)
      res.status(201).json(order)
    } catch (error) {
      next(error)
    }
  }

  async getUserOrders(req, res, next) {
    try {
      const { userId } = req.params
      console.log(userId)
      const orders = await this.orderService.getUserOrders(userId)
      res.json(orders)
    } catch (error) {
      next(error)
    }
  }
}
