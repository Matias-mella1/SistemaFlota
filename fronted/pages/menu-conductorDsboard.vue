<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

definePageMeta({
  layout: 'conductor',
})

/* ===============================
   Tipos
================================ */
type EstadoTurno = 'PRÓXIMO' | 'COMPLETADO' | 'CANCELADO'
interface ConductorRow { id: number; nombre: string; revisionMedica?: string }
interface BusRow { id: number; patente: string; modelo: string; anio?: number }
interface TurnoRow {
  id: number
  fecha: string
  horario: string
  ruta: string
  estado: EstadoTurno
  bus?: string
}
interface IncidenteRow { id: number; titulo: string; fecha: string; estado: string }

/* ===============================
   Estado
================================ */
const conductor = ref<ConductorRow | null>(null)
const bus = ref<BusRow | null>(null)
const turnos = ref<TurnoRow[]>([])
const incidentes = ref<IncidenteRow[]>([])

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

function normalizeTurno(raw: any): TurnoRow {
  const horaIni = raw?.hora_inicio || raw?.horaInicio || raw?.start_time
  const horaFin = raw?.hora_fin || raw?.horaFin || raw?.end_time
  const rango = raw?.horario || (horaIni && horaFin ? `${horaIni} - ${horaFin}` : '')
  const estRaw = String(raw?.estado || raw?.status || '').toUpperCase()
  const estado: EstadoTurno = (estRaw.includes('COMPLET')
    ? 'COMPLETADO'
    : estRaw.includes('CANCEL')
      ? 'CANCELADO'
      : 'PRÓXIMO') as EstadoTurno
  return {
    id: Number(raw?.id ?? 0),
    fecha: String(raw?.fecha || raw?.date || ''),
    horario: String(rango || ''),
    ruta: String(raw?.ruta || raw?.route || ''),
    bus: String(raw?.bus || raw?.bus_plate || raw?.patente || ''),
    estado,
  }
}

/* Badge class segun estado */
function estadoClass(s: EstadoTurno) {
  const key = s.toLowerCase().replace(/\s+/g, '-')
  if (key.includes('próximo') || key.includes('proximo')) return 'operativo'
  if (key.includes('completado')) return 'mantenimiento'
  if (key.includes('cancelado')) return 'fuera-de-servicio'
  return 'operativo'
}

/* ===============================
   Carga de datos
================================ */
let aborter: AbortController | null = null

async function loadAll() {
  if (aborter) aborter.abort()
  aborter = new AbortController()
  loading.value = true
  errorMsg.value = null
  try {
    const [cRes, bRes, tRes, iRes] = await Promise.all([
      $fetch<any>('/api/conductor', { signal: aborter.signal as any }),
      $fetch<any>('/api/bus', { signal: aborter.signal as any }),
      $fetch<any>('/api/conductor/turnos?limit=10&order=desc', { signal: aborter.signal as any }),
      $fetch<any>('/api/conductor/incidentes?limit=5&order=desc', { signal: aborter.signal as any }),
    ])

    conductor.value = {
      id: Number(cRes?.id ?? 0),
      nombre: String(cRes?.nombre || cRes?.name || 'Conductor'),
      revisionMedica: cRes?.revisionMedica || cRes?.medical_check,
    }
    bus.value = {
      id: Number(bRes?.id ?? 0),
      patente: String(bRes?.patente || bRes?.plate || ''),
      modelo: String(bRes?.modelo || bRes?.model || ''),
      anio: Number(bRes?.anio || bRes?.year || 0),
    }
    turnos.value = pickArray(tRes).map(normalizeTurno)
    incidentes.value = pickArray(iRes).map((r: any) => ({
      id: Number(r?.id ?? 0),
      titulo: String(r?.titulo || r?.title || ''),
      fecha: String(r?.fecha || r?.date || ''),
      estado: String(r?.estado || r?.status || ''),
    }))
  } catch (e: any) {
    if (e?.name === 'AbortError') return
    errorMsg.value = e?.data?.message || e?.message || 'Error al cargar datos'
    console.error('loadAll error →', e)
  } finally {
    loading.value = false
  }
}

/* ===============================
   Auto actualización
================================ */
let timer: number | null = null
onMounted(() => {
  loadAll()
  timer = window.setInterval(loadAll, 15000) // refresco cada 15s
})
onUnmounted(() => {
  if (timer) clearInterval(timer)
  if (aborter) aborter.abort()
})

