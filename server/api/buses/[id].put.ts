// server/api/buses/[id].put.ts
import { prisma } from '../../utils/prisma'
import { safeParse } from 'valibot'
import { BusUpdateSchema } from '../../utils/schemas/bus'
import { defineEventHandler, readBody, getRouterParam, createError } from 'h3'
import { toDateOrNull } from '../../utils/date'

export default defineEventHandler(async (event) => {
  try {
    const id = Number(getRouterParam(event, 'id'))
    if (!id || Number.isNaN(id)) {
      throw createError({ statusCode: 400, message: 'ID inválido' })
    }

    const body = await readBody(event)
    const result = safeParse(BusUpdateSchema, body)

    if (!result.success) {
      const mensajes = result.issues.map(i => i.message).join(', ')
      throw createError({ statusCode: 400, message: mensajes })
    }

    const data = result.output
    const bus = await prisma.bus.findUnique({ where: { id_bus: id } })
    if (!bus) throw createError({ statusCode: 404, message: 'Bus no encontrado' })

    const datos: any = {}
    if (data.patente) datos.patente = data.patente.toUpperCase()
    if (data.modelo !== undefined) datos.modelo = data.modelo
    if (data.annio  !== undefined) datos.anio = data.annio
    if (data.km     !== undefined) datos.kilometraje = data.km

    // ⬇️ nuevos campos
    if (data.marca !== undefined) datos.marca = data.marca
    if (data.combustible !== undefined) datos.combustible = data.combustible
    if (data.capacidad !== undefined) datos.capacidad = data.capacidad
    if (data.fecha_revision_tecnica !== undefined) datos.fecha_revision_tecnica = toDateOrNull(data.fecha_revision_tecnica)
    if (data.fecha_extintor !== undefined) datos.fecha_extintor = toDateOrNull(data.fecha_extintor)

    if (data.estado) {
      const est = await prisma.estadoBus.findFirst({ where: { nombre_estado: data.estado } })
      if (!est) throw createError({ statusCode: 400, message: 'Estado inválido' })
      datos.id_estado_bus = est.id_estado_bus
    }

    const actualizado = await prisma.bus.update({
      where: { id_bus: id },
      data: datos,
      include: { estado_bus: true },
    })

    return {
      item: {
        id: actualizado.id_bus,
        plate: actualizado.patente,
        model: actualizado.modelo,
        brand: actualizado.marca,
        fuel: actualizado.combustible,
        year: actualizado.anio,
        km: actualizado.kilometraje ?? 0,
        capacidad: actualizado.capacidad ?? 0,
        fechaRevisionTecnica: actualizado.fecha_revision_tecnica?.toISOString().slice(0,10) ?? null,
        fechaExtintor: actualizado.fecha_extintor?.toISOString().slice(0,10) ?? null,
        estado: actualizado.estado_bus.nombre_estado,
      },
    }
  } catch (err: any) {
    if (err?.code === 'P2025') {
      throw createError({ statusCode: 404, message: 'Bus no encontrado' })
    }
    if (err?.statusCode) throw err
    console.error('Error en PUT /api/buses:', err)
    throw createError({ statusCode: 500, message: 'Error al actualizar el bus' })
  }
})
