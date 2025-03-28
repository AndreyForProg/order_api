import BaseModel from './BaseModel.js'

export default class Product extends BaseModel {
  constructor() {
    super('products')
  }

  async updateStock(productId, quantity) {
    const { rows } = await this.query(
      `UPDATE products 
       SET stock = stock - $1 
       WHERE id = $2 AND stock >= $1
       RETURNING *`,
      [quantity, productId],
    )
    return rows[0]
  }

  async getAvailable() {
    const { rows } = await this.query(
      `SELECT * FROM products 
       WHERE stock > 0 
       ORDER BY name`,
    )
    return rows
  }
}
