import { prisma } from '../../utils/prisma'
import { safeParse } from 'valibot'
import { ListaQueryDto } from '../../utils/schemas/incidente'

export default defineEventHandler(async (event) => {
  setHeader(event, 'Cache-Control', 'no-store')

  // Validar y normalizar query
  const parsed = safeParse(ListaQueryDto, getQuery(event))
  if (!parsed.success) {
    const msg = parsed.issues?.[0]?.message || 'Parámetros inválidos'
    throw createError({ statusCode: 400, message: msg })
  }
  const q = parsed.output

  // Paginación
  const page = q.page ?? 1
  const pageSize = q.pageSize ?? 20
  const skip = (page - 1) * pageSize
  const take = pageSize

  // Filtros
  const where: any = {}
  if (q.id_bus) where.id_bus = q.id_bus
  if (q.id_usuario) where.id_usuario = q.id_usuario
  if (q.id_estado_incidente) where.id_estado_incidente = q.id_estado_incidente
  if (q.id_tipo_incidente) where.id_tipo_incidente = q.id_tipo_incidente
  if (q.urgencia) where.urgencia = { contains: q.urgencia, mode: 'insensitive' }

  if (q.desde || q.hasta) {
    where.fecha = {}
    if (q.desde) where.fecha.gte = q.desde
    if (q.hasta) where.fecha.lte = q.hasta
  }

  if (q.q) {
    where.OR = [
      { descripcion: { contains: q.q, mode: 'insensitive' } },
      { ubicacion: { contains: q.q, mode: 'insensitive' } },
      { bus: { patente: { contains: q.q, mode: 'insensitive' } } },
      { usuario: { nombre: { contains: q.q, mode: 'insensitive' } } },
      { usuario: { apellido: { contains: q.q, mode: 'insensitive' } } },
    ]
  }

  const sortBy = q.sortBy ?? 'fecha'
  const sortOrder = q.sortOrder ?? 'desc'

  const [total, rows] = await Promise.all([
    prisma.incidente.count({ where }),
    prisma.incidente.findMany({
      where,
      include: { bus: true, usuario: true, estado: true, tipo: true },
      orderBy: { [sortBy]: sortOrder },
      skip,
      take,
    }),
  ])

  const items = rows.map((x) => ({
    id: x.id_incidente,
    id_bus: x.id_bus,
    id_usuario: x.id_usuario,
    fecha: x.fecha,
    descripcion: x.descripcion ?? '',
    urgencia: x.urgencia ?? '',
    ubicacion: x.ubicacion ?? '',
    id_estado_incidente: x.id_estado_incidente,
    estado: x.estado?.nombre_estado ?? '',
    id_tipo_incidente: x.id_tipo_incidente,
    tipo: x.tipo?.nombre_tipo ?? '',
    bus: x.bus ? `${x.bus.patente ?? ''} - ${x.bus.modelo ?? ''}` : '',
    usuario: x.usuario ? `${x.usuario.nombre ?? ''} ${x.usuario.apellido ?? ''}`.trim() : '',
  }))

  return {
    meta: { page, pageSize, total, pages: Math.ceil(total / pageSize) },
    items,
  }
})
