export type Role = 'ADMINISTRADOR' | 'PROPIETARIO' | 'SUPERVISOR' | 'CONDUCTOR'

export interface MeUser {
  id?: number
  nombre?: string
  roles: Role[]
}

/**
 * Devuelve true si el usuario tiene alguno de los roles requeridos.
 */
export function hasAny(user: MeUser | null | undefined, roles: Role[] | undefined): boolean {
  if (!user || !user.roles || !roles?.length) return false
  const set = new Set(user.roles.map(r => r.toUpperCase()))
  return roles.some(r => set.has(r.toUpperCase() as Role))
}
