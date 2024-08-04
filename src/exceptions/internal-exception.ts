import { ErrorCode, Errors } from '../common'
import { HttpException } from './root'

export class InternalException extends HttpException {
  constructor(message: string, errors: Errors, errorCode: ErrorCode) {
    super(message, errorCode, 500, errors)
  }
}
