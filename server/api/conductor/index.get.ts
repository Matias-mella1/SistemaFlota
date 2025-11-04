// server/api/conductor/index.get.ts
import { prisma } from '../../utils/prisma' // <- cambia el nivel

export default defineEventHandler(async (event) => {
  setHeader(event, 'Cache-Control', 'no-store')

  const query = getQuery(event)
  const q = query.q?.toString().trim() || ''
  const estado = query.estado?.toString().trim().toUpperCase() || ''

  const incluirPropietario =
    query.incluirPropietario === true ||
    query.incluirPropietario === 'true' ||
    query.incluirPropietario === '1'

  const rolesDeseados = incluirPropietario ? ['CONDUCTOR', 'PROPIETARIO'] : ['CONDUCTOR']

  const where: any = {
    roles: {
      some: {
        estado: 'ACTIVO',
        rol: {
          OR: rolesDeseados.map((nombre) => ({
            nombre_rol: { equals: nombre, mode: 'insensitive' },
          })),
        },
      },
    },
  }

  if (q) {
    where.OR = [
      { nombre: { contains: q, mode: 'insensitive' } },
      { apellido: { contains: q, mode: 'insensitive' } },
      { email: { contains: q, mode: 'insensitive' } },
      { username: { contains: q, mode: 'insensitive' } },
      { telefono: { contains: q, mode: 'insensitive' } },
      { licencia_con: { contains: q, mode: 'insensitive' } },
    ]
  }

  if (estado === 'ACTIVO' || estado === 'INACTIVO') {
    where.estado_usuario = { is: { nombre_estado: estado } }
  }

  const rows = await prisma.usuario.findMany({
    where,
    include: { estado_usuario: true, roles: { include: { rol: true } } },
    orderBy: { id_usuario: 'asc' },
  })

  return {
    items: rows.map((u) => ({
      id: u.id_usuario,
      rut: u.username ?? '',
      nombre: [u.nombre, u.apellido].filter(Boolean).join(' '),
      email: u.email ?? '',
      telefono: u.telefono ?? '',
      licencia: u.licencia_con ?? '',
      estado: u.estado_usuario?.nombre_estado ?? '',
      roles: (u.roles || []).filter(r => r.estado === 'ACTIVO').map((r) => r.rol?.nombre_rol).filter(Boolean),
    })),
  }
})
