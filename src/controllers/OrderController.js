export default class OrderController {
  constructor(orderService) {
    this.orderService = orderService
  }

  async createOrder(req, res) {
    try {
      const order = await this.orderService.createOrder(req.params.userId, req.body.productId, req.body.quantity)
      res.status(201).json(order)
    } catch (error) {
      this.handleError(error, res)
    }
  }

  handleError(error, res) {
    switch (error.message) {
      case 'User not found':
        return res.status(404).json({ error: error.message })
      case 'Product not found':
        return res.status(404).json({ error: error.message })
      case 'Insufficient balance':
        return res.status(403).json({ error: error.message })
      case 'Insufficient stock':
        return res.status(409).json({ error: error.message })
      default:
        res.status(500).json({ error: 'Internal server error' })
    }
  }
}
