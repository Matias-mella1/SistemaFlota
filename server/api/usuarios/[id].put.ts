// Archivo: /server/api/usuarios/[id].put.ts

import { prisma } from '../../utils/prisma'
import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'
import { safeParse } from 'valibot'
import { UsuarioUpdateSchema } from '../../utils/schemas/usuario' // Asumiendo que esta es la dependencia
import { hashPassword } from '../../utils/password'

export default defineEventHandler(async (event) => {
  try {
    const id = Number(getRouterParam(event, 'id'))
    if (!id) throw createError({ statusCode: 400, message: 'Id inválido' })

    const body = await readBody(event)
    const parsed = safeParse(UsuarioUpdateSchema, body)
    if (!parsed.success) {
      const msg = parsed.issues.map(i => i.message).join(', ')
      throw createError({ statusCode: 400, message: msg })
    }
    const data = parsed.output

    let estadoConnect: any = undefined
    if (typeof data.activo === 'boolean') {
      const estadoStr = data.activo ? 'ACTIVO' : 'INACTIVO'
      const estado = await prisma.estadoUsuario.findFirst({ where: { nombre_estado: estadoStr } })
      if (!estado) throw createError({ statusCode: 400, message: 'Estado inválido' })
      estadoConnect = { connect: { id_estado_usuario: estado.id_estado_usuario } }
    }

    const updateData: any = {
      rut: data.rut,
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      username: data.username,
      telefono: data.telefono,
      licencia_con: data.licencia,
      ...(estadoConnect ? { estado_usuario: estadoConnect } : {}),
    }

    if (data.password) {
      updateData.password_hash = await hashPassword(data.password)
    }

    await prisma.usuario.update({
      where: { id_usuario: id },
      data: updateData,
    })

    // 4) Lógica para actualizar los roles
    if (Array.isArray(data.roles)) {
      const roles = await prisma.rol.findMany({ where: { nombre_rol: { in: data.roles } } })
      const now = new Date()

      // Desactivar roles que YA NO están en la lista (UPDATE: estado=INACTIVO)
      await prisma.usuarioRol.updateMany({
        where: { id_usuario: id, NOT: { rol: { nombre_rol: { in: data.roles } } } },
        data: { estado: 'INACTIVO', fecha_fin: now },
      })

      // Activar/Crear roles que SI están en la lista
      for (const r of roles) {
        await prisma.usuarioRol.upsert({
          where: { id_usuario_id_rol: { id_usuario: id, id_rol: r.id_rol } },
          update: { estado: 'ACTIVO', fecha_inicio: now, fecha_fin: null },
          create: { id_usuario: id, id_rol: r.id_rol, estado: 'ACTIVO', fecha_inicio: now },
        })
      }
    }

    // Buscar el usuario actualizado para la respuesta
    const u = await prisma.usuario.findUnique({
      where: { id_usuario: id },
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
    }
  } catch (err: any) {
    if (err?.code === 'P2002') {
      throw createError({ statusCode: 409, message: 'Username o email ya existe' })
    }
    if (err?.statusCode) throw err
    console.error('Error editando usuario:', err)
    throw createError({ statusCode: 500, message: 'Error editando usuario' })
  }
})