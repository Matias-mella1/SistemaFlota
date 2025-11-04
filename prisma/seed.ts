// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

// Ejecuta createMany solo si la tabla está vacía
async function seedIfEmpty<T>(
  countFn: () => Promise<number>,
  createFn: () => Promise<T>,
  name: string
) {
  const count = await countFn()
  if (count === 0) {
    await createFn()
    console.log(`✓ Seed de ${name} insertado.`)
  } else {
    console.log(`• ${name} ya tenía datos, no se insertó.`)
  }
}

async function main() {
  console.log('🌱 Iniciando seed...')

  // --- ESTADOS USUARIO ---
  await seedIfEmpty(
    () => prisma.estadoUsuario.count(),
    () =>
      prisma.estadoUsuario.createMany({
        data: [
          { nombre_estado: 'ACTIVO', descripcion: 'Usuario habilitado' },
          { nombre_estado: 'INACTIVO', descripcion: 'Usuario deshabilitado' },
          { nombre_estado: 'SUSPENDIDO', descripcion: 'Bloqueo temporal' },
          { nombre_estado: 'PENDIENTE', descripcion: 'A la espera de verificación' },
        ],
        skipDuplicates: true,
      }),
    'EstadoUsuario'
  )

  // --- ROLES ---
  await seedIfEmpty(
    () => prisma.rol.count(),
    () =>
      prisma.rol.createMany({
        data: [
          { nombre_rol: 'ADMINISTRADOR' },
          { nombre_rol: 'PROPIETARIO' },
          { nombre_rol: 'CONDUCTOR' },
          { nombre_rol: 'SUPERVISOR' },
        ],
        skipDuplicates: true,
      }),
    'Rol'
  )

  // --- ESTADOS BUS (demo) ---
  await seedIfEmpty(
    () => prisma.estadoBus.count(),
    () =>
      prisma.estadoBus.createMany({
        data: [
          { nombre_estado: 'OPERATIVO', descripcion: 'Bus funcionando correctamente.' },
          { nombre_estado: 'MANTENIMIENTO', descripcion: 'Bus en reparación o revisión.' },
          { nombre_estado: 'FUERA DE SERVICIO', descripcion: 'Bus fuera de circulación.' },
        ],
        skipDuplicates: true,
      }),
    'EstadoBus'
  )

  // --- ESTADOS TURNO ---
  await seedIfEmpty(
    () => prisma.estadoTurno.count(),
    () =>
      prisma.estadoTurno.createMany({
        data: [
          { nombre_estado: 'PROGRAMADO', descripcion: 'Turno creado' },
          { nombre_estado: 'EN CURSO', descripcion: 'Turno activo' },
          { nombre_estado: 'COMPLETADO', descripcion: 'Turno finalizado' },
          { nombre_estado: 'CANCELADO', descripcion: 'No se ejecuta' },
        ],
        skipDuplicates: true,
      }),
    'EstadoTurno'
  )

  // --- TIPOS DE TALLER ---
  await seedIfEmpty(
    () => prisma.tipoTaller.count(),
    () =>
      prisma.tipoTaller.createMany({
        data: [
          {
            nombre_tipo: 'Taller General',
            descripcion:
              'Mantenimiento integral y reparaciones mecánicas en motores, transmisiones, frenos y sistemas auxiliares.',
            especialidad: 'Mecánica General',
          },
          {
            nombre_tipo: 'Electricidad y Electrónica',
            descripcion:
              'Diagnóstico y reparación del sistema eléctrico, alternadores, baterías y módulos electrónicos.',
            especialidad: 'Sistemas Eléctricos y Electrónicos',
          },
          {
            nombre_tipo: 'Neumáticos y Suspensión',
            descripcion:
              'Montaje, alineación, balanceo y mantenimiento de suspensión y amortiguadores.',
            especialidad: 'Neumáticos y Suspensión',
          },
          {
            nombre_tipo: 'Carrocería y Pintura',
            descripcion:
              'Reparación estructural, enderezado, pintura y restauración estética del bus.',
            especialidad: 'Carrocería y Pintura',
          },
          {
            nombre_tipo: 'Sistemas de Frenos',
            descripcion:
              'Mantenimiento y calibración de frenos neumáticos, hidráulicos y ABS.',
            especialidad: 'Frenos',
          },
          {
            nombre_tipo: 'Aire Acondicionado y Climatización',
            descripcion:
              'Revisión, recarga y reparación de sistemas de climatización, ventilación y calefacción.',
            especialidad: 'Climatización',
          },
          {
            nombre_tipo: 'Diagnóstico Computarizado',
            descripcion:
              'Uso de herramientas de diagnóstico electrónico para detectar fallas en sistemas de control.',
            especialidad: 'Diagnóstico Electrónico',
          },
        ],
        skipDuplicates: true,
      }),
    'TipoTaller'
  )

  // --- ESTADOS MANTENIMIENTO ---
  await seedIfEmpty(
    () => prisma.estadoMantenimiento.count(),
    () =>
      prisma.estadoMantenimiento.createMany({
        data: [
          { nombre_estado: 'PENDIENTE', descripcion: 'Solicitado' },
          { nombre_estado: 'EN PROCESO', descripcion: 'En ejecución' },
          { nombre_estado: 'COMPLETADO', descripcion: 'Finalizado' },
          { nombre_estado: 'ANULADO', descripcion: 'Cancelado' },
        ],
        skipDuplicates: true,
      }),
    'EstadoMantenimiento'
  )

  // --- TIPOS MANTENIMIENTO ---
  await seedIfEmpty(
    () => prisma.tipoMantenimiento.count(),
    () =>
      prisma.tipoMantenimiento.createMany({
        data: [
          { nombre_tipo: 'Preventivo', descripcion: 'Planificado', categoria: 'Plan' },
          { nombre_tipo: 'Correctivo', descripcion: 'Por falla', categoria: 'Incidente' },
        ],
        skipDuplicates: true,
      }),
    'TipoMantenimiento'
  )

  // --- ESTADOS REPUESTO ---
  await seedIfEmpty(
    () => prisma.estadoRepuesto.count(),
    () =>
      prisma.estadoRepuesto.createMany({
        data: [
          { nombre_estado: 'DISPONIBLE', descripcion: 'En stock' },
          { nombre_estado: 'RESERVADO', descripcion: 'Asignado a OT' },
          { nombre_estado: 'AGOTADO', descripcion: 'Sin stock' },
          { nombre_estado: 'OBSOLETO', descripcion: 'Descontinuado' },
        ],
        skipDuplicates: true,
      }),
    'EstadoRepuesto'
  )

  // --- TIPOS REPUESTO ---
  await seedIfEmpty(
    () => prisma.tipoRepuesto.count(),
    () =>
      prisma.tipoRepuesto.createMany({
        data: [
          { nombre_tipo: 'Motor', descripcion: 'Partes del motor', categoria: 'Mecánico' },
          { nombre_tipo: 'Eléctrico', descripcion: 'Sistema eléctrico', categoria: 'Eléctrico' },
          { nombre_tipo: 'Frenos', descripcion: 'Sistema de frenos', categoria: 'Seguridad' },
          { nombre_tipo: 'Suspensión', descripcion: 'Amortiguación', categoria: 'Chasis' },
        ],
        skipDuplicates: true,
      }),
    'TipoRepuesto'
  )

  // --- ESTADOS INCIDENTE ---
  await seedIfEmpty(
    () => prisma.estadoIncidente.count(),
    () =>
      prisma.estadoIncidente.createMany({
        data: [
          { nombre_estado: 'REPORTADO', descripcion: 'Levantado por usuario' },
          { nombre_estado: 'EN REVISIÓN', descripcion: 'Analizando' },
          { nombre_estado: 'RESUELTO', descripcion: 'Cerrado' },
          { nombre_estado: 'DESCARTADO', descripcion: 'No procede' },
        ],
        skipDuplicates: true,
      }),
    'EstadoIncidente'
  )

  // --- TIPOS INCIDENTE ---
  await seedIfEmpty(
    () => prisma.tipoIncidente.count(),
    () =>
      prisma.tipoIncidente.createMany({
        data: [
          { nombre_tipo: 'Accidente', descripcion: 'Colisión u otro', categoria: 'Seguridad' },
          { nombre_tipo: 'Avería', descripcion: 'Falla mecánica', categoria: 'Operación' },
          { nombre_tipo: 'Retraso', descripcion: 'Demora en servicio', categoria: 'Servicio' },
          { nombre_tipo: 'Queja', descripcion: 'Cliente/usuario', categoria: 'Atención' },
        ],
        skipDuplicates: true,
      }),
    'TipoIncidente'
  )

  // --- ESTADOS DOCUMENTO ---
  await seedIfEmpty(
    () => prisma.estadoDocumento.count(),
    () =>
      prisma.estadoDocumento.createMany({
        data: [
          { nombre_estado: 'VIGENTE', descripcion: 'Documento válido' },
          { nombre_estado: 'VENCIDO', descripcion: 'Caducado' },
          { nombre_estado: 'POR VENCER', descripcion: 'Próximo a caducar' },
          { nombre_estado: 'ANULADO', descripcion: 'No válido' },
        ],
        skipDuplicates: true,
      }),
    'EstadoDocumento'
  )

  // --- ESTADOS ALERTA ---
  await seedIfEmpty(
    () => prisma.estadoAlerta.count(),
    () =>
      prisma.estadoAlerta.createMany({
        data: [
          { nombre_estado: 'ACTIVA', descripcion: 'Pendiente de gestionar' },
          { nombre_estado: 'ATENDIDA', descripcion: 'Gestionada' },
          { nombre_estado: 'CERRADA', descripcion: 'Sin acciones pendientes' },
        ],
        skipDuplicates: true,
      }),
    'EstadoAlerta'
  )

  // --- ADMIN POR DEFECTO ---
  // Busca estado ACTIVO y rol ADMINISTRADOR (acepta ambas capitalizaciones por si ya existían)
  const estadoActivo =
    (await prisma.estadoUsuario.findFirst({ where: { nombre_estado: 'ACTIVO' } })) ||
    (await prisma.estadoUsuario.findFirst({ where: { nombre_estado: 'Activo' } }))

  const rolAdmin =
    (await prisma.rol.findFirst({ where: { nombre_rol: 'ADMINISTRADOR' } })) ||
    (await prisma.rol.findFirst({ where: { nombre_rol: 'Administrador' } }))

  if (!estadoActivo) throw new Error('Falta ACTIVO en EstadoUsuario')
  if (!rolAdmin) throw new Error('Falta ADMINISTRADOR en Rol')

  const passwordHash = await bcrypt.hash('P455word2525', 10)

  const admin = await prisma.usuario.upsert({
    where: { email: 'admin@buscheck.cl' },
    update: {},
    create: {
      rut: '11111111-1', // ajusta si tu esquema exige formato distinto
      nombre: 'Matias',
      apellido: 'Mella',
      email: 'admin@buscheck.cl',
      telefono: '999999999',
      username: 'admin',
      password_hash: passwordHash,
      fecha_registro: new Date(),
      // Relación anidada correcta (connect por PK de estado_usuario)
      estado_usuario: {
        connect: { id_estado_usuario: estadoActivo.id_estado_usuario },
      },
    },
  })

  await prisma.usuarioRol.upsert({
    where: {
      id_usuario_id_rol: {
        id_usuario: admin.id_usuario,
        id_rol: rolAdmin.id_rol,
      },
    },
    update: { estado: 'ACTIVO', fecha_inicio: new Date() },
    create: {
      id_usuario: admin.id_usuario,
      id_rol: rolAdmin.id_rol,
      estado: 'ACTIVO',
      fecha_inicio: new Date(),
    },
  })

  console.log('✔ Seed OK: catálogos + admin')
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