/* ===============================
   Cálculo del próximo turno (para la tarjeta central)
================================ */
const nextTurno = computed<TurnoRow | null>(() => {
  if (!turnos.value.length) return null
  const porFecha = [...turnos.value].sort((a, b) => {
    const da = new Date(a.fecha.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3')).getTime() || 0
    const db = new Date(b.fecha.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3')).getTime() || 0
    return da - db
  })
  const proximo = porFecha.find(t => t.estado === 'PRÓXIMO') || porFecha[0]
  return proximo || null
})
</script>

<template>
  <div class="dashboard">
    <!-- Encabezado / Hero -->
    <div class="hero">
      <div class="hero-emoji">👋</div>
      <div class="hero-text">
        <div class="hero-title">Bienvenido, {{ conductor?.nombre || 'Conductor' }}</div>
        <div class="hero-sub">Panel de Conductor – Aquí puedes ver tus turnos, reportar incidentes y revisar tu historial.</div>
      </div>
    </div>

    <!-- Tres tarjetas grandes -->
    <div class="bigcards">
      <!-- Mi Bus Asignado -->
      <div class="card big white">
        <div class="big-icon">🚌</div>
        <h3 class="big-title">Mi Bus Asignado</h3>
        <div class="big-content">
          <div><strong>Patente:</strong> {{ bus?.patente || '—' }}</div>
          <div><strong>{{ bus?.modelo || '—' }}</strong> <span v-if="bus?.anio"> {{ bus?.anio }}</span></div>
        </div>
      </div>

      <!-- Próximo Turno -->
      <div class="card big white">
        <div class="big-icon">⏰</div>
        <h3 class="big-title">Próximo Turno</h3>
        <div class="big-content">
          <div v-if="nextTurno"><strong>{{ nextTurno.fecha }}</strong></div>
          <div v-else>—</div>
          <div>{{ nextTurno?.horario || '—' }}</div>
        </div>
      </div>

      <!-- Reportar Incidente -->
      <a class="card big danger" href="/conductor/incidentes/nuevo">
        <div class="big-icon">⚠️</div>
        <h3 class="big-title">Reportar Incidente</h3>
        <div class="big-content">
          <div>Haz clic aquí para reportar</div>
          <div>un nuevo incidente</div>
        </div>
      </a>
    </div>

    <!-- Recordatorio Importante (amarillo) -->
    <div class="notice" v-if="conductor?.revisionMedica">
      <span class="notice-icon">🛎️</span>
      <div>Tu revisión médica vence el <strong>{{ conductor.revisionMedica }}</strong>. Recuerda renovarla a tiempo.</div>
    </div>

    <!-- Turnos -->
    <div class="card table-card">
      <h3>Mis Turnos Próximos y Recientes</h3>
      <div v-if="errorMsg" class="empty">⚠️ {{ errorMsg }}</div>
      <table class="table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Horario</th>
            <th>Ruta</th>
            <th>Bus</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody v-if="loading">
          <tr v-for="i in 3" :key="i"><td colspan="5"><div class="skeleton"></div></td></tr>
        </tbody>
        <tbody v-else-if="turnos.length">
          <tr v-for="t in turnos" :key="t.id">
            <td>{{ t.fecha }}</td>
            <td>{{ t.horario }}</td>
            <td>{{ t.ruta }}</td>
            <td>{{ t.bus || bus?.patente || '—' }}</td>
            <td><span :class="['badge', estadoClass(t.estado)]">{{ t.estado }}</span></td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr><td colspan="5"><div class="empty"><span class="empty-icon">📅</span>No hay turnos.</div></td></tr>
        </tbody>
      </table>
    </div>

    <!-- Incidentes -->
    <div class="card table-card">
      <h3>Mis Incidentes Reportados</h3>
      <table class="table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody v-if="incidentes.length">
          <tr v-for="i in incidentes" :key="i.id">
            <td>{{ i.titulo }}</td>
            <td>{{ i.fecha }}</td>
            <td>{{ i.estado }}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr><td colspan="3"><div class="empty"><span class="empty-icon">🚧</span>No hay incidentes.</div></td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* Layout base */
.dashboard { display:flex; flex-direction:column; gap:1.5rem; }

/* Hero (banner morado) */
.hero {
  display:flex; align-items:center; gap:.75rem; justify-content:flex-start;
  background:#6d28d9; color:#fff; border-radius:14px; padding:1rem 1.25rem;
  box-shadow:0 6px 16px rgba(0,0,0,.12);
}
.hero-emoji{ font-size:1.6rem; }
.hero-title{ font-weight:800; font-size:1.1rem; }
.hero-sub{ opacity:.9; font-size:.92rem; }

/* Tres tarjetas grandes */
.bigcards {
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}
.card.big {
  border-radius:14px;
  padding: 1.25rem;
  text-align:center;
  box-shadow:0 4px 12px rgba(0,0,0,.08);
  transition: transform .2s, box-shadow .2s;
  text-decoration: none;
}
.card.big:hover { transform: translateY(-3px); box-shadow:0 8px 20px rgba(0,0,0,.12); }

.card.big.white { background:#fff; color:#111827; }
.card.big.danger { background:#dc2626; color:#fff; }

.big-icon { font-size:2rem; margin-bottom:.35rem; }
.big-title { margin:0 0 .35rem 0; font-size:1.05rem; font-weight:700; }
.big-content { font-size:.97rem; opacity:.95; display:flex; flex-direction:column; gap:.15rem; }

/* Aviso amarillo */
.notice{
  display:flex; align-items:center; gap:.6rem;
  background:#fef3c7; color:#92400e; border:1px solid #fde68a;
  padding:.9rem 1rem; border-radius:12px; font-weight:500;
}
.notice-icon{ font-size:1.1rem; }

/* Tarjetas de tablas */
.table-card { background:#fff; border-radius:12px; padding:1rem; box-shadow:0 4px 8px rgba(0,0,0,.05); }
.table { width:100%; border-collapse:collapse; text-align:left; }
th, td { padding:.75rem; border-bottom:1px solid #e5e7eb; }
th { background:#f9fafb; font-weight:600; font-size:.9rem; color:#374151; }
tr:hover td { background:#f3f4f6; }

/* Badges por estado */
.badge { padding:.3rem .6rem; border-radius:8px; font-size:.8rem; font-weight:600; color:#fff; }
.badge.operativo{ background:#16a34a;}
.badge.mantenimiento{ background:#f59e0b;}
.badge.fuera-de-servicio{ background:#dc2626; }

/* Varios */
.empty{ display:flex; align-items:center; justify-content:center; gap:.5rem; padding:1.2rem; color:#6b7280; font-weight:500; font-size:.95rem; }
.empty-icon{ font-size:1.1rem; opacity:.8; }
.skeleton{ width:100%; height:30px; border-radius:6px; background:linear-gradient(90deg,#f3f3f3 25%,#e0e0e0 50%,#f3f3f3 75%); background-size:200% 100%; animation:loading 1.5s infinite; }
@keyframes loading{ 0%{ background-position:200% 0;} 100%{ background-position:-200% 0;} }
</style>
