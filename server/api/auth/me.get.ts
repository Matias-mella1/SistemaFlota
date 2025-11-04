// server/api/auth/me.get.ts
import { defineEventHandler, getCookie, setResponseStatus } from 'h3'
import jwt from 'jsonwebtoken'
import { object, number, string, array, optional, safeParse } from 'valibot'

const SECRET = process.env.JWT_SECRET || 'super-secret-key'

// Esquema del payload que firmaste en /api/auth/login
const AuthPayloadSchema = object({
  sub: number(),
  nombre: string(),
  username: optional(string()),
  roles: array(string()),
  iat: number(),
  exp: number(),
})

export default defineEventHandler(async (event) => {
  try {
    const token = getCookie(event, 'auth_token')
    if (!token) {
      setResponseStatus(event, 401)
      return { user: null }
    }

    // 1) Verificar firma del JWT
    const decoded = jwt.verify(token, SECRET)

    // 2) Narrowing: debe ser un objeto
    if (typeof decoded !== 'object' || decoded === null) {
      setResponseStatus(event, 401)
      return { user: null }
    }

    // 3) Validar estructura con Valibot (seguro y tipado)
    const result = safeParse(AuthPayloadSchema, decoded)
    if (!result.success) {
      setResponseStatus(event, 401)
      return { user: null }
    }

    const payload = result.output

    // 4) Responder el usuario normalizado
    return {
      user: {
        id: payload.sub,
        nombre: payload.nombre,
        username: payload.username,
        roles: payload.roles ?? [],
      },
    }
  } catch {
    setResponseStatus(event, 401)
    return { user: null }
  }
})
