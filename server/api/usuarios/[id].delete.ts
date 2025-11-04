// Archivo: /server/api/usuarios/[id].delete.ts

import { defineEventHandler, getRouterParam, createError } from 'h3'
import { prisma } from '../../utils/prisma'
// import { requireRole } from '../../utils/requiereRole' // Descomentar si usas autenticación

export default defineEventHandler(async (event) => {
  // requireRole(event, ['ADMINISTRADOR']) // Ejemplo de uso

  const id = Number(getRouterParam(event, 'id'))
  if (!id) throw createError({ statusCode: 400, message: 'ID inválido' })

  try {
    // 1) Eliminar relaciones de roles primero
    await prisma.usuarioRol.deleteMany({ where: { id_usuario: id } })
    
    // 2) Eliminar el usuario
    await prisma.usuario.delete({ where: { id_usuario: id } })
    
    return { ok: true }
  } catch (err: any) {
    if (err?.code === 'P2003') {
      // P2003: Violación de llave foránea, es decir, el usuario aún tiene registros en otras tablas (turnos, incidentes, etc.)
      throw createError({ statusCode: 409, message: 'No se puede eliminar: el usuario tiene registros relacionados (turnos, incidentes, etc.)' })
    }
    if (err?.statusCode) throw err
    console.error('Error eliminando usuario:', err)
    throw createError({ statusCode: 500, message: 'Error eliminando usuario' })
  }
})