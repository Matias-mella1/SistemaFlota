<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

definePageMeta({ layout: 'propietario' })

// === Estado general ===
const modo = ref<'PROPIETARIO' | 'CONDUCTOR'>('PROPIETARIO')
const loading = ref(true)
const errorMsg = ref('')

// === Auth ===
const { user, refresh } = useAuth()
onMounted(() => refresh(true))
const myUserId = computed(() => Number(user.value?.id ?? 0))

// === Datos ===
const buses = ref<any[]>([])
const mantenciones = ref<any[]>([])
const incidentes = ref<any[]>([])
const hasIncidentesApi = ref(true)
const turnos = ref<any[]>([])

// === Utilidades ===
function fmtDate(v: string | Date) {
  const d = new Date(v)
  return isNaN(d.getTime()) ? '—' : d.toLocaleString()
}

async function safeFetch<T>(url: string): Promise<T | null> {
  try {
    return (await $fetch(url, { credentials: 'include' })) as T
  } catch (e: any) {
    if (url.includes('/api/incidentes')) {
      hasIncidentesApi.value = false
      return null
    }
    return null
  }
}

// === Carga de datos (Propietario) ===
async function loadPropietario() {
  loading.value = true
  errorMsg.value = ''
  try {
    const busRes = await safeFetch<{ items: any[] }>('/api/buses')
    buses.value = busRes?.items || []

    const mantRes = await safeFetch<{ items: any[] }>('/api/mantenimientos')
    mantenciones.value = mantRes?.items || []

    const incRes = await safeFetch<{ items: any[] }>('/api/incidentes')
    incidentes.value = incRes?.items || []
  } catch (e: any) {
    errorMsg.value = e?.data?.message || e?.message || 'Error al cargar datos'
  } finally {
    loading.value = false
  }
}

// === Carga de datos (Conductor) ===
async function loadTurnos() {
  loading.value = true
  errorMsg.value = ''
  turnos.value = []
  try {
    // Si aún no hay usuario, forzamos refresh
    if (!myUserId.value) await refresh(true)

    // 👈 Enviar id_usuario por query (clave para tu API)
    const r = await $fetch<{ items: any[] }>('/api/conductor/turnos', {
      query: { id_usuario: myUserId.value },
      credentials: 'include',
    })

    turnos.value = (r.items || []).map(t => ({
      id: t.id,
      bus: t.bus ?? '—', // solo patente
      hora_inicio: t.hora_inicio,
      hora_fin: t.hora_fin,
      estado: (t.estado || '').toUpperCase(),
      titulo: t.titulo || '—',
      descripcion: t.descripcion || '—',
    }))
  } catch (e: any) {
    // mensajes útiles, incluyendo el de "Falta el id_usuario del conductor"
    errorMsg.value = e?.data?.message || e?.message || 'No se pudieron cargar los turnos.'
  } finally {
    loading.value = false
  }
}

// === Cambio de modo ===
async function cambiarModo(nuevo: 'PROPIETARIO' | 'CONDUCTOR') {
  modo.value = nuevo
  if (nuevo === 'PROPIETARIO') {
    await loadPropietario()
  } else {
    // asegúrate de tener sesión antes de pedir turnos
    if (!myUserId.value) await refresh(true)
    await loadTurnos()
  }
}

// Al entrar, carga vista de propietario
onMounted(loadPropietario)
</script>

