import { User } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'

export enum ErrorCode {
  USER_ALREADY_EXISTS = 1000,
  USER_NOT_FOUND = 1001,
  INCORRECT_PASSWORD = 1002,
  UNPROCESSABLE_ENTITY = 1003,
  INTERNAL_EXCEPTION = 1004,
  UNAUTHORIZED = 1005,
}

export type jwtPayload = {
  id: number
  email: string
}

export type Controller = (
  request: Request & { user?: User },
  response: Response,
  next: NextFunction
) => void

export type Errors = object | null | undefined | string | unknown
