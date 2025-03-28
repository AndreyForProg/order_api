import rateLimit from 'express-rate-limit'

export const orderRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 минута
  max: 10,
  keyGenerator: req => req.ip,
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many requests. Limit: 10 requests per minute',
    })
  },
})
