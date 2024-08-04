import { ErrorCode, Errors } from '../common'
import { HttpException } from './root'

export class UnprocessableEntity extends HttpException {
  constructor(message: string, errors: Errors, errorCode: ErrorCode) {
    super(message, errorCode, 422, errors)
  }
}
