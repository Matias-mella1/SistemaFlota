import { prisma } from '../../utils/prisma'
import { defineEventHandler, readBody, getRouterParam, createError } from 'h3'
import { safeParse } from 'valibot'
import { MantenimientoUpdateSchema } from '../../utils/schemas/mantenimiento'
import { toDateOrNull } from '../../utils/date'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!id) throw createError({ statusCode: 400, message: 'ID inválido' })

  const body = await readBody(event)
  const parsed = safeParse(MantenimientoUpdateSchema, body)

  if (!parsed.success) {
    const msg = parsed.issues.map(i => i.message).join(', ')
    throw createError({ statusCode: 400, message: msg })
  }

  const data = parsed.output

  const updateData: any = {}
  if (data.id_bus) updateData.id_bus = data.id_bus
  if (data.id_taller) updateData.id_taller = data.id_taller
  if (data.id_tipo_mantenimiento) updateData.id_tipo_mantenimiento = data.id_tipo_mantenimiento
  if (data.id_estado_mantenimiento) updateData.id_estado_mantenimiento = data.id_estado_mantenimiento
  if (data.fecha) updateData.fecha = toDateOrNull(data.fecha)
  if (data.costo !== undefined) updateData.costo = data.costo
  if (data.observaciones !== undefined) updateData.observaciones = data.observaciones

  const actualizado = await prisma.mantenimiento.update({
    where: { id_mantenimiento: id },
    data: updateData,
    include: {
      bus: { select: { id_bus: true, patente: true } },
      taller: { select: { id_taller: true, nombre: true } },
      tipo: { select: { id_tipo_mantenimiento: true, nombre_tipo: true } },
      estado: { select: { id_estado_mantenimiento: true, nombre_estado: true } }
    }
  })

  return { item: actualizado }
})
