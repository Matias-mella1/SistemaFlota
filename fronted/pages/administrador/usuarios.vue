<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import UserForm from '../../components/userForm.vue'

definePageMeta({ layout: 'admin' })

type UsuarioRow = {
  id: number
  rut?: string
  nombre: string
  apellido: string
  email: string
  username: string
  telefono: string
  licencia: string
  estado: 'ACTIVO' | 'INACTIVO'
  roles: string[]
  turnosCount?: number
  documentosCount?: number
  alertasCount?: number
  incidentesCount?: number
}

const q = ref('')
const estado = ref<'' | 'ACTIVO' | 'INACTIVO'>('')
const rol = ref('')

// SIEMPRE mostrar estos 4 como base:
const rolesCatalogo = ref<string[]>([])
const BASE_ROLES = ['ADMINISTRADOR','PROPIETARIO','CONDUCTOR','SUPERVISOR']

const rows = ref<UsuarioRow[]>([])
const loading = ref(false)

const showForm = ref(false)
const editing = ref<any | null>(null)

async function loadRoles() {
  try {
    const r = await $fetch<{ items: { id:number; nombre:string }[] }>('/api/roles')
    const fromApi = (r.items || []).map(x => x.nombre)
    rolesCatalogo.value = Array.from(new Set([...BASE_ROLES, ...fromApi]))
  } catch (e) {
    console.warn('No se pudo cargar roles, usando base:', e)
    rolesCatalogo.value = BASE_ROLES
  }
}

async function loadUsers() {
  loading.value = true
  try {
    const query: any = {}
    if (q.value) query.q = q.value
    if (estado.value) query.estado = estado.value
    if (rol.value) query.rol = rol.value
    const r = await $fetch<{ items: UsuarioRow[] }>('/api/usuarios', { query })
    rows.value = r.items
  } finally {
    loading.value = false
  }
}

function openCreate() {
  // por defecto, si quieres forzar al menos CONDUCTOR:
  editing.value = {
    nombre: '', apellido: '', email: '', username: '',
    telefono: '', licencia: '',
    activo: true,
    roles: [] // si el usuario no marca nada, el form pondrá CONDUCTOR por defecto al guardar
  }
  showForm.value = true
}

function openEdit(u: UsuarioRow) {
  editing.value = {
    id: u.id,
    rut: u.rut,
    nombre: u.nombre,
    apellido: u.apellido,
    email: u.email,
    username: u.username,
    telefono: u.telefono,
    licencia: u.licencia,
    activo: u.estado === 'ACTIVO',
    roles: [...u.roles]
  }
  showForm.value = true
}

async function saveUser(payload:any) {
  try {
    if (editing.value?.id)
      await $fetch(`/api/usuarios/${editing.value.id}`, { method:'PUT', body: payload })
    else
      await $fetch('/api/usuarios', { method:'POST', body: payload })
    showForm.value = false
    editing.value = null
    await loadUsers()
  } catch (e:any) {
    alert(`Error al guardar: ${e?.data?.message || e?.message || 'Desconocido'}`)
  }
}

async function removeUser(id:number) {
  if (!confirm('⚠️ ¿Eliminar este usuario? Esta acción es irreversible.')) return
  try {
    await $fetch(`/api/usuarios/${id}`, { method:'DELETE' })
    await loadUsers()
  } catch (e:any) {
    alert(`Error al eliminar: ${e?.data?.message || e?.message || 'Desconocido'}`)
  }
}

onMounted(async () => {
  await loadRoles()
  await loadUsers()
})

watch([q, estado, rol], () => loadUsers())
</script>

