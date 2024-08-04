import { Controller, ErrorCode } from './common'
import { InternalException } from './exceptions/internal-exception'
import { HttpException } from './exceptions/root'

export const ErrorHandler = (method: Controller) => {
  const controller: Controller = async (request, response, next) => {
    try {
      await method(request, response, next)
    } catch (error) {
      let exception: HttpException
      if (error instanceof HttpException) {
        exception = error
      } else {
        exception = new InternalException(
          'Something went wrong',
          error,
          ErrorCode.INTERNAL_EXCEPTION
        )
      }
      next(exception)
    }
  }

  return controller
}
