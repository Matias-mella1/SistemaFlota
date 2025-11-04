import { prisma } from '../../../utils/prisma'
import { defineEventHandler, getRouterParam, readBody, createError, setHeader } from 'h3'
import { hashPassword } from '../../../utils/password'

export default defineEventHandler(async (event) => {
  setHeader(event, 'Cache-Control', 'no-store')
  const codigo = String(getRouterParam(event, 'codigo') || '')
  const body = await readBody<{ password?: string }>(event)
  const pw = (body?.password || '').trim()

  if (!codigo) throw createError({ statusCode: 400, message: 'Token requerido' })
  if (pw.length < 8) throw createError({ statusCode: 400, message: 'La contraseña debe tener al menos 8 caracteres' })

  const token = await prisma.tokenRestablecimiento.findUnique({ where: { codigo_token: codigo } })
  if (!token) throw createError({ statusCode: 404, message: 'Token inválido' })
  if (token.fecha_expiracion < new Date()) throw createError({ statusCode: 410, message: 'Token expirado' })
  if (token.fecha_uso) throw createError({ statusCode: 409, message: 'Token ya utilizado' })

  const password_hash = await hashPassword(pw)

  await prisma.$transaction([
    prisma.usuario.update({
      where: { id_usuario: token.id_usuario },
      data: { password_hash },
    }),
    prisma.tokenRestablecimiento.update({
      where: { codigo_token: codigo },
      data: { fecha_uso: new Date() },
    }),
  ])

  return { ok: true }
})
