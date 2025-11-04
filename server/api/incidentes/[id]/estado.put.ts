import { prisma } from '../../../utils/prisma'
import { safeParse } from 'valibot'
import { CambiarEstadoDto } from '../../../utils/schemas/incidente'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!id) throw createError({ statusCode: 400, message: 'ID inválido' })

  const bodyRaw = await readBody(event)
  const parsed = safeParse(CambiarEstadoDto, bodyRaw)
  if (!parsed.success) {
    const msg = parsed.issues?.[0]?.message || 'Datos inválidos'
    throw createError({ statusCode: 400, message: msg })
  }

  const updated = await prisma.incidente.update({
    where: { id_incidente: id },
    data: { id_estado_incidente: parsed.output.id_estado_incidente },
    include: { estado: true },
  })

  return { ok: true, id: updated.id_incidente, estado: updated.estado?.nombre_estado ?? '' }
})
