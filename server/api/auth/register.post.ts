import { hashPassword } from '../../utils/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email & password wajib diisi.' })
  }

  const userExists = await prisma.user.findUnique({ where: { email } })
  if (userExists) {
    throw createError({ statusCode: 409, statusMessage: 'Email sudah terdaftar.' })
  }

  const hashedPassword = await hashPassword(password)

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword
    }
  })

  return { id: user.id, email: user.email }
})
