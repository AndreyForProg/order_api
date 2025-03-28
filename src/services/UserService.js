export default class UserService {
  constructor(userModel) {
    this.userModel = userModel
  }

  async getAllUsers() {
    try {
      const result = await this.userModel.query('SELECT id FROM users ORDER BY id')
      return result.rows
    } catch (error) {
      console.error('Error in getAllUsers:', error)
      throw error
    }
  }
}
