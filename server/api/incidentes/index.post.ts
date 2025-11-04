// server/api/incidentes/index.post.ts
import { prisma } from '../../utils/prisma'
import { safeParse } from 'valibot'
import { CrearIncidenteDto } from '../../utils/schemas/incidente'

export default defineEventHandler(async (event) => {
  const bodyRaw = await readBody(event)
  const parsed = safeParse(CrearIncidenteDto, bodyRaw)
  if (!parsed.success) {
    const msg = parsed.issues?.[0]?.message || 'Datos inválidos'
    throw createError({ statusCode: 400, message: msg })
  }

  const body = parsed.output

  // 🔧 Estado por defecto: REPORTADO (ya no ABIERTO)
  let estadoId = body.id_estado_incidente
  if (!estadoId) {
    const estado = await prisma.estadoIncidente.findFirst({
      where: { nombre_estado: 'REPORTADO' },
    })

    estadoId = estado
      ? estado.id_estado_incidente
      : (
          await prisma.estadoIncidente.create({
            data: {
              nombre_estado: 'REPORTADO',
              descripcion: 'Levantado por usuario',
            },
          })
        ).id_estado_incidente
  }

  const created = await prisma.incidente.create({
    data: {
      id_bus: body.id_bus,
      id_usuario: body.id_usuario,
      descripcion: body.descripcion ?? null,
      fecha: body.fecha, // ya viene Date por el DTO
      urgencia: body.urgencia ?? null,
      ubicacion: body.ubicacion ?? null,
      id_estado_incidente: estadoId,
      id_tipo_incidente: body.id_tipo_incidente,
    },
    include: { bus: true, usuario: true, estado: true, tipo: true },
  })

  return {
    item: {
      id: created.id_incidente,
      id_bus: created.id_bus,
      id_usuario: created.id_usuario,
      fecha: created.fecha,
      descripcion: created.descripcion ?? '',
      urgencia: created.urgencia ?? '',
      ubicacion: created.ubicacion ?? '',
      id_estado_incidente: created.id_estado_incidente,
      estado: created.estado?.nombre_estado ?? '',
      id_tipo_incidente: created.id_tipo_incidente,
      tipo: created.tipo?.nombre_tipo ?? '',
      bus: created.bus
        ? `${created.bus.patente ?? ''} - ${created.bus.modelo ?? ''}`
        : '',
      usuario: created.usuario
        ? `${created.usuario.nombre ?? ''} ${created.usuario.apellido ?? ''}`.trim()
        : '',
    },
  }
})
