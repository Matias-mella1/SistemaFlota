import { prisma } from '../../utils/prisma'
import { defineEventHandler, readBody, createError, setResponseStatus } from 'h3'
import crypto from 'crypto'
import { hashPassword } from '../../utils/password'
import { Resend } from 'resend'  // 👈 usamos la API Resend

type Body = {
  rut:string; nombre:string; apellido:string;
  email:string; username:string;
  telefono?:string; licencia?:string;
  activo?:boolean; roles?:string[];
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<Body>(event)

    // 1️⃣ Estado del usuario
    const estadoStr = body.activo ? 'ACTIVO' : 'INACTIVO'
    const estado = await prisma.estadoUsuario.findFirst({
      where: { nombre_estado: estadoStr }
    })
    if (!estado) throw createError({ statusCode: 400, message: 'Estado inválido' })

    // 2️⃣ Contraseña temporal (cumplir NOT NULL)
    const tempPlain = crypto.randomBytes(16).toString('hex')
    const tempHash  = await hashPassword(tempPlain)

    // 3️⃣ Transacción BD: crear usuario + roles + token
    const { created, codigo_token } = await prisma.$transaction(async (tx) => {
      const createdUser = await tx.usuario.create({
        data: {
          rut: body.rut.trim(),
          nombre: body.nombre.trim(),
          apellido: body.apellido.trim(),
          email: body.email.trim().toLowerCase(),
          username: body.username.trim(),
          telefono: body.telefono?.trim() || undefined,
          licencia_con: body.licencia?.trim() || undefined,
          password_hash: tempHash,
          estado_usuario: { connect: { id_estado_usuario: estado.id_estado_usuario } },
        },
      })

      // Roles (opcional)
      if (Array.isArray(body.roles) && body.roles.length > 0) {
        const roles = await tx.rol.findMany({
          where: { nombre_rol: { in: body.roles.map(r => r.trim()).filter(Boolean) } }
        })
        if (roles.length !== body.roles.length) {
          const found = new Set(roles.map(r => r.nombre_rol))
          const missing = body.roles.filter(r => !found.has(r))
          throw createError({ statusCode: 400, message: `Roles inválidos: ${missing.join(', ')}` })
        }
        const now = new Date()
        for (const r of roles) {
          await tx.usuarioRol.upsert({
            where: { id_usuario_id_rol: { id_usuario: createdUser.id_usuario, id_rol: r.id_rol } },
            update: { estado: 'ACTIVO', fecha_inicio: now, fecha_fin: null },
            create: { id_usuario: createdUser.id_usuario, id_rol: r.id_rol, estado: 'ACTIVO', fecha_inicio: now },
          })
        }
      }

      // Token de restablecimiento (24h)
      const token = crypto.randomBytes(32).toString('hex')
      const expira = new Date(Date.now() + 1000 * 60 * 60 * 24)
      await tx.tokenRestablecimiento.create({
        data: {
          codigo_token: token,
          id_usuario: createdUser.id_usuario,
          fecha_expiracion: expira,
        },
      })

      return { created: createdUser, codigo_token: token }
    })

    // 4️⃣ Envío del correo (Resend)
    let emailError: string | null = null
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const appUrl = process.env.PUBLIC_APP_URL || 'https://checkbus.cl'
      const fromAddr = (process.env.MAIL_FROM || '').trim()
      const fromName = (process.env.MAIL_NAME || 'CheckBus').trim()
      const link = `${appUrl}/set-password?token=${codigo_token}`

     const { error } = await resend.emails.send({
  from: `${fromName} <${fromAddr}>`,
  to: created.email,
  subject: 'Bienvenido a CheckBus 🚍',
  html: `
    <div style="font-family:system-ui,Segoe UI,Arial,sans-serif;line-height:1.5">
      <h2>¡Hola ${created.nombre}!</h2>
      <p>Tu cuenta ha sido creada correctamente en <strong>CheckBus</strong>.</p>
      <p>Para establecer tu contraseña, haz clic en el siguiente enlace:</p>
      <p>
        <a href="${link}" target="_blank"
          style="display:inline-block;background:#2563eb;color:#fff;padding:10px 16px;
                 border-radius:8px;text-decoration:none;">
          Definir contraseña
        </a>
      </p>
      <p>Si no solicitaste esta cuenta, ignora este mensaje.</p>
      <hr/>
      <small>Este enlace expirará en 24 horas.</small>
    </div>
  `,
  headers: {
    'List-Unsubscribe': '<mailto:soporte@checkbus.cl>', // 👈 añadido aquí
  },
})

      if (error) {
        throw new Error(error.message)
      }

      console.log(`📬 Correo enviado a ${created.email}`)
    } catch (e: any) {
      console.error('⚠️ Error enviando correo de bienvenida:', e?.message || e)
      emailError = 'Usuario creado, pero no se pudo enviar el correo de activación.'
    }

    // 5️⃣ Respuesta final
    setResponseStatus(event, 201)
    const u = await prisma.usuario.findUnique({
      where: { id_usuario: created.id_usuario },
      include: { estado_usuario: true, roles: { include: { rol: true } } },
    })

    return {
      item: {
        id: u!.id_usuario,
        rut: u!.rut,
        nombre: u!.nombre,
        apellido: u!.apellido,
        email: u!.email,
        username: u!.username,
        telefono: u!.telefono ?? '',
        licencia: u!.licencia_con ?? '',
        estado: u!.estado_usuario?.nombre_estado ?? '',
        roles: u!.roles.filter(x => x.estado === 'ACTIVO').map(x => x.rol.nombre_rol),
      },
      message: emailError
        ? 'Usuario creado. Hubo un problema enviando el correo.'
        : 'Usuario creado y correo de activación enviado.',
      ...(emailError ? { emailError } : {}),
    }

  } catch (err:any) {
    if (err?.code === 'P2002') {
      throw createError({ statusCode: 409, message: 'El correo o usuario ya existe' })
    }
    if (err?.statusCode) throw err
    console.error('❌ Error creando usuario:', err)
    throw createError({ statusCode: 500, message: 'Error al crear usuario' })
  }
})
