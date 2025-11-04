<template>
  <aside class="sidebar">
    <div class="logo-section">
      <span class="icon">🚌</span>
      <span class="title">CheckBus</span>
    </div>

    <!-- Cuenta -->
    <div class="account" v-if="user !== undefined">
      <template v-if="user">
        <div class="avatar">{{ initials }}</div>
        <div class="info">
          <div class="name">{{ userName }}</div>
          <div class="role">{{ rolePretty }}</div>
        </div>
      </template>
      <template v-else>
        <div class="info">
          <div class="name">Inicie sesión</div>
          <div class="role">—</div>
        </div>
      </template>
    </div>

    <!-- Menú -->
    <nav>
      <h3 class="menu-title">MENÚ</h3>

      <p v-if="user === undefined" class="no-role">Cargando menú…</p>
      <p v-else-if="!user" class="no-role">Inicie sesión</p>

      <ul v-else>
        <li v-for="item in menuItems" :key="item.label + (item.to || '')">
          <div v-if="item.section" class="menu-section">{{ item.label }}</div>
          <NuxtLink v-else :to="item.to" active-class="active">
            <span v-if="item.icon" class="icon">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </NuxtLink>
        </li>

        <li v-if="!menuItems.length" class="no-role">
          No hay opciones para tus roles.
        </li>
      </ul>
    </nav>

    <div class="bottom">
      <button @click="handleLogout" class="logout">🔒 Cerrar sesión</button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { navigateTo } from '#app'
import { useAuth } from '~/composables/useAuth'

type Role = 'ADMINISTRADOR' | 'PROPIETARIO' | 'SUPERVISOR' | 'CONDUCTOR'
interface MenuItem { label: string; icon?: string; to?: string; section?: boolean }

const { user, logout } = useAuth()

// === Usuario ===
const userName = computed(() => user.value?.nombre || 'Usuario')
const initials = computed(() => {
  const parts = (userName.value || 'U').trim().split(' ')
  return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase() || 'U'
})

// === Roles (multirol) ===
const roles = computed<Role[]>(() => {
  const list = (user.value?.roles || []).map(r => String(r).toUpperCase())
  const out: Role[] = []
  if (list.some(r => r.includes('ADMIN'))) out.push('ADMINISTRADOR')
  if (list.some(r => r.includes('PROP'))) out.push('PROPIETARIO')
  if (list.some(r => r.includes('SUPERV'))) out.push('SUPERVISOR')
  if (list.some(r => r.includes('COND'))) out.push('CONDUCTOR')
  return out
})

const rolePretty = computed(() => {
  if (!roles.value.length) return 'Sin rol'
  const map: Record<Role, string> = {
    ADMINISTRADOR: '👑 Administrador',
    PROPIETARIO: '🏠 Propietario',
    SUPERVISOR: '🧭 Supervisor',
    CONDUCTOR: '🚍 Conductor'
  }
  return roles.value.map(r => map[r]).join(' · ')
})

