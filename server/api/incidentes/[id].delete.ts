import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!id) throw createError({ statusCode: 400, message: 'ID inválido' })
  await prisma.incidente.delete({ where: { id_incidente: id } })
  return { ok: true }
})
