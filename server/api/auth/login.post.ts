import { verifyPassword } from '../../utils/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email dan password diperlukan.' })
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Email tidak ditemukan.' })
  }

  const isValid = await verifyPassword(password, user.password)
  if (!isValid) {
    throw createError({ statusCode: 401, statusMessage: 'Password salah.' })
  }

  return { message: 'Login berhasil', user: { id: user.id, email: user.email } }
})
