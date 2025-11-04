<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

definePageMeta({
  layout: 'admin',
})

/* ===============================
   Tipos
================================ */
type Estado = 'OPERATIVO' | 'MANTENIMIENTO' | 'FUERA DE SERVICIO'
interface BusRow {
  id: number
  code: number
  plate: string
  model: string
  year: number
  km: number
  status: Estado
}

interface UserRow {
  id: number
  nombre: string
  email: string
  rol: string
  telefono: string
  estado: 'ACTIVO' | 'INACTIVO'
}

/* ===============================
   Estado
================================ */
const buses = ref<BusRow[]>([])
const users = ref<UserRow[]>([])
const loading = ref(false)
const errorMsg = ref<string | null>(null)

/* ===============================
   Helpers
================================ */
function pickArray(payload: any): any[] {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data)) return payload.data
  return []
}

function normalizeEstado(v: any): Estado {
  const s = String(v ?? '').toUpperCase()
  if (s === 'MANTENIMIENTO') return 'MANTENIMIENTO'
  if (s === 'FUERA DE SERVICIO' || s === 'FUERA_DE_SERVICIO') return 'FUERA DE SERVICIO'
  return 'OPERATIVO'
}

function normalizeBus(raw: any): BusRow {
  return {
    id: Number(raw?.id ?? raw?.id_bus ?? 0),
    code: Number(raw?.code ?? raw?.codigo ?? 0),
    plate: String(raw?.patente ?? raw?.plate ?? ''),
    model: String(raw?.modelo ?? raw?.model ?? ''),
    year: Number(raw?.annio ?? raw?.anio ?? raw?.year ?? 0),
    km: Number(raw?.km ?? raw?.kilometraje ?? 0),
    status: normalizeEstado(raw?.estado ?? raw?.status),
  }
}

function estadoClass(s: Estado) {
  return s.toLowerCase().replace(/\s+/g, '-')
}

/* ===============================
   Carga de datos
================================ */
let aborter: AbortController | null = null

async function loadBuses() {
  if (aborter) aborter.abort()
  aborter = new AbortController()

  loading.value = true
  errorMsg.value = null
  try {
    const res = await $fetch<any>('/api/buses', {
      signal: aborter.signal as any,
    })
    const arr = pickArray(res)
    buses.value = arr.map(normalizeBus)
  } catch (e: any) {
    if (e?.name === 'AbortError') return
    errorMsg.value = e?.data?.message || e?.message || 'Error al cargar buses'
    console.error('loadBuses error →', e)
  } finally {
    loading.value = false
  }
}

async function loadUsers() {
  try {
    const res = await $fetch<{ items: UserRow[] }>('/api/usuarios')
    users.value = res.items || []
  } catch (e: any) {
    console.error('Error cargando usuarios:', e)
  }
}

/* ===============================
   Auto actualización
================================ */
let timer: number | null = null
onMounted(() => {
  loadBuses()
  loadUsers()
  timer = window.setInterval(loadBuses, 10000)
})
onUnmounted(() => {
  if (timer) clearInterval(timer)
  if (aborter) aborter.abort()
})

/* ===============================
   KPIs
================================ */
const kpiTotal = computed(() => buses.value.length)
const kpiOper  = computed(() => buses.value.filter(r => r.status === 'OPERATIVO').length)
const kpiMant  = computed(() => buses.value.filter(r => r.status === 'MANTENIMIENTO').length)
const kpiAlert = computed(() => buses.value.filter(r => r.status === 'FUERA DE SERVICIO').length)
const kpiUsers = computed(() => users.value.length)
</script>

<template>
  <div class="dashboard">
    <!-- KPIs -->
    <div class="cards">
      <div class="card stat total">
        <h4>Buses</h4>
        <p>{{ kpiTotal }}</p>
      </div>
      <div class="card stat oper">
        <h4>Usuarios</h4>
        <p>{{ kpiUsers }}</p>
      </div>
      <div class="card stat mant">
        <h4>En Mantenimiento</h4>
        <p>{{ kpiMant }}</p>
      </div>
      <div class="card stat alert">
        <h4>En Alerta</h4>
        <p>{{ kpiAlert }}</p>
      </div>
    </div>

    <!-- Listado de Buses -->
    <div class="card table-card">
      <h3>Listado de Buses</h3>

      <div v-if="errorMsg" class="empty">⚠️ {{ errorMsg }}</div>

      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Patente</th>
            <th>Modelo</th>
            <th>Año</th>
            <th>KM</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody v-if="loading">
          <tr v-for="i in 3" :key="i">
            <td colspan="7"><div class="skeleton"></div></td>
          </tr>
        </tbody>

        <tbody v-else-if="buses.length">
          <tr v-for="r in buses" :key="r.id">
            <td>{{ r.id }}</td>
            <td>{{ r.plate }}</td>
            <td>{{ r.model }}</td>
            <td>{{ r.year || '—' }}</td>
            <td>{{ Number.isFinite(r.km) ? r.km.toLocaleString() + ' km' : '—' }}</td>
            <td>
              <span :class="['badge', estadoClass(r.status)]">
                {{ r.status }}
              </span>
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td colspan="7">
              <div class="empty">
                <span class="empty-icon">🚌</span>
                No hay buses registrados.
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Listado de Usuarios -->
    <div class="card table-card">
      <h3>Listado de Usuarios</h3>

      <table class="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Teléfono</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody v-if="users.length">
          <tr v-for="u in users" :key="u.id">
            <td>{{ u.nombre }}</td>
            <td>{{ u.email }}</td>
            <td>{{ u.rol }}</td>
            <td>{{ u.telefono }}</td>
            <td>
              <span :class="['badge', u.estado === 'ACTIVO' ? 'activo' : 'inactivo']">
                {{ u.estado }}
              </span>
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td colspan="5">
              <div class="empty">
                <span class="empty-icon">👥</span>
                No hay usuarios registrados.
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* ===== KPI Cards ===== */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
.card.stat {
  padding: 1.2rem;
  border-radius: 12px;
  color: white;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}
.card.stat:hover { transform: translateY(-3px); }
.stat.total { background: #3b82f6; }
.stat.oper  { background: #16a34a; }
.stat.mant  { background: #f59e0b; }
.stat.alert { background: #dc2626; }
.stat h4 { font-size: 1rem; margin-bottom: 0.3rem; opacity: 0.9; }
.stat p { font-size: 1.8rem; font-weight: 700; margin: 0; }

/* ===== Tablas ===== */
.table-card {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
}

.table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
th, td {
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}
th {
  background: #f9fafb;
  font-weight: 600;
  font-size: 0.9rem;
  color: #374151;
}
tr:hover td {
  background: #f3f4f6;
}

/* ===== Estados ===== */
.badge {
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
}
.badge.operativo         { background: #16a34a; }
.badge.mantenimiento     { background: #f59e0b; }
.badge.fuera-de-servicio { background: #dc2626; }
.badge.activo            { background: #16a34a; }
.badge.inactivo          { background: #6b7280; }

/* ===== Mensajes vacíos ===== */
.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.2rem;
  color: #6b7280;
  font-weight: 500;
  font-size: 0.95rem;
}
.empty-icon {
  font-size: 1.1rem;
  opacity: 0.8;
}

/* ===== Cargando ===== */
.skeleton {
  width: 100%;
  height: 30px;
  border-radius: 6px;
  background: linear-gradient(90deg, #f3f3f3 25%, #e0e0e0 50%, #f3f3f3 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}
@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
