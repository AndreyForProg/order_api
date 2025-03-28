export default class ProductController {
  constructor(productService) {
    this.productService = productService
  }

  async getAllProducts(req, res, next) {
    try {
      const products = await this.productService.getAllProducts()
      res.json(products)
    } catch (error) {
      next(error)
    }
  }
}
