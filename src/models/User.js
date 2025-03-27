import BaseModel from './BaseModel.js'

export default class User extends BaseModel {
  constructor() {
    super('users')
  }

  async subtractCost(userId, amount) {
    const { rows } = await this.query(
      `UPDATE users 
       SET balance = balance - $1 
       WHERE id = $2 
       RETURNING *`,
      [amount, userId],
    )
    return rows[0]
  }
}
