import express, { Express } from 'express'
import { PORT } from './secrets'
import { rootRouter } from './routes'
import { PrismaClient } from '@prisma/client'
import { errorHandler } from './middlewares/errors.middleware'

const app: Express = express()

app.use(express.json())
app.use('/api', rootRouter)

export const prismaClient = new PrismaClient({
  log: ['query'],
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log('Server is running...')
})
