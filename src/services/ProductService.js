export default class ProductService {
  constructor(productModel) {
    this.productModel = productModel
  }

  async getAllProducts() {
    try {
      const result = await this.productModel.query('SELECT id, name FROM products ORDER BY id')
      return result.rows
    } catch (error) {
      console.error('Error in getAllProducts:', error)
      throw error
    }
  }
}
