// composables/useMenu.ts
import { computed } from 'vue'
import { useState } from 'nuxt/app'

export type Role = 'ADMINISTRADOR' | 'PROPIETARIO' | 'SUPERVISOR' | 'CONDUCTOR'
export type Permission = string

type MenuItem = {
  label: string
  to?: string
  exact?: boolean
  permission?: Permission
  children?: MenuItem[]
  hide?: boolean
}

type MenuMap = Record<Role, MenuItem[]>

const MENU_BY_ROLE: MenuMap = {
  ADMINISTRADOR: [
    { label: '📊 Dashboard', to: '/admin', exact: true },
    { label: '👥 Usuarios', to: '/usuarios' },
    { label: '🚍 Buses', to: '/buses' },
    { label: '📈 Reportes', to: '/reportes' },
    { label: '📅 Turnos', to: '/turnos' },
    { label: '🔧 Mantenciones', to: '/mantenciones' },
    { label: '🏭 Taller', to: '/talleres' },
    { label: '⚙️ Mecánicos', to: '/mecanicos' },
  ],
  PROPIETARIO: [
    { label: 'Mis Buses', to: '/propietario', exact: true },
    { label: 'Mantenciones', to: '/mantenciones' },
  ],
  SUPERVISOR: [
    { label: 'Turnos', to: '/supervisor', exact: true },
    { label: 'Alertas', to: '/alertas' },
  ],
  CONDUCTOR: [
    { label: 'Mis Turnos', to: '/turnos', exact: true },
    { label: 'Alertas', to: '/alertas' },
  ],
}

function hasPermission(userPerms: Permission[] | undefined, required?: Permission) {
  if (!required) return true
  return !!userPerms?.includes(required)
}

export function useMenu() {
  // user esperado: { roles: string[]; permissions?: string[]; ... }
  const user = useState<any>('user')

  const roles = computed<Role[]>(() =>
    (user.value?.roles || [])
      .map((r: string) => r?.toUpperCase())
      .filter(Boolean)
  )

  const permissions = computed<Permission[] | undefined>(() => user.value?.permissions)

  // Si el usuario tiene varios roles, se fusionan los menús y se quitan duplicados por "to"
  const items = computed<MenuItem[]>(() => {
    const all: MenuItem[] = roles.value.length
      ? roles.value.flatMap((r: Role) => MENU_BY_ROLE[r] || [])
      : MENU_BY_ROLE['CONDUCTOR'] // fallback

    // Filtra por permisos y oculta los que tengan hide
    const filtered = all
      .filter(i => !i.hide && hasPermission(permissions.value, i.permission))
      .map(i =>
        i.children
          ? { ...i, children: i.children.filter(ch => hasPermission(permissions.value, ch.permission)) }
          : i
      )

    // Quitar duplicados por "to"
    const dedup = new Map<string, MenuItem>()
    for (const i of filtered) {
      if (!i.to) continue
      if (!dedup.has(i.to)) dedup.set(i.to, i)
    }
    return Array.from(dedup.values())
  })

  return { items, roles }
}
