/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = pgm => {
  pgm.createExtension('uuid-ossp', { ifNotExists: true })

  pgm.createTable('users', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('uuid_generate_v4()') },
    name: { type: 'varchar(255)', notNull: true },
    email: { type: 'varchar(255)', notNull: true, unique: true },
    balance: { type: 'decimal(10,2)', default: 100.0, check: 'balance >= 0' },
  })

  pgm.createTable('products', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('uuid_generate_v4()') },
    name: { type: 'varchar(255)', notNull: true },
    price: { type: 'decimal(10,2)', notNull: true, check: 'price > 0' },
    stock: { type: 'integer', notNull: true, check: 'stock >= 0' },
  })

  pgm.createTable('orders', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('uuid_generate_v4()') },
    user_id: { type: 'uuid', references: 'users', onDelete: 'cascade' },
    product_id: { type: 'uuid', references: 'products', onDelete: 'set null' },
    quantity: { type: 'integer', notNull: true, check: 'quantity > 0' },
    total_price: { type: 'decimal(10,2)', notNull: true },
    created_at: { type: 'timestamp', default: pgm.func('NOW()') },
  })
}

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = pgm => {
  pgm.dropTable('orders')
  pgm.dropTable('products')
  pgm.dropTable('users')
  pgm.dropExtension('uuid-ossp')
}
