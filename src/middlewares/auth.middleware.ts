import { Controller, ErrorCode, jwtPayload } from '../common'
import { UnauthorizedException } from '../exceptions/unauthorized'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../secrets'
import { prismaClient } from '..'

export const authMiddleware: Controller = async (request, _response, next) => {
  // 1. Get the token from the request headers
  const token = request.headers.authorization

  // 2. if token is not present, throw an error of unauthorized
  if (!token) {
    next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
    return
  }

  try {
    // 3. if the token is present , verify that token and extract the payload
    const payload = jwt.verify(token, JWT_SECRET) as jwtPayload

    // 4. to get the user from the payload
    const user = await prismaClient.user.findFirst({
      where: { email: payload.email },
    })

    if (!user) {
      next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
      return
    }

    // 5. to attach the user to the current request object
    request.user = user
    next()
  } catch (error) {
    next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
  }
}
