<script setup lang="ts">
import { ref, reactive, watch, computed, onMounted } from 'vue'
import IncidenteForm from '~/components/IncidenteForm.vue'
import { useAuth } from '~/composables/useAuth'

definePageMeta({ layout: 'admin' })

/* ------------ Tipos ------------- */
type Incidente = {
  id: number
  bus: { id:number; label:string }
  usuario: { id:number; nombre:string }
  fecha: string
  urgencia?: string
  ubicacion?: string
  descripcion?: string
  estadoId?: number
  estado: string
  tipoId?: number
  tipo: string
}

type CatalogoBus = { id:number; label:string }
type CatalogoOpt = { id:number; nombre:string }

type Catalogo = {
  buses: CatalogoBus[]
  estados: CatalogoOpt[]
  tipos: CatalogoOpt[]
}

/* ------------ Auth ------------- */
const { user } = useAuth()
const currentUserId = computed<number|null>(() =>
  (user.value?.id_usuario ?? user.value?.id ?? null) as number | null
)

/* ------------ Estado UI ------------- */
const search = reactive({
  q: '',
  id_bus: '' as number | '',
  id_estado_incidente: '' as number | '',
  id_tipo_incidente: '' as number | '',
})
const items = ref<Incidente[]>([])
const loading = ref(false)
const errorMsg = ref('')

const showForm = ref(false)
const editing = ref<Incidente | null>(null)

const showConfirmModal = ref(false)
const toDelete = ref<Incidente | null>(null)

let abortCtrl: AbortController | null = null
let debounceId: number | null = null

/* ------------ Catálogos ------------- */
const catalogo = ref<Catalogo>({ buses: [], estados: [], tipos: [] })

async function loadCatalogos() {
  const res = await $fetch<any>('/api/incidentes/catalogos', { headers: { 'Cache-Control': 'no-store' } })
  catalogo.value = {
    buses: (res?.buses || []).map((b:any) => ({ id: Number(b.id), label: String(b.label) })),
    estados: (res?.estados || []).map((s:any) => ({
      id: Number(s.id ?? s.id_estado_incidente ?? s.value),
      nombre: String(s.nombre ?? s.nombre_estado ?? s.label ?? s),
    })),
    tipos: (res?.tipos || []).map((t:any) => ({
      id: Number(t.id ?? t.id_tipo_incidente),
      nombre: String(t.nombre ?? t.nombre_tipo),
    })),
  }
}

/* ------------ Normalización ------------- */
function ymdOr(raw:any): string {
  if (!raw) return ''
  const d = raw instanceof Date ? raw : new Date(raw)
  if (isNaN(+d)) return String(raw).slice(0,10)
  return new Date(d.getTime() - d.getTimezoneOffset()*60000).toISOString().slice(0,10)
}

function normalizeOne(raw:any): Incidente {
  const busId = Number(raw?.id_bus ?? raw?.bus?.id ?? 0)
  const busLabel = raw?.bus?.patente
    ? `${raw.bus.patente}${raw.bus.modelo ? ' - ' + raw.bus.modelo : ''}`
    : (raw?.bus?.label || raw?.bus || '')

  const estadoId = Number(raw?.id_estado_incidente ?? raw?.estado?.id_estado_incidente ?? 0)
  const estadoNombre = String(raw?.estado?.nombre_estado ?? raw?.estado ?? '')

  const tipoId = Number(raw?.id_tipo_incidente ?? raw?.tipo?.id_tipo_incidente ?? 0)
  const tipoNombre = String(raw?.tipo?.nombre_tipo ?? raw?.tipo ?? '')

  return {
    id: Number(raw?.id ?? raw?.id_incidente ?? 0),
    bus: { id: busId, label: String(busLabel) },
    usuario: {
      id: Number(raw?.id_usuario ?? raw?.usuario?.id ?? 0),
      nombre: String(raw?.usuario?.nombre || raw?.usuario || ''),
    },
    fecha: ymdOr(raw?.fecha),
    urgencia: raw?.urgencia || '',
    ubicacion: raw?.ubicacion || '',
    descripcion: raw?.descripcion || '',
    estadoId,
    estado: estadoNombre.toUpperCase(),
    tipoId,
    tipo: tipoNombre,
  }
}

const normalizeMany = (arr:any[]) => (arr || []).map(normalizeOne)