<template>
  <div class="grid">
    <!-- FILTROS -->
    <div class="card">
      <h3>👥 Usuarios</h3>
      <div class="filters">
        <div>
          <label class="label">Buscar</label>
          <input class="input" placeholder="Nombre, email o usuario" v-model="q" />
        </div>
        <div>
          <label class="label">Estado</label>
          <select class="select" v-model="estado">
            <option value="">Todos</option>
            <option>ACTIVO</option>
            <option>INACTIVO</option>
          </select>
        </div>
        <div>
          <label class="label">Rol</label>
          <select class="select" v-model="rol">
            <option value="">Todos</option>
            <option v-for="r in rolesCatalogo" :key="r" :value="r">{{ r }}</option>
          </select>
        </div>
        <div class="btns">
          <button class="btn" @click="loadUsers">🔄</button>
          <button class="btn primary" @click="openCreate">+ Nuevo Usuario</button>
        </div>
      </div>
    </div>

    <!-- TABLA -->
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th>#ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Usuario</th>
            <th>Estado</th>
            <th>Roles</th>
            <th style="width:120px;text-align:center;">Acciones</th>
          </tr>
        </thead>

        <tbody v-if="loading">
          <tr v-for="i in 3" :key="i">
            <td colspan="7"><div class="skeleton"></div></td>
          </tr>
        </tbody>

        <tbody v-else-if="rows.length">
          <tr v-for="u in rows" :key="u.id">
            <td>{{ u.id }}</td>
            <td>{{ u.nombre }} {{ u.apellido }}</td>
            <td>{{ u.email }}</td>
            <td class="code">{{ u.username }}</td>
            <td><span class="badge" :class="u.estado === 'ACTIVO' ? 'green' : 'red'">{{ u.estado }}</span></td>
            <td>
              <div class="roles">
                <span v-for="r in u.roles" :key="r" class="badge role">{{ r }}</span>
              </div>
            </td>
            <td class="actions">
              <button class="row-action" title="Editar" @click="openEdit(u)">✏️</button>
              <button class="row-action" title="Eliminar" @click="removeUser(u.id)">🗑</button>
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr><td colspan="7"><div class="empty">No hay usuarios registrados.</div></td></tr>
        </tbody>
      </table>
    </div>

    <!-- MODAL -->
    <div v-if="showForm" class="modal">
      <div class="card modal-card">
        <h3>{{ editing?.id ? '✏️ Editar Usuario' : '➕ Nuevo Usuario' }}</h3>
        <UserForm
          :initial="editing || undefined"
          :all-roles="rolesCatalogo"
          @save="saveUser"
          @cancel="showForm = false"
        />
        <div v-if="!editing?.id" class="hint">
          <strong>Nota:</strong> Si no se selecciona un rol, se asignará <em>CONDUCTOR</em> por defecto al guardar.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid{display:flex;flex-direction:column;gap:1rem}
.card{background:#fff;border-radius:12px;padding:1rem;box-shadow:0 2px 6px rgba(0,0,0,.08)}
.filters{display:grid;grid-template-columns:1fr 180px 200px 160px;gap:1rem;align-items:end}
.label{font-weight:600;font-size:.9rem;margin-bottom:.25rem}
.input,.select{width:100%;border:1px solid #d1d5db;border-radius:8px;padding:.45rem .6rem}
.btns{display:flex;gap:.5rem}
.btn{background:#3b82f6;color:white;border:none;border-radius:8px;padding:.55rem .9rem;font-weight:600;cursor:pointer}
.btn.primary{background:#16a34a}
.table{width:100%;border-collapse:collapse;text-align:left}
th,td{padding:.75rem;border-bottom:1px solid #e5e7eb}
th{background:#f9fafb;font-weight:600;color:#374151}
tr:hover td{background:#f3f4f6}
.code{font-family:ui-monospace,Consolas,Monaco,monospace}
.badge{padding:.25rem .6rem;border-radius:8px;font-size:.8rem;font-weight:600}
.badge.green{background:#dcfce7;color:#166534}
.badge.red{background:#fee2e2;color:#991b1b}
.badge.role{background:#eef;color:#223}
.roles{display:flex;flex-wrap:wrap;gap:.35rem}
.actions{display:flex;justify-content:center;gap:.5rem}
.row-action{background:none;border:none;cursor:pointer;font-size:1.1rem}
.empty{text-align:center;color:#6b7280;padding:1rem}
.modal{position:fixed;inset:0;background:#0006;display:grid;place-items:center;z-index:50}
.modal-card{width:min(720px,92vw)}
.skeleton{width:100%;height:36px;border-radius:6px;background:linear-gradient(90deg,#f3f3f3 25%,#e0e0e0 50%,#f3f3f3 75%);background-size:200% 100%;animation:loading 1.5s infinite}
@keyframes loading{0%{background-position:200% 0}100%{background-position:-200% 0}}
</style>
