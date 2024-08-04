import { NextFunction, Request, Response } from 'express'
import { HttpException } from '../exceptions/root'

export const errorHandler = (
  error: HttpException,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  if (response.headersSent) {
    // If the headers are already sent, delegate to the default Express error handler
    return next(error)
  }

  response.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
    errors: error.errors,
  })
}
