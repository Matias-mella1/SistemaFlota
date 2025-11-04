// server/api/conductor/turnos/index.get.ts
import { prisma } from '../../../utils/prisma'

export default defineEventHandler(async (event) => {
  setHeader(event, 'Cache-Control', 'no-store')

  const q = getQuery(event)
  // 1) intenta desde auth (cookie)
  let idUsuario =
    Number((event as any).context?.auth?.user?.id_usuario) ||
    Number((event as any).context?.auth?.user?.id) || 0

  // 2) fallback: query param
  if (!idUsuario && q.id_usuario) idUsuario = Number(q.id_usuario)

  if (!idUsuario) {
    throw createError({ statusCode: 400, message: 'Falta id_usuario del conductor' })
  }

  // filtros opcionales
  const whereAny: any = { id_usuario: idUsuario }
  if (q.from) whereAny.hora_inicio = { gte: new Date(String(q.from)) }
  if (q.to) {
    whereAny.hora_fin = {
      ...(whereAny.hora_fin || {}),
      lte: new Date(String(q.to)),
    }
  }

  const rows = await prisma.turnoConductor.findMany({
    where: whereAny,
    include: { bus: true, estado: true },
    orderBy: { hora_inicio: 'desc' },
  })

  return {
    items: rows.map((t) => ({
      id: t.id_turno,
      id_usuario: t.id_usuario,
      fecha: t.fecha ?? null,
      hora_inicio: t.hora_inicio,
      hora_fin: t.hora_fin,
      // SOLO patente (como pediste)
      bus: t.bus?.patente ?? '—',
      estado: t.estado?.nombre_estado ?? null,
      titulo: t.titulo ?? null,
      descripcion: t.descripcion ?? null,
    })),
  }
})
