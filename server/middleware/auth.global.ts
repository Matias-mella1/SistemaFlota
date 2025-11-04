// server/middleware/auth.global.ts
import { defineEventHandler, getCookie } from 'h3'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'super-secret-key'

export default defineEventHandler((event) => {
  const token = getCookie(event, 'auth_token')
  if (!token) { event.context.user = null; return }

  try {
    const payload = jwt.verify(token, SECRET) as any
    event.context.user = {
      id: Number(payload.userId ?? payload.sub),
      nombre: String(payload.nombre ?? ''),
      roles: Array.isArray(payload.roles) ? payload.roles : [],
    }
  } catch {
    event.context.user = null
  }
})
