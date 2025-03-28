import { z } from 'zod'

// validation for creating an order
export const createOrderSchema = z.object({
  userId: z.string().uuid(),
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
})

// validation for getting user orders
export const getUserOrdersSchema = z.object({
  userId: z.string().uuid(),
})

// validation for creating a user
export const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  balance: z.number().optional().default(100),
})

// validation for creating a product
export const createProductSchema = z.object({
  name: z.string().min(2),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
})

// middleware for validation
export const validateRequest = schema => {
  return async (req, res, next) => {
    try {
      const validated = await schema.parseAsync(req.body)
      req.validatedData = validated
      next()
    } catch (error) {
      res.status(400).json({
        error: 'Validation failed',
        details: error.errors,
      })
    }
  }
}
