import { AppError } from '../middlewares/error.js'

export default class OrderService {
  constructor(userModel, productModel, orderModel) {
    this.userModel = userModel
    this.productModel = productModel
    this.orderModel = orderModel
  }

  async createOrder(userId, productId, quantity) {
    // Start transaction
    const client = await this.orderModel.pool.connect()

    try {
      await client.query('BEGIN')

      const user = await this.userModel.findById(userId, client)
      console.log('Found user:', user)
      if (!user) {
        throw new AppError('User not found', 404)
      }

      const product = await this.productModel.findById(productId, client)
      console.log('Found product:', product)
      if (!product) {
        throw new AppError('Product not found', 404)
      }

      if (product.stock < quantity) {
        throw new AppError('Insufficient stock', 400)
      }

      // check if user has enough balance
      const totalPrice = parseFloat(product.price) * quantity
      if (parseFloat(user.balance) < totalPrice) {
        throw new AppError('Insufficient balance', 400)
      }

      const updatedUser = await this.userModel.subtractBalance(userId, totalPrice, client)
      if (!updatedUser) {
        throw new AppError('Failed to update user balance', 500)
      }

      const updatedProduct = await this.orderModel.updateProductStock(productId, quantity, client)
      if (!updatedProduct) {
        throw new AppError('Failed to update product stock', 500)
      }

      const order = await this.orderModel.createOrder(userId, productId, quantity, totalPrice, client)

      // Commit transaction
      await client.query('COMMIT')

      return {
        id: order.id,
        user_id: order.user_id,
        product_id: order.product_id,
        product_name: product.name,
        quantity: order.quantity,
        total_price: order.total_price,
        created_at: order.created_at,
      }
    } catch (error) {
      // Rollback transaction in case of error
      await client.query('ROLLBACK')
      console.error('Error in createOrder:', error)
      throw error
    } finally {
      // Release the client back to the pool
      client.release()
    }
  }

  async getUserOrders(userId) {
    try {
      console.log('Getting orders for user:', userId)

      const result = await this.userModel.query(
        `SELECT o.*, p.name as product_name, p.price 
         FROM orders o 
         JOIN products p ON o.product_id = p.id 
         WHERE o.user_id = $1 
         ORDER BY o.created_at DESC`,
        [userId],
      )

      console.log('Query result:', result)
      return result.rows
    } catch (error) {
      console.error('Error in getUserOrders:', error)
      throw new AppError('Failed to fetch user orders', 500)
    }
  }
}