/* ------------ Carga ------------- */
async function load() {
  if (abortCtrl) abortCtrl.abort()
  abortCtrl = new AbortController()
  loading.value = true
  errorMsg.value = ''
  try {
    const res = await $fetch<{ items?: any[] } | any>('/api/incidentes', {
      query: {
        q: search.q || undefined,
        id_bus: search.id_bus || undefined,
        id_estado_incidente: search.id_estado_incidente || undefined,
        id_tipo_incidente: search.id_tipo_incidente || undefined,
        pageSize: 100,
        sortBy: 'fecha',
        sortOrder: 'desc',
      },
      signal: abortCtrl.signal as any,
      headers: { 'Cache-Control': 'no-store' },
    })
    const list = Array.isArray(res) ? res : (Array.isArray(res?.items) ? res.items : [])
    items.value = normalizeMany(list)
  } catch (e:any) {
    if (e?.name !== 'AbortError') errorMsg.value = e?.data?.message || e?.message || 'Error cargando incidentes'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await loadCatalogos()
  await load()
})

watch(() => ({ ...search }), () => {
  if (debounceId) window.clearTimeout(debounceId)
  debounceId = window.setTimeout(load, 300)
}, { deep: true })

const filtered = computed(() => items.value)

/* ------------ ABM ------------- */
function openCreate() {
  editing.value = null
  showForm.value = true
}

function openEdit(row: Incidente) {
  editing.value = {
    ...row,
    estadoId: row.estadoId ? Number(row.estadoId) : undefined,
    tipoId: row.tipoId ? Number(row.tipoId) : undefined,
  }
  showForm.value = true
}

function askDelete(row: Incidente) {
  toDelete.value = row
  showConfirmModal.value = true
}
function cancelDelete() {
  toDelete.value = null
  showConfirmModal.value = false
}

async function handleSave(payload: {
  id?: number
  id_bus: number
  id_usuario?: number
  fecha: string
  urgencia?: string
  ubicacion?: string
  descripcion?: string
  id_estado_incidente?: number | ''
  id_tipo_incidente: number | ''
}) {
  try {
    const uid = currentUserId.value
    if (!uid && !payload.id) throw new Error('No se pudo determinar el id_usuario. Inicia sesión.')

    const body: any = {
      id_bus: Number(payload.id_bus),
      id_usuario: Number(payload.id_usuario ?? uid!),
      fecha: payload.fecha,
      urgencia: payload.urgencia || undefined,
      ubicacion: payload.ubicacion || undefined,
      descripcion: payload.descripcion || undefined,
      id_tipo_incidente: Number(payload.id_tipo_incidente),
    }
    if (payload.id_estado_incidente != null && payload.id_estado_incidente !== '') {
      body.id_estado_incidente = Number(payload.id_estado_incidente)
    }

    if (payload.id) {
      await $fetch(`/api/incidentes/${payload.id}`, { method: 'PUT', body } as any)
    } else {
      await $fetch('/api/incidentes', { method: 'POST', body } as any)
    }
    showForm.value = false
    await load()
  } catch (e:any) {
    alert(e?.data?.message || e?.message || 'No se pudo guardar el incidente')
  }
}

async function removeOne() {
  if (!toDelete.value) return
  try {
    await $fetch(`/api/incidentes/${toDelete.value.id}`, { method: 'DELETE' } as any)
  } catch (e:any) {
    alert(e?.data?.message || e?.message || 'No se pudo eliminar')
  } finally {
    cancelDelete()
    load()
  }
}
</script>

