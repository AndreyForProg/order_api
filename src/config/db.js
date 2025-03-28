import pkg from 'pg'
const { Pool } = pkg

const pool = new Pool({
  connectionString: 'postgres://order_app:order_app_pass@localhost:5433/order_app_db',
})

export default pool