<template>
  <div class="page">
    <!-- Barra de modos centrada -->
    <div class="mode-bar">
      <button
        :class="['mode-btn', modo === 'PROPIETARIO' && 'active']"
        @click="cambiarModo('PROPIETARIO')"
      >
        Modo Propietario
      </button>
      <button
        :class="['mode-btn', modo === 'CONDUCTOR' && 'active']"
        @click="cambiarModo('CONDUCTOR')"
      >
        Modo Conductor
      </button>
    </div>

    <!-- ==================== MODO PROPIETARIO ==================== -->
    <div v-if="modo === 'PROPIETARIO'" class="grid">
      <div class="card">
        <h2>Resumen General de Mi Flota</h2>
        <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
      </div>

      <!-- Buses -->
      <div class="card">
        <h3>Mis Buses</h3>
        <div v-if="loading" class="skeleton" style="height:36px"></div>
        <template v-else>
          <table v-if="buses.length" class="table">
            <thead>
              <tr><th>PATENTE</th><th>MODELO</th><th>AÑO</th><th>KM</th><th>ESTADO</th></tr>
            </thead>
            <tbody>
              <tr v-for="b in buses" :key="b.id">
                <td>{{ b.patente ?? b.plate ?? '—' }}</td>
                <td>{{ b.modelo ?? b.model ?? '—' }}</td>
                <td>{{ b.anio ?? b.year ?? '—' }}</td>
                <td>{{ b.km ?? '—' }}</td>
                <td>
                  <span class="badge" :class="(b.estado || '').toUpperCase() === 'OPERATIVO' ? 'green' : 'red'">
                    {{ b.estado || '—' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty">🚌 No hay buses registrados.</div>
        </template>
      </div>

      <!-- Mantenciones -->
      <div class="card">
        <h3>Mantenciones</h3>
        <div v-if="loading" class="skeleton" style="height:36px"></div>
        <template v-else>
          <table v-if="mantenciones.length" class="table">
            <thead>
              <tr><th>Bus</th><th>Fecha</th><th>Estado</th></tr>
            </thead>
            <tbody>
              <tr v-for="m in mantenciones" :key="m.id">
                <td>{{ m.bus?.patente ?? '—' }}</td>
                <td>{{ fmtDate(m.fecha) }}</td>
                <td><span class="badge blue">{{ m.estado?.nombre_estado ?? '—' }}</span></td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty">🛠️ Sin mantenciones.</div>
        </template>
      </div>

      <!-- Incidentes -->
      <div v-if="hasIncidentesApi" class="card">
        <h3>Incidentes</h3>
        <div v-if="loading" class="skeleton" style="height:36px"></div>
        <template v-else>
          <table v-if="incidentes.length" class="table">
            <thead><tr><th>Título</th><th>Bus</th><th>Fecha</th></tr></thead>
            <tbody>
              <tr v-for="i in incidentes" :key="i.id">
                <td>{{ i.titulo ?? '(Sin título)' }}</td>
                <td>{{ i.bus?.patente ?? '—' }}</td>
                <td>{{ fmtDate(i.fecha) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty">⚠️ Sin incidentes.</div>
        </template>
      </div>

      <div v-else class="card">
        <h3>Incidentes</h3>
        <p class="empty">⚠️ Módulo de incidentes no disponible.</p>
      </div>
    </div>

    <!-- ==================== MODO CONDUCTOR ==================== -->
    <div v-else class="grid">
      <div class="card">
        <h2>Mis Turnos</h2>
        <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
      </div>

      <div class="card">
        <div v-if="loading" class="skeleton" style="height:36px"></div>
        <template v-else>
          <table v-if="turnos.length" class="table">
            <thead>
              <tr>
                <th>#</th><th>Bus</th><th>Inicio</th><th>Fin</th><th>Estado</th><th>Título</th><th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in turnos" :key="t.id">
                <td>{{ t.id }}</td>
                <td>{{ t.bus ?? '—' }}</td>
                <td>{{ fmtDate(t.hora_inicio) }}</td>
                <td>{{ fmtDate(t.hora_fin) }}</td>
                <td>
                  <span
                    class="badge"
                    :class="t.estado==='PROGRAMADO' ? 'blue' :
                            t.estado==='EN CURSO' ? 'yellow' :
                            t.estado==='COMPLETADO' ? 'green' : 'red'">
                    {{ t.estado }}
                  </span>
                </td>
                <td>{{ t.titulo }}</td>
                <td>{{ t.descripcion }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty">🕒 No tienes turnos asignados.</div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page { display:flex; flex-direction:column; gap:1rem; }

/* Barra de modos centrada con botones azules */
.mode-bar {
  display:flex; justify-content:center; gap:2rem;
  background:#fff; padding:1.5rem 0;
}
.mode-btn {
  font-size:1.2rem; font-weight:700;
  background:#2563eb; color:#fff;
  border:none; border-radius:14px;
  padding:1rem 3rem; cursor:pointer;
  transition:all .25s ease;
  box-shadow:0 3px 6px rgba(0,0,0,.15);
}
.mode-btn:hover { background:#1d4ed8; transform:translateY(-2px); }
.mode-btn.active { background:#1e40af; transform:scale(1.05); }

/* Tarjetas/Tablas */
.grid { display:grid; gap:1rem; margin-top:1rem; }
.card { background:#fff; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,.08); padding:1rem; }
.table { width:100%; border-collapse:collapse; }
.table th, .table td { border-top:1px solid #e5e7eb; padding:.65rem .75rem; font-size:.9rem; }
.table th { background:#f3f4f6; color:#374151; }
.empty { color:#6b7280; text-align:center; padding:1rem; }
.error { color:#dc2626; }

/* Badges */
.badge { display:inline-block; padding:.25rem .6rem; border-radius:999px; font-size:.78rem; font-weight:700; }
.badge.green { background:#dcfce7; color:#166534; }
.badge.red   { background:#fee2e2; color:#991b1b; }
.badge.blue  { background:#e0e7ff; color:#3730a3; }
.badge.yellow{ background:#fef9c3; color:#92400e; }

.skeleton {
  width:100%; border-radius:6px;
  background:linear-gradient(90deg,#f3f3f3 25%,#e0e0e0 50%,#f3f3f3 75%);
  background-size:200% 100%; animation:loading 1.5s infinite;
}
@keyframes loading { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
</style>
