// server/api/turnos/index.get.ts
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const q = getQuery(event)
  const usuarioId = q.usuarioId ? Number(q.usuarioId) : undefined

  const where: any = {}
  if (usuarioId) where.id_usuario = usuarioId

  const rows = await prisma.turnoConductor.findMany({
    where,
    include: { usuario: true, bus: true, estado: true },
    orderBy: { hora_inicio: 'desc' },
  })

  const items = rows.map(t => ({
    id: t.id_turno,
    usuarioId: t.id_usuario,
    usuarioNombre: [t.usuario?.nombre, t.usuario?.apellido].filter(Boolean).join(' ') || '',
    busId: t.id_bus,
    busLabel: `${t.bus?.patente ?? ''} - ${t.bus?.modelo ?? ''}`,
    inicio: t.hora_inicio,
    fin: t.hora_fin,
    estado: t.estado?.nombre_estado ?? '',
    titulo: t.titulo ?? '',
    descripcion: t.descripcion ?? '',
  }))

  return { items }
})
