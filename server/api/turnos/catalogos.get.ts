// server/api/turnos/catalogos.get.ts
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  setHeader(event, 'Cache-Control', 'no-store')

  const [usuarios, buses, estados] = await Promise.all([
    prisma.usuario.findMany({
      select: { id_usuario: true, nombre: true, apellido: true },
      orderBy: { nombre: 'asc' },
    }),
    prisma.bus.findMany({
      select: { id_bus: true, patente: true, modelo: true },
      orderBy: { id_bus: 'asc' },
    }),
    prisma.estadoTurno.findMany({
      select: { id_estado_turno: true, nombre_estado: true },
      orderBy: { nombre_estado: 'asc' },
    }),
  ])

  return {
    usuarios: usuarios.map(u => ({
      id: u.id_usuario,
      nombre: [u.nombre, u.apellido].filter(Boolean).join(' '),
    })),
    buses: buses.map(b => ({
      id: b.id_bus,
      label: `${b.patente ?? 'SIN PATENTE'} - ${b.modelo ?? 'SIN MODELO'}`,
    })),
    estados: estados.map(e => ({
      id: e.id_estado_turno,
      nombre: e.nombre_estado,
    })),
  }
})
