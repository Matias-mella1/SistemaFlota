// Archivo: /server/api/usuarios/index.get.ts

import { prisma } from '../../utils/prisma'
import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  const q = getQuery(event) as any
  const where: any = {}

  if (q.q) {
    const text = String(q.q).trim()
    where.OR = [
      { nombre:   { contains: text, mode: 'insensitive' } },
      { apellido: { contains: text, mode: 'insensitive' } },
      { email:    { contains: text, mode: 'insensitive' } },
      { username: { contains: text, mode: 'insensitive' } },
    ]
  }

  if (q.estado === 'ACTIVO' || q.estado === 'INACTIVO') {
    where.estado_usuario = { nombre_estado: q.estado }
  }

  if (q.rol) {
    // Filtra usuarios que tienen al menos un rol activo con el nombre especificado
    where.roles = { some: { estado: 'ACTIVO', rol: { nombre_rol: q.rol } } }
  }

  const usuarios = await prisma.usuario.findMany({
    where,
    include: {
      estado_usuario: true,
      roles: { include: { rol: true } },
      turnos: true,
      documentos: true,
      alertas: true,
      incidentes: true,
    },
    orderBy: { id_usuario: 'asc' },
  })

  return {
    items: usuarios.map(u => ({
      id: u.id_usuario,
      rut: u.rut, // 👈 Se mantiene el campo RUT
      nombre: u.nombre,
      apellido: u.apellido,
      email: u.email,
      username: u.username,
      telefono: u.telefono ?? '',
      licencia: u.licencia_con ?? '',
      estado: u.estado_usuario?.nombre_estado ?? '',
      roles: u.roles.filter(x => x.estado === 'ACTIVO').map(x => x.rol.nombre_rol),
      turnosCount: u.turnos.length,
      documentosCount: u.documentos.length,
      alertasCount: u.alertas.length,
      incidentesCount: u.incidentes.length,
    })),
  }
})