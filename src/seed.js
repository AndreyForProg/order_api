import pool from './config/db.js'

async function seed() {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const {
      rows: [userCount],
    } = await client.query('SELECT COUNT(*) FROM users')
    const {
      rows: [productCount],
    } = await client.query('SELECT COUNT(*) FROM products')

    if (parseInt(userCount.count) === 0) {
      await client.query(`
        INSERT INTO users (name, email, balance) 
        VALUES 
          ('Jane Smith', 'jane@example.com', 5000)
      `)
      console.log('Users seeded')
    }

    if (parseInt(productCount.count) === 0) {
      await client.query(`
        INSERT INTO products (name, price, stock) 
        VALUES 
          ('iPhone 14', 999.99, 10),
          ('MacBook Pro', 1999.99, 5),
          ('AirPods Pro', 249.99, 15)
      `)
      console.log('Products seeded')
    }

    await client.query('COMMIT')
    console.log('Seeding completed successfully')
  } catch (error) {
    await client.query('ROLLBACK')
    console.error('Error seeding data:', error)
  } finally {
    client.release()
    pool.end()
  }
}

seed()
