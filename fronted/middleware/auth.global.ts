import { useAuth } from '~/composables/useAuth'

type CanonRole = 'ADMINISTRADOR' | 'PROPIETARIO' | 'SUPERVISOR' | 'CONDUCTOR'

export default defineNuxtRouteMiddleware(async (to) => {
  // 0️⃣ No interceptar API ni assets
  if (to.path.startsWith('/api') || to.path.startsWith('/_nuxt')) return

  // 1️⃣ Rutas públicas
  const publicRoutes = new Set<string>([
    '/',              // Login
    '/set-password',  // Definir contraseña
    '/recuperar',     // Recuperar contraseña
  ])

  // 2️⃣ Autenticación
  const { user, refresh } = useAuth()
  if (user.value === undefined) {
    try { await refresh(true) } catch (e) { console.warn('⚠️ Error cargando sesión:', e) }
  }

  // 3️⃣ No logueado → solo públicas
  if (!user.value) {
    if (!publicRoutes.has(to.path)) {
      return navigateTo('/?next=' + encodeURIComponent(to.fullPath))
    }
    return
  }

  // === Normalización de roles (multirol) ===
  const raw = (user.value.roles || []).map((r: any) => String(r).toUpperCase())
  const roles: CanonRole[] = []
  if (raw.some(r => r.includes('ADMIN'))) roles.push('ADMINISTRADOR')
  if (raw.some(r => r.includes('PROP'))) roles.push('PROPIETARIO')
  if (raw.some(r => r.includes('SUPERV'))) roles.push('SUPERVISOR')
  if (raw.some(r => r.includes('COND'))) roles.push('CONDUCTOR')

  // 4️⃣ Home por rol (corrige CONDUCTOR -> /conductor/menu)
  const homeByRole: Record<CanonRole, string> = {
    ADMINISTRADOR: '/admin',
    PROPIETARIO:   '/propietario/menu',
    SUPERVISOR:    '/supervisor',
    CONDUCTOR:     '/conductor/menu',
  }

  // 5️⃣ Si entra a una pública ya logueado → envía a la home del primer rol por prioridad
  if (publicRoutes.has(to.path)) {
    const priority: CanonRole[] = ['ADMINISTRADOR', 'PROPIETARIO', 'SUPERVISOR', 'CONDUCTOR']
    const primary = priority.find(r => roles.includes(r))
    const dest = (primary && homeByRole[primary]) || '/dashboard'
    if (to.path !== dest) return navigateTo(dest)
    return
  }

  // 6️⃣ Autorización por rol (UNIÓN de rutas permitidas)
  const allowedByRole: Record<CanonRole, string[]> = {

    ADMINISTRADOR: [
  '/administrador/menu',
  '/administrador/buses',
  '/administrador/conductor',
  '/administrador/mantenciones',
  '/administrador/mecanico',
  '/administrador/taller',
  '/administrador/turnos',
  '/administrador/usuarios',
  '/administrador/incidente',
],
  
    PROPIETARIO: [
      '/propietario/menu',
      '/propietario/mi-flota',
      '/propietario/turnos',
      '/propietario/mantenciones',
      // si usas estas rutas también:
      '/propietario/incidentes',
      '/propietario/reportes',
      '/propietario/alertas',
    ],
    SUPERVISOR: [
      '/supervisor', '/turnos', '/alertas'
    ],
    CONDUCTOR: [
      '/conductor/menu',
      '/conductor/mis-turnos',
      // si tienes esta vista en el sidebar:
      '/conductor/alertas'
    ],
  }

  const unionAllowed = Array.from(
    new Set(roles.flatMap(r => allowedByRole[r] || []))
  )

  // Si no hay reglas para sus roles, déjalo ir (o mándalo a /dashboard)
  if (!unionAllowed.length) return

  const ok = unionAllowed.some((base) =>
    to.path === base || to.path.startsWith(base + '/')
  )

  if (!ok) {
    // redirige a la primera ruta permitida para sus roles
    const dest = unionAllowed[0] || '/dashboard'
    return navigateTo(dest)
  }
})
