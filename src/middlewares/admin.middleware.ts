import { Controller, ErrorCode } from '../common';
import { UnauthorizedException } from '../exceptions/unauthorized';

export const adminMiddleware: Controller = async (request, _response, next) => {
  const user = request.user;

  if (user && user.role === 'ADMIN') {
    next();
  } else {
    next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED));
  }
};