// === Menú por rol ===
const menuByRole: Record<Role, MenuItem[]> = {
  ADMINISTRADOR: [
  { label: 'Inicio', icon: '🏠', to: '/administrador/menu' },
  { label: 'Como Administrador', section: true },
  { label: 'Usuarios', icon: '👥', to: '/administrador/usuarios' },
  { label: 'Conductores', icon: '📈', to: '/administrador/conductor' },
  { label: 'Turnos', icon: '📅', to: '/administrador/turnos' },
  { label: 'Buses', icon: '🚌', to: '/administrador/buses' },
  { label: 'Mantenciones', icon: '🛠️', to: '/administrador/mantenciones' },
  { label: 'Taller', icon: '🔧', to: '/administrador/taller' },
  { label: 'Mecánicos', icon: '🧑‍🔧', to: '/administrador/mecanico' },
  { label: 'Incidentes', icon: '🧑‍🔧', to: '/administrador/incidente' },
],
  PROPIETARIO: [
    
    { label: 'Inicio', icon: '🏠', to: '/propietario/menu' },
    { label: 'Como Propietario', section: true },
    { label: 'Mi Flota', icon: '🚌', to: '/propietario/mi-flota' },
    { label: 'Incidentes', icon: '⚠️', to: '/propietario/incidentes' },
    { label: 'Turnos', icon: '📅', to: '/propietario/turnos' },
    { label: 'Mantenciones', icon: '🛠️', to: '/propietario/mantenciones' },
    { label: 'Reportes', icon: '📊', to: '/propietario/reportes' },
    { label: 'Alertas', icon: '🚨', to: '/propietario/alertas' },
  ],
  SUPERVISOR: [
    
    { label: 'Inicio', icon: '🏠', to: '/supervisor' },
    { label: 'Como Supervisor', section: true },
    { label: 'Turnos', icon: '📅', to: '/turnos' },
    { label: 'Alertas', icon: '🚨', to: '/alertas' },
  ],
  CONDUCTOR: [
    
    { label: 'Inicio', icon: '🏠', to: '/conductor/menu' },
    { label: 'Como Conductor', section: true },
    { label: 'Mis Turnos', icon: '📅', to: '/conductor/mis-turnos' },
    { label: 'Mis Alertas', icon: '🚨', to: '/conductor/alertas' },
  ],
}

// === Combina menús de todos los roles ===
const menuItems = computed<MenuItem[]>(() => {
  if (!user.value) return []

  const combined: MenuItem[] = []
  const seen = new Set<string>()

  // Combina en orden
  for (const r of roles.value) {
    for (const item of menuByRole[r] || []) {
      const key = `${item.section ? 'S' : 'I'}|${item.label}|${item.to || ''}`
      if (!seen.has(key)) {
        combined.push(item)
        seen.add(key)
      }
    }
  }

  // Mantén solo el primer "Inicio"
  let seenHome = false
  const filtered: MenuItem[] = []
  for (const it of combined) {
    if (!it.section && it.label === 'Inicio') {
      if (seenHome) continue
      seenHome = true
    }
    filtered.push(it)
  }
  return filtered
})

function handleLogout() {
  logout()
  navigateTo('/')
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  inset: 0 auto 0 0;
  width: 260px;
  background: #111827;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  box-shadow: 2px 0 8px rgba(0,0,0,.2);
  z-index: 50;
}
.logo-section {
  display: flex;
  align-items: center;
  padding: 0 1.2rem;
  margin-bottom: 1rem;
}
.logo-section .icon { font-size: 1.5rem; margin-right: .5rem; }
.logo-section .title { font-weight: 700; font-size: .95rem; color: #cbd5e1; }

.account {
  display: flex;
  align-items: center;
  gap: .8rem;
  padding: 0 .9rem 1rem .9rem;
  border-bottom: 1px solid #1f2937;
  margin-bottom: .6rem;
}
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  background: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}
.info .name { font-weight: 600; line-height: 1.1; }
.info .role { font-size: .85rem; color: #9ca3af; }

.menu-title {
  font-size: .75rem;
  color: #9ca3af;
  margin: .75rem 0 .5rem 1.5rem;
  letter-spacing: 1px;
}
nav ul { list-style: none; padding: 0; margin: 0; }
nav li { margin-bottom: .25rem; }
nav a {
  display: flex;
  align-items: center;
  gap: .75rem;
  color: #cbd5e1;
  text-decoration: none;
  padding: .6rem 1.5rem;
  border-radius: 8px;
  transition: background .2s;
}
nav a:hover { background: #1e293b; }
nav a.active { background: #2563eb; color: #fff; font-weight: 600; }

.menu-section {
  padding: .5rem 1.5rem;
  margin-top: .5rem;
  font-size: .75rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: .04em;
}
.no-role {
  color: #9ca3af;
  text-align: center;
  font-size: .85rem;
  margin: 0.4rem 0 0.2rem;
}
.bottom { margin-top: auto; padding: 1rem 1.5rem; }
.logout {
  width: 100%;
  background: #dc2626;
  color: #fff;
  border: none;
  padding: .7rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}
.logout:hover { background: #b91c1c; }
</style>
