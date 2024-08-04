import { ErrorCode } from '../common'
import { HttpException } from './root'

export class UserNotFoundException extends HttpException {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, errorCode, 404, null)
  }
}
export class NotFoundException extends HttpException {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, errorCode, 404, null)
  }
}
