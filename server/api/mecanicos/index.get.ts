import { defineEventHandler, getQuery, createError } from 'h3'
import { prisma } from '../../utils/prisma'
import { safeParse, MecanicoQuerySchema } from '../../utils/schemas/mecanico'


export default defineEventHandler(async (event) => {
  const qRaw = getQuery(event)
  const parsed = safeParse(MecanicoQuerySchema, qRaw)
  if (!parsed.success) {
    const msg = parsed.issues.map(i => i.message).join(', ')
    throw createError({ statusCode: 400, message: msg })
  }
  const { id_taller, q } = parsed.output

  const where: any = {}
  if (id_taller) where.id_taller = id_taller
  if (q) {
    const term = String(q).trim()
    if (term) {
      where.OR = [
        { nombre:   { contains: term, mode: 'insensitive' } },
        { apellido: { contains: term, mode: 'insensitive' } },
        { taller:   { nombre: { contains: term, mode: 'insensitive' } } },
      ]
    }
  }

  const rows = await prisma.mecanico.findMany({
    where,
    orderBy: [{ apellido: 'asc' }, { nombre: 'asc' }],
    include: { taller: { select: { id_taller: true, nombre: true } } },
  })

  return { items: rows }
})
