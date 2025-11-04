// server/api/buses/index.post.ts
import { prisma } from '../../utils/prisma'
import { safeParse } from 'valibot'
import { BusCreateSchema } from '../../utils/schemas/bus'
import { defineEventHandler, readBody, createError } from 'h3'
import { toDateOrNull } from '../../utils/date'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const result = safeParse(BusCreateSchema, body)

    if (!result.success) {
      const mensajes = result.issues.map(i => i.message).join(', ')
      throw createError({ statusCode: 400, message: mensajes })
    }

    const data = result.output

    // Estado (relación)
    let estado = await prisma.estadoBus.findFirst({ where: { nombre_estado: data.estado } })
    if (!estado) estado = await prisma.estadoBus.create({ data: { nombre_estado: data.estado } })

    const creado = await prisma.bus.create({
      data: {
        patente: data.patente.toUpperCase(),
        modelo: data.modelo,
        anio: data.annio,                       // annio (req) → anio (DB)
        kilometraje: data.km ?? 0,

        // ⬇️ nuevos campos
        marca: data.marca ?? null,
        combustible: data.combustible ?? null,
        capacidad: data.capacidad ?? null,
        fecha_revision_tecnica: toDateOrNull(data.fecha_revision_tecnica),
        fecha_extintor: toDateOrNull(data.fecha_extintor),

        id_estado_bus: estado.id_estado_bus,
      },
      include: { estado_bus: true },
    })

    return {
      item: {
        id: creado.id_bus,
        plate: creado.patente,
        model: creado.modelo,
        brand: creado.marca,
        fuel: creado.combustible,
        year: creado.anio,
        km: creado.kilometraje,
        capacidad: creado.capacidad,
        fechaRevisionTecnica: creado.fecha_revision_tecnica?.toISOString().slice(0,10) ?? null,
        fechaExtintor: creado.fecha_extintor?.toISOString().slice(0,10) ?? null,
        estado: creado.estado_bus.nombre_estado,
      },
    }
  } catch (err: any) {
    if (err?.code === 'P2002') {
      throw createError({ statusCode: 409, message: 'La patente ya existe' })
    }
    if (err?.statusCode) throw err
    console.error('Error en POST /api/buses:', err)
    throw createError({ statusCode: 500, message: 'Error al crear el bus' })
  }
})
