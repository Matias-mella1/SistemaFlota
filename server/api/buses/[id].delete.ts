import { prisma } from '../../utils/prisma'
import { defineEventHandler, getRouterParam, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!id || Number.isNaN(id)) {
    throw createError({ statusCode: 400, message: 'ID inválido' })
  }

  try {
    await prisma.bus.delete({ where: { id_bus: id } })
    return { ok: true, message: 'Bus eliminado correctamente' }
  } catch (err: any) {
    if (err?.code === 'P2025') {
      throw createError({ statusCode: 404, message: 'Bus no encontrado' })
    }
    console.error('Error en DELETE /api/buses:', err)
    throw createError({ statusCode: 500, message: 'Error al eliminar el bus' })
  }
})
