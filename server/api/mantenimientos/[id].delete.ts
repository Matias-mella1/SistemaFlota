import { prisma } from '../../utils/prisma'
import { defineEventHandler, getRouterParam, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!id) throw createError({ statusCode: 400, message: 'ID inválido' })

  try {
    await prisma.mantenimiento.delete({ where: { id_mantenimiento: id } })
    return { ok: true, message: 'Mantenimiento eliminado correctamente' }
  } catch (err:any) {
    if (err?.code === 'P2025')
      throw createError({ statusCode: 404, message: 'Mantenimiento no encontrado' })
    throw createError({ statusCode: 500, message: 'Error al eliminar mantenimiento' })
  }
})
