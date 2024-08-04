// message, status code, error codes, error

import { ErrorCode, Errors } from '../common'

export class HttpException extends Error {
  message: string
  errorCode: ErrorCode
  statusCode: number
  errors: Errors

  constructor(
    message: string,
    errorCode: ErrorCode,
    statusCode: number,
    errors: Errors
  ) {
    super(message)
    this.message = message
    this.errorCode = errorCode
    this.statusCode = statusCode
    this.errors = errors
  }
}
