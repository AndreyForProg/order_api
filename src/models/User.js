import BaseModel from './BaseModel.js'

export default class User extends BaseModel {
  constructor() {
    super('users')
  }

  async create(name, email, balance) {
    const { rows } = await this.query(
      `INSERT INTO users (name, email, balance) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [name, email, balance],
    )
    return rows[0]
  }

  async subtractBalance(userId, amount) {
    const { rows } = await this.query(
      `UPDATE users 
       SET balance = balance - $1 
       WHERE id = $2 AND balance >= $1
       RETURNING *`,
      [amount, userId],
    )
    return rows[0]
  }
}