<template>
  <div class="grid">
    <!-- Filtros -->
    <div class="card">
      <h3>Incidentes</h3>
      <div class="filters">
        <div>
          <label class="label">Buscar</label>
          <input class="input" placeholder="Título, descripción, ubicación…" v-model="search.q" />
        </div>

        <div>
          <label class="label">Bus</label>
          <select class="select" v-model.number="search.id_bus">
            <option :value="''">Todos</option>
            <option v-for="b in catalogo.buses" :key="b.id" :value="b.id">{{ b.label }}</option>
          </select>
        </div>

        <div>
          <label class="label">Estado</label>
          <select class="select" v-model.number="search.id_estado_incidente">
            <option :value="''">Todos</option>
            <option v-for="s in catalogo.estados" :key="s.id" :value="s.id">{{ s.nombre }}</option>
          </select>
        </div>

        <div>
          <label class="label">Tipo</label>
          <select class="select" v-model.number="search.id_tipo_incidente">
            <option :value="''">Todos</option>
            <option v-for="t in catalogo.tipos" :key="t.id" :value="t.id">{{ t.nombre }}</option>
          </select>
        </div>

        <div style="grid-column: -2 / -1; display:flex; align-items:end; justify-content:end">
          <button class="btn" @click="openCreate">+ Nuevo Incidente</button>
        </div>
      </div>

      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    </div>

    <!-- Tabla -->
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Bus</th>
            <th>Fecha</th>
            <th>Urgencia</th>
            <th>Estado</th>
            <th>Tipo</th>
            <th>Ubicación</th>
            <th>Descripción</th>
            <th style="width:120px"></th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="loading">
            <td colspan="9" style="text-align:center;">Cargando…</td>
          </tr>
          <tr v-else-if="filtered.length === 0">
            <td colspan="9" style="text-align:center;">Sin resultados</td>
          </tr>
          <tr v-else v-for="row in filtered" :key="row.id">
            <td>{{ row.id }}</td>
            <td>{{ row.bus?.label || '—' }}</td>
            <td>{{ row.fecha }}</td>
            <td>{{ row.urgencia || '—' }}</td>
            <td>{{ row.estado || '—' }}</td>
            <td>{{ row.tipo || '—' }}</td>
            <td>{{ row.ubicacion || '—' }}</td>
            <td style="max-width:360px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">{{ row.descripcion || '—' }}</td>
            <td style="display:flex; gap:.5rem">
              <button class="row-action" title="Editar" @click="openEdit(row)">✏️</button>
              <button class="row-action danger" title="Eliminar" @click="askDelete(row)">🗑</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Form -->
    <div v-if="showForm" class="backdrop">
      <div class="card" style="width:min(780px, 92vw);">
        <h3 style="margin-top:0">{{ editing ? 'Editar Incidente' : 'Nuevo Incidente' }}</h3>

        <IncidenteForm
          :initial="editing ? {
            id: editing.id,
            id_bus: editing.bus?.id || null,
            fecha: editing.fecha,
            urgencia: editing.urgencia,
            ubicacion: editing.ubicacion,
            descripcion: editing.descripcion,
            id_estado_incidente: editing.estadoId,
            id_tipo_incidente: editing.tipoId,
          } : {}"
          :buses="catalogo.buses"
          :estados="catalogo.estados"
          :tipos="catalogo.tipos"
          @cancel="showForm=false"
          @save="handleSave"
        />
      </div>
    </div>

    <!-- Modal Eliminar -->
    <div v-if="showConfirmModal" class="backdrop">
      <div class="card" style="width:min(420px, 90vw); text-align:center;">
        <h3 style="color:#dc2626">Confirmar Eliminación</h3>
        <p v-if="toDelete">¿Eliminar incidente <strong>#{{ toDelete.id }}</strong> del bus <strong class="code">{{ toDelete.bus?.label }}</strong>?</p>
        <div style="display:flex; justify-content:center; gap:1rem; margin-top:1.5rem;">
          <button class="btn" style="background:#6b7280" @click="cancelDelete">Cancelar</button>
          <button class="btn danger-btn" @click="removeOne">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid { display: grid; gap: 1rem; }
.card { background:#fff; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,.08); padding:1rem; }
.filters { display:grid; grid-template-columns:repeat(5,1fr); gap:1rem; align-items:end; }
.label { font-size:.85rem; font-weight:600; color:#4b5563; margin-bottom:.35rem; }
.input,.select { width:100%; border:1px solid #e5e7eb; border-radius:10px; padding:.5rem .75rem; }
.input:focus,.select:focus { border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,.25); }
.btn { background:#2563eb; color:#fff; border:none; border-radius:10px; padding:.55rem .9rem; font-weight:600; cursor:pointer; }
.btn:hover { background:#1d4ed8; }
.danger-btn { background:#dc2626; color:#fff; border:none; border-radius:10px; padding:.55rem .9rem; font-weight:600; cursor:pointer; }
.danger-btn:hover { background:#b91c1c; }
.table { width:100%; border-collapse:collapse; }
.table th, .table td { border-top:1px solid #e5e7eb; padding:.65rem .75rem; font-size:.9rem; vertical-align: top; }
.table th { background:#f3f4f6; color:#374151; }
.table tr:hover { background:#f9fafb; }
.code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace; }
.row-action { background:transparent; border:1px solid #e5e7eb; border-radius:8px; padding:.25rem .5rem; cursor:pointer; }
.row-action:hover { background:#f3f4f6; }
.row-action.danger:hover { background:#fee2e2; }
.error { color:#dc2626; margin-top:.75rem; text-align:right; }
.backdrop { position:fixed; inset:0; background:rgba(0,0,0,.4); display:grid; place-items:center; z-index:50; }
</style>
