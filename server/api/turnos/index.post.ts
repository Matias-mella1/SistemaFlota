// server/api/turnos/index.post.ts
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    id_usuario: number
    id_bus: number
    inicio: string
    fin: string
    titulo?: string
    descripcion?: string
  }>(event)

  if (!body?.id_usuario || !body?.id_bus || !body?.inicio || !body?.fin) {
    throw createError({ statusCode: 400, message: 'Faltan datos obligatorios' })
  }

  const inicio = new Date(body.inicio)
  const fin = new Date(body.fin)
  if (!(inicio < fin)) {
    throw createError({ statusCode: 400, message: 'Inicio debe ser menor que fin' })
  }

  // Estados que ocupan recursos
  const ESTADOS_OCUPA = ['ASIGNADO', 'EN_CURSO', 'ACTIVO', 'PENDIENTE']

  // 🔒 Conflicto BUS (nuevo.inicio < t.fin && nuevo.fin > t.inicio)
  const busConflict = await prisma.turnoConductor.findFirst({
    where: {
      id_bus: body.id_bus,
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

  // 🔒 Conflicto CONDUCTOR
  const driverConflict = await prisma.turnoConductor.findFirst({
    where: {
      id_usuario: body.id_usuario,
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

  // Buscar o crear estado por defecto
  let estado = await prisma.estadoTurno.findFirst({ where: { nombre_estado: 'ASIGNADO' } })
  if (!estado) estado = await prisma.estadoTurno.create({ data: { nombre_estado: 'ASIGNADO' } })

  const created = await prisma.turnoConductor.create({
    data: {
      id_usuario: body.id_usuario,
      id_bus: body.id_bus,
      hora_inicio: inicio,
      hora_fin: fin,
      fecha: inicio,
      id_estado_turno: estado.id_estado_turno,
      titulo: body.titulo || null,
      descripcion: body.descripcion || null,
    },
    include: { usuario: true, bus: true, estado: true },
  })

  return {
    item: {
      id: created.id_turno,
      usuarioId: created.id_usuario,
      usuarioNombre: [created.usuario?.nombre, created.usuario?.apellido].filter(Boolean).join(' ') || '',
      busId: created.id_bus,
      busLabel: `${created.bus?.patente ?? ''} - ${created.bus?.modelo ?? ''}`,
      inicio: created.hora_inicio,
      fin: created.hora_fin,
      estado: created.estado?.nombre_estado ?? '',
      titulo: created.titulo ?? '',
      descripcion: created.descripcion ?? '',
    },
  }
})
