import { defineEventHandler, readBody, createError } from 'h3'
import { prisma } from '../../utils/prisma'
import { safeParse, TallerCreateSchema } from '../../utils/schemas/taller'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const parsed = safeParse(TallerCreateSchema, body)
    if (!parsed.success) {
      const msg = parsed.issues.map(i => i.message).join(', ')
      throw createError({ statusCode: 400, message: msg })
    }
    const data = parsed.output

    // Verifica que exista el tipo
    const tipo = await prisma.tipoTaller.findUnique({ where: { id_tipo_taller: data.id_tipo_taller } })
    if (!tipo) throw createError({ statusCode: 400, message: 'Tipo de taller no existe' })

    const t = await prisma.taller.create({ data })
    return { id_taller: t.id_taller }
  } catch (err: any) {
    if (err?.code === 'P2003') {
      throw createError({ statusCode: 400, message: 'Tipo de taller inválido' })
    }
    if (err?.statusCode) throw err
    console.error('POST /api/talleres error:', err)
    throw createError({ statusCode: 500, message: 'Error creando taller' })
  }
})
