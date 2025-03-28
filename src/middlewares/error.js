import logger from './logger.js'

// class for custom errors
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
  }
}

// Middleware for error handling
export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  // error logging
  logger.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
    requestBody: req.body,
    requestParams: req.params,
    requestQuery: req.query,
  })

  if (err.code === '23505') {
    // PostgreSQL unique violation
    return res.status(400).json({
      status: 'fail',
      message: 'Duplicate value not allowed',
    })
  }

  if (err.message === 'Insufficient balance') {
    return res.status(400).json({
      status: 'fail',
      message: 'Insufficient balance to complete the order',
    })
  }

  if (err.message === 'Insufficient stock') {
    return res.status(400).json({
      status: 'fail',
      message: 'Product is out of stock or insufficient quantity',
    })
  }

  // in production, send only a general error message
  if (process.env.NODE_ENV === 'production') {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      })
    }
    // software errors: do not send details to the client
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    })
  }

  // in development, send full error information
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  })
}

// Middleware for handling non-existent routes
export const notFound = (req, res, next) => {
  const error = new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  next(error)
}
