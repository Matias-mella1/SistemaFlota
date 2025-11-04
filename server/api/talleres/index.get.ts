import { defineEventHandler, getQuery, createError } from 'h3'
import { prisma } from '../../utils/prisma'
import { safeParse, TallerQuerySchema } from '../../utils/schemas/taller'

export default defineEventHandler(async (event) => {
  const parsed = safeParse(TallerQuerySchema, getQuery(event))
  if (!parsed.success) {
    const msg = parsed.issues.map(i => i.message).join(', ')
    throw createError({ statusCode: 400, message: msg })
  }
  const { id_tipo_taller, q } = parsed.output

  const where: any = {}
  if (id_tipo_taller) where.id_tipo_taller = id_tipo_taller
  if (q) {
    const term = String(q).trim()
    if (term) {
      where.OR = [
        { nombre:     { contains: term, mode: 'insensitive' } },
        { contacto:   { contains: term, mode: 'insensitive' } },
        { email:      { contains: term, mode: 'insensitive' } },
        { tipo_taller:{ nombre_tipo: { contains: term, mode: 'insensitive' } } },
      ]
    }
  }

  const rows = await prisma.taller.findMany({
    where,
    orderBy: { nombre: 'asc' },
    include: {
      tipo_taller: { select: { id_tipo_taller: true, nombre_tipo: true } },
      _count: { select: { mecanicos: true, mantenimientos: true } },
    },
  })

  return { items: rows }
})
