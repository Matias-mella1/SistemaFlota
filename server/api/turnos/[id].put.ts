// server/api/turnos/[id].put.ts
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!id) throw createError({ statusCode: 400, message: 'ID inválido' })

  const body = await readBody<{
    id_bus?: number
    inicio?: string
    fin?: string
    titulo?: string
    descripcion?: string
    id_estado_turno?: number
  }>(event)

  const current = await prisma.turnoConductor.findUnique({ where: { id_turno: id } })
  if (!current) throw createError({ statusCode: 404, message: 'Turno no encontrado' })

  const id_bus = typeof body.id_bus === 'number' ? body.id_bus : current.id_bus
  const inicio = body.inicio ? new Date(body.inicio) : new Date(current.hora_inicio)
  const fin    = body.fin    ? new Date(body.fin)    : new Date(current.hora_fin!)
  const titulo = body.titulo !== undefined ? (body.titulo || null) : current.titulo
  const descripcion = body.descripcion !== undefined ? (body.descripcion || null) : current.descripcion
  const id_estado_turno = typeof body.id_estado_turno === 'number' ? body.id_estado_turno : current.id_estado_turno

  if (!(inicio < fin)) {
    throw createError({ statusCode: 400, message: 'Inicio debe ser menor que fin' })
  }

  const ESTADOS_OCUPA = ['ASIGNADO', 'EN_CURSO', 'ACTIVO', 'PENDIENTE']

  // 🔒 Conflicto BUS (excluye el mismo turno)
  const busConflict = await prisma.turnoConductor.findFirst({
    where: {
      id_turno: { not: id },
      id_bus,
      hora_inicio: { lt: fin },
      hora_fin: { gt: inicio },
      estado: { nombre_estado: { in: ESTADOS_OCUPA } },
    },
    select: { id_turno: true, hora_inicio: true, hora_fin: true },
  })
  if (busConflict) {
    throw createError({
      statusCode: 409,
      message: 'El bus ya está asignado en ese horario.',
      data: { conflicto: busConflict },
    })
  }

  // 🔒 Conflicto CONDUCTOR (excluye el mismo turno)
  const driverConflict = await prisma.turnoConductor.findFirst({
    where: {
      id_turno: { not: id },
      id_usuario: current.id_usuario,
      hora_inicio: { lt: fin },
      hora_fin: { gt: inicio },
      estado: { nombre_estado: { in: ESTADOS_OCUPA } },
    },
    select: { id_turno: true, hora_inicio: true, hora_fin: true },
  })
  if (driverConflict) {
    throw createError({
      statusCode: 409,
      message: 'El conductor ya tiene un turno en ese horario.',
      data: { conflicto: driverConflict },
    })
  }

  const updated = await prisma.turnoConductor.update({
    where: { id_turno: id },
    data: {
      id_bus,
      hora_inicio: inicio,
      hora_fin: fin,
      titulo,
      descripcion,
      id_estado_turno,
    },
    include: { usuario: true, bus: true, estado: true },
  })

  return {
    item: {
      id: updated.id_turno,
      usuarioId: updated.id_usuario,
      usuarioNombre: [updated.usuario?.nombre, updated.usuario?.apellido].filter(Boolean).join(' ') || '',
      busId: updated.id_bus,
      busLabel: `${updated.bus?.patente ?? ''} - ${updated.bus?.modelo ?? ''}`,
      inicio: updated.hora_inicio,
      fin: updated.hora_fin,
      estado: updated.estado?.nombre_estado ?? '',
      titulo: updated.titulo ?? '',
      descripcion: updated.descripcion ?? '',
    },
  }
})
