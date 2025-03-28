import pool from '../config/db.js'

export default class BaseModel {
  constructor(tableName) {
    this.pool = pool
    this.tableName = tableName
  }

  async query(text, params) {
    try {
      return await this.pool.query(text, params)
    } catch (error) {
      console.error(`Database query error: ${error.message}`)
      throw error
    }
  }

  // base methods for working with the database
  async findById(id) {
    try {
      console.log(`Searching in table ${this.tableName} for ID:`, id)
      const query = `SELECT * FROM ${this.tableName} WHERE id = $1`
      console.log('Executing query:', query)

      const { rows } = await this.query(query, [id])
      console.log('Query result:', rows)

      return rows[0]
    } catch (error) {
      console.error(`Error in findById:`, error)
      throw error
    }
  }

  async findAll() {
    const { rows } = await this.query(`SELECT * FROM ${this.tableName}`)
    return rows
  }
}
