import { hashSync, compareSync } from 'bcrypt'
import { prismaClient } from '..'
import { Controller } from '../common'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../secrets'
import { BadRequestException } from '../exceptions/bad-request'
import { ErrorCode } from '../common'
import { SignupSchema } from '../schema/users'
import { UserNotFoundException } from '../exceptions/not-found'

export const signup: Controller = async (request, response) => {
  SignupSchema.parse(request.body)
  const { email, password, name } = request.body

  let user = await prismaClient.user.findFirst({ where: { email } })

  if (user) {
    throw new BadRequestException(
      'User already exists',
      ErrorCode.USER_ALREADY_EXISTS
    )
  }

  user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
    },
  })

  response.status(200).json(user)
}

export const login: Controller = async (request, response) => {
  const { email, password } = request.body

  const user = await prismaClient.user.findFirst({ where: { email } })

  if (!user) {
    throw new UserNotFoundException('User Not Found', ErrorCode.USER_NOT_FOUND)

    return
  }

  if (user && !compareSync(password, user.password)) {
    throw new BadRequestException(
      'Incorrect Password',
      ErrorCode.INCORRECT_PASSWORD
    )

    return
  }
  const token = jwt.sign(
    {
      id: user?.id,
      email: user?.email,
    },
    JWT_SECRET
  )

  response.status(200).json({
    user: {
      id: user?.id,
      name: user?.name,
      email: user?.email,
    },
    token,
  })
}

export const me: Controller = async (request, response) => {
  response.status(200).json(request.user)
}
