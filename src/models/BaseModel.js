import pool from '../config/db.js'

export default class BaseModel {
  constructor(tableName) {
    this.table = tableName
    this.pool = pool
  }

  async query(sql, params) {
    const client = await this.pool.connect()
    try {
      return await client.query(sql, params)
    } finally {
      client.release()
    }
  }

  async findById(id) {
    const { rows } = await this.query(`SELECT * FROM ${this.table} WHERE id = $1`, [id])
    return rows[0] || null
  }
}
