import { defineEventHandler, getRouterParam, createError } from 'h3'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!id || Number.isNaN(id)) {
    throw createError({ statusCode: 400, message: 'ID inválido' })
  }

  try {
    await prisma.mecanico.delete({ where: { id_mecanico: id } })
    return { ok: true }
  } catch (err: any) {
    if (err?.code === 'P2025') {
      throw createError({ statusCode: 404, message: 'Mecánico no encontrado' })
    }
    if (err?.code === 'P2003') {
      throw createError({ statusCode: 409, message: 'No se puede eliminar: está referenciado por otros registros' })
    }
    console.error('DELETE /api/mecanicos/[id] error:', err)
    throw createError({ statusCode: 500, message: 'Error eliminando mecánico' })
  }
})
