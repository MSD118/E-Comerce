import { User } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'

export enum ErrorCode {
  USER_ALREADY_EXISTS = 1000,
  USER_NOT_FOUND = 1001,
  INCORRECT_PASSWORD = 1002,
  UNPROCESSABLE_ENTITY = 1003,
  INTERNAL_EXCEPTION = 1004,
  UNAUTHORIZED = 1005,
  NOT_FOUND = 1006,
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

export type product = {
  id: number
  name: string
  description: string
  price: number
  tags: string[]
}

// Helper functions
export const getPaginationData = (
  count: number,
  per_page: number,
  current_page: number
) => {
  const total_pages = per_page ? Math.ceil(count / per_page) : 1
  return {
    count,
    per_page: per_page || count,
    total_pages,
    previous_page: current_page > 1 ? current_page - 1 : null,
    current_page,
    next_page: current_page < total_pages ? current_page + 1 : null,
    first_page: current_page === 1,
    last_page: current_page === total_pages,
    out_of_range: current_page > total_pages,
  }
}
