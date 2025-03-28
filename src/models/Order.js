import BaseModel from './BaseModel.js'

export default class Order extends BaseModel {
  constructor() {
    super('orders')
  }

  async createOrder(userId, productId, quantity, totalPrice) {
    const { rows } = await this.query(
      `INSERT INTO orders (user_id, product_id, quantity, total_price) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [userId, productId, quantity, totalPrice],
    )
    return rows[0]
  }

  async getUserOrders(userId) {
    const { rows } = await this.query(
      `SELECT o.*, p.name as product_name, p.price 
       FROM orders o 
       JOIN products p ON o.product_id = p.id 
       WHERE o.user_id = $1 
       ORDER BY o.created_at DESC`,
      [userId],
    )
    return rows
  }

  async updateProductStock(productId, quantity) {
    const { rows } = await this.query(
      `UPDATE products 
       SET stock = stock - $1 
       WHERE id = $2 AND stock >= $1 
       RETURNING *`,
      [quantity, productId],
    )
    return rows[0]
  }
}
