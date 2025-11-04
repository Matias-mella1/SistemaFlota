import { defineEventHandler, readBody, setCookie, setResponseStatus } from 'h3'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt' // o 'bcryptjs'
import { prisma } from '../../utils/prisma'

const SECRET = process.env.JWT_SECRET || 'super-secret-key'
const IDLE_SECONDS = 60 * 5               // 5 min sin recordar
const REMEMBER_SECONDS = 60 * 60 * 24 * 7  // 7 días con “Recordar”

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<{ username: string; password: string; remember?: boolean }>(event)
    const usernameOrEmail = (body?.username || '').trim()
    const password = (body?.password || '').trim()
    const remember = Boolean(body?.remember)

    if (!usernameOrEmail || !password) {
      setResponseStatus(event, 400)
      return { success: false, message: 'Faltan credenciales' }
    }

    const user = await prisma.usuario.findFirst({
      where: {
        OR: [
          { username: { equals: usernameOrEmail, mode: 'insensitive' } },
          { email: { equals: usernameOrEmail, mode: 'insensitive' } },
        ],
      },
      include: {
        estado_usuario: true,
        roles: { include: { rol: true } },
      },
    })

    // Evita timing leaks
    const DUMMY = '$2a$10$cKqzYh8gqVbWjT3s1gkW7uqcd2o5b9bGZz8wLQp0m9pJw3y9mVJmu'
    if (!user) {
      await bcrypt.compare(password, DUMMY)
      setResponseStatus(event, 401)
      return { success: false, message: 'Usuario o contraseña incorrectos' }
    }

    const estado = (user.estado_usuario?.nombre_estado || '').toLowerCase()
    if (estado !== 'activo') {
      setResponseStatus(event, 403)
      return { success: false, message: 'Usuario inactivo' }
    }

    const ok = await bcrypt.compare(password, user.password_hash)
    if (!ok) {
      setResponseStatus(event, 401)
      return { success: false, message: 'Usuario o contraseña incorrectos' }
    }

    const roles = user.roles.map(r => (r.rol.nombre_rol || '').toUpperCase())
    const expiresIn = remember ? REMEMBER_SECONDS : IDLE_SECONDS

    // Firmar JWT con lo que luego leerá /api/auth/me
    const payload = {
      sub: user.id_usuario,
      nombre: `${user.nombre} ${user.apellido}`.trim(),
      username: user.username,
      roles,
    }
    const token = jwt.sign(payload, SECRET, { expiresIn })

    // Cookie httpOnly
    setCookie(event, 'auth_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: expiresIn,
    })

    return {
      success: true,
      user: {
        id: user.id_usuario,
        nombre: payload.nombre,
        roles,
        username: user.username,
      },
    }
  } catch (e) {
    console.error(e)
    setResponseStatus(event, 500)
    return { success: false, message: 'Error interno' }
  }
})
