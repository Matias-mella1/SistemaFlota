import { prisma } from '../../utils/prisma'
import { defineEventHandler, readBody, createError } from 'h3'
import { safeParse } from 'valibot'
import { MantenimientoCreateSchema } from '../../utils/schemas/mantenimiento'
import { toDateOrNull } from '../../utils/date'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // Validación Valibot
    const parsed = safeParse(MantenimientoCreateSchema, body)
    if (!parsed.success) {
      const msg = parsed.issues.map(i => i.message).join(', ')
      throw createError({ statusCode: 400, message: msg })
    }
    const data = parsed.output

    // Validación FK (opcional pero útil)
    const [bus, taller, tipo, estado] = await Promise.all([
      prisma.bus.findUnique({ where: { id_bus: data.id_bus } }),
      prisma.taller.findUnique({ where: { id_taller: data.id_taller } }),
      prisma.tipoMantenimiento.findUnique({ where: { id_tipo_mantenimiento: data.id_tipo_mantenimiento } }),
      prisma.estadoMantenimiento.findUnique({ where: { id_estado_mantenimiento: data.id_estado_mantenimiento } })
    ])
    if (!bus)    throw createError({ statusCode: 400, message: 'Bus no encontrado' })
    if (!taller) throw createError({ statusCode: 400, message: 'Taller no encontrado' })
    if (!tipo)   throw createError({ statusCode: 400, message: 'Tipo de mantenimiento inválido' })
    if (!estado) throw createError({ statusCode: 400, message: 'Estado de mantenimiento inválido' })

    // Construir data sin enviar null en costo
    const createData: any = {
      id_bus: data.id_bus,
      id_taller: data.id_taller,
      id_tipo_mantenimiento: data.id_tipo_mantenimiento,
      id_estado_mantenimiento: data.id_estado_mantenimiento,
      fecha: toDateOrNull(data.fecha)!,     // 'YYYY-MM-DD' -> Date (UTC)
      observaciones: data.observaciones ?? null,
    }
    if (data.costo !== undefined && data.costo !== null) {
      createData.costo = data.costo           // number|string|DecimalJsLike válido para Prisma Decimal
    }

    const creado = await prisma.mantenimiento.create({
      data: createData,
      include: {
        bus:    { select: { id_bus: true, patente: true } },
        taller: { select: { id_taller: true, nombre: true } },
        tipo:   { select: { id_tipo_mantenimiento: true, nombre_tipo: true } },
        estado: { select: { id_estado_mantenimiento: true, nombre_estado: true } }
      }
    })

    return {
      item: {
        id_mantenimiento: creado.id_mantenimiento,
        id_bus: creado.id_bus,
        id_taller: creado.id_taller,
        id_tipo_mantenimiento: creado.id_tipo_mantenimiento,
        id_estado_mantenimiento: creado.id_estado_mantenimiento,
        fecha: creado.fecha,
        costo: creado.costo != null ? Number(creado.costo) : null,
        observaciones: creado.observaciones,
        // Devolver los objetos incluidos (como espera tu front)
        bus: creado.bus,
        taller: creado.taller,
        tipo: creado.tipo,
        estado: creado.estado,
      }
    }
  } catch (err: any) {
    console.error('❌ Error en POST /api/mantenimientos:', err)
    if (err?.statusCode) throw err
    throw createError({ statusCode: 500, message: 'Error al crear mantenimiento' })
  }
})
