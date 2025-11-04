<script setup lang="ts">
import { ref, reactive, computed, watchEffect } from 'vue'
import MantenimientoForm from '../../components/MantenimientoForm.vue'

definePageMeta({ layout: 'admin' })
// --- Tipos en base a tu API real ---
type CatalogBus = { id_bus:number; patente:string }
type CatalogTaller = { id_taller:number; nombre:string }                 // 👈 nombre
type CatalogTipo = { id_tipo_mantenimiento:number; nombre_tipo:string }  // 👈 nombre_tipo
type CatalogEstado = { id_estado_mantenimiento:number; nombre_estado:string } // 👈 nombre_estado

type Row = {
  id_mantenimiento: number
  id_bus: number
  id_taller: number
  id_tipo_mantenimiento: number
  id_estado_mantenimiento: number
  fecha: string | Date
  observaciones?: string | null
  costo?: number | null
  // includes retornados por GET /api/mantenimientos
  bus?: { id_bus:number; patente:string } | null
  taller?: { id_taller:number; nombre:string } | null                 // 👈 nombre
  tipo?: { id_tipo_mantenimiento:number; nombre_tipo:string } | null  // 👈 nombre_tipo
  estado?: { id_estado_mantenimiento:number; nombre_estado:string } | null // 👈 nombre_estado
}

type PageResult = {
  items: Row[]
  page?: number
  pageSize?: number
  total?: number
  totalPages?: number
}

// --- Filtros ---
const search = reactive({
  q: '',
  id_bus: '' as number | '' ,
  id_taller: '' as number | '',
  id_tipo_mantenimiento: '' as number | '',
  id_estado_mantenimiento: '' as number | '',
  from: '',
  to: ''
})

// --- Catálogos (una sola llamada) ---
const { buses, talleres, tipos, estados } = await $fetch<{
  buses: CatalogBus[],
  talleres: CatalogTaller[],
  tipos: CatalogTipo[],
  estados: CatalogEstado[]
}>('/api/mantenimientos/catalogos')

// (Opcional) inspeccionar
// console.log('📦 Catálogos:', { buses, talleres, tipos, estados })

// --- Data de tabla ---
const items = ref<Row[]>([])
const loading = ref(false)
const errorMsg = ref('')

async function load() {
  loading.value = true
  errorMsg.value = ''
  try {
    const res = await $fetch<PageResult>('/api/mantenimientos', {
      query: {
        q: search.q || undefined,
        id_bus: search.id_bus || undefined,
        id_taller: search.id_taller || undefined,
        id_tipo_mantenimiento: search.id_tipo_mantenimiento || undefined,
        id_estado_mantenimiento: search.id_estado_mantenimiento || undefined,
        from: search.from || undefined,
        to: search.to || undefined,
      }
    })
    items.value = (res.items || []).map(r => ({
      ...r,
      costo: r.costo != null ? Number(r.costo) : null
    }))
  } catch (e:any) {
    errorMsg.value = e?.data?.message || 'Error cargando mantenimientos'
  } finally {
    loading.value = false
  }
}
watchEffect(load)
const filtered = computed(() => items.value)

// --- Modal + edición ---
const showForm = ref(false)
const editing = ref<Row | null>(null)

function openCreate() {
  editing.value = null
  showForm.value = true
}
function openEdit(row: Row) {
  editing.value = { ...row }
  showForm.value = true
}

async function removeRow(id: number) {
  if (!confirm('¿Eliminar mantenimiento?')) return
  await $fetch(`/api/mantenimientos/${id}`, { method: 'DELETE' } as any)
  await load()
}

// Adaptar Row -> initial del form
function toFormInitial(r: Row | null | undefined) {
  if (!r) return undefined
  return {
    id_mantenimiento: r.id_mantenimiento,
    id_bus: r.id_bus,
    id_taller: r.id_taller,
    id_tipo_mantenimiento: r.id_tipo_mantenimiento,
    id_estado_mantenimiento: r.id_estado_mantenimiento,
    fecha: new Date(r.fecha as any).toISOString().slice(0,10),
    costo: r.costo ?? undefined,
    observaciones: r.observaciones ?? ''
  }
}

// Guardar (crea/edita)
type SavePayload = {
  id_mantenimiento?: number
  id_bus: number
  id_taller: number
  id_tipo_mantenimiento: number
  id_estado_mantenimiento: number
  fecha: string
  costo?: number
  observaciones?: string | null
}

async function save(payload: SavePayload) {
  if (payload.id_mantenimiento) {
    const { id_mantenimiento, ...body } = payload
    await $fetch(`/api/mantenimientos/${id_mantenimiento}`, {
      method: 'PUT',
      body
    } as any)
  } else {
    await $fetch('/api/mantenimientos', {
      method: 'POST',
      body: payload
    } as any)
  }
  showForm.value = false
  await load()
}

// Helpers
function fmtFecha(d: string | Date) {
  const date = typeof d === 'string' ? new Date(d) : d
  return isNaN(date.getTime()) ? '—' : date.toLocaleDateString()
}
function fmtMoney(n: number | null | undefined) {
  if (n == null) return '—'
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n)
}
</script>

<template>
  <div class="grid">
    <!-- Filtros -->
    <div class="card">
      <h3 style="margin:0 0 .75rem 0">Mantenimientos</h3>

      <div class="filters">
        <div>
          <label class="label">Buscar</label>
          <input class="input" placeholder="Observaciones / tipo / estado" v-model="search.q" />
        </div>

        <div>
          <label class="label">Bus</label>
          <select class="select" v-model.number="search.id_bus">
            <option value="">Todos</option>
            <option v-for="b in buses" :key="b.id_bus" :value="b.id_bus">#{{ b.id_bus }} - {{ b.patente }}</option>
          </select>
        </div>

        <div>
          <label class="label">Taller</label>
          <select class="select" v-model.number="search.id_taller">
            <option value="">Todos</option>
            <option v-for="t in talleres" :key="t.id_taller" :value="t.id_taller">{{ t.nombre }}</option>
          </select>
        </div>

        <div>
          <label class="label">Tipo</label>
          <select class="select" v-model.number="search.id_tipo_mantenimiento">
            <option value="">Todos</option>
            <option v-for="t in tipos" :key="t.id_tipo_mantenimiento" :value="t.id_tipo_mantenimiento">{{ t.nombre_tipo }}</option>
          </select>
        </div>

        <div>
          <label class="label">Estado</label>
          <select class="select" v-model.number="search.id_estado_mantenimiento">
            <option value="">Todos</option>
            <option v-for="e in estados" :key="e.id_estado_mantenimiento" :value="e.id_estado_mantenimiento">{{ e.nombre_estado }}</option>
          </select>
        </div>

        <div>
          <label class="label">Desde</label>
          <input class="input" type="date" v-model="search.from" />
        </div>

        <div>
          <label class="label">Hasta</label>
          <input class="input" type="date" v-model="search.to" />
        </div>

        <div style="grid-column: -2 / -1; display:flex; align-items:end; justify-content:end">
          <button class="btn" @click="openCreate">+ Nueva mantención</button>
        </div>
      </div>

      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    </div>

    <!-- Tabla -->
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th>#</th><th>Bus</th><th>Taller</th><th>Tipo</th><th>Estado</th><th>Fecha</th><th>Costo</th><th>Obs.</th><th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="m in filtered" :key="m.id_mantenimiento">
            <td>{{ m.id_mantenimiento }}</td>
            <td>#{{ m.bus?.id_bus }} ({{ m.bus?.patente ?? '—' }})</td>
            <td>{{ m.taller?.nombre ?? '—' }}</td>
            <td>{{ m.tipo?.nombre_tipo ?? '—' }}</td>
            <td>{{ m.estado?.nombre_estado ?? '—' }}</td>
            <td>{{ fmtFecha(m.fecha) }}</td>
            <td>{{ fmtMoney(m.costo) }}</td>
            <td>{{ m.observaciones ?? '—' }}</td>
            <td style="display:flex; gap:.5rem">
              <button class="row-action" title="Editar" @click="openEdit(m)">✏️</button>
              <button class="row-action danger" title="Eliminar" @click="removeRow(m.id_mantenimiento)">🗑</button>
            </td>
          </tr>

          <tr v-if="loading">
            <td colspan="9" style="text-align:center; padding:1rem; color:#6b7280">Cargando...</td>
          </tr>
          <tr v-if="!loading && filtered.length === 0">
            <td colspan="9" style="text-align:center; padding:1rem; color:#6b7280">Sin resultados</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showForm" class="backdrop">
      <div class="card" style="width:min(640px,92vw);">
        <h3 style="margin-top:0">{{ editing ? 'Editar mantención' : 'Nueva mantención' }}</h3>
        <MantenimientoForm
          :initial="toFormInitial(editing)"
          :buses="buses"
          :talleres="talleres"
          :tipos="tipos"
          :estados="estados"
          @cancel="showForm=false"
          @save="save"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid { display:grid; gap:1rem; }
.card { background:#fff; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.06); padding:1rem; }
.filters { display:grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap:.75rem 1rem; align-items:end; }
.label { display:block; font-size:.85rem; color:#4b5563; margin-bottom:.35rem; font-weight:600; }
.input,.select { width:100%; border:1px solid #e5e7eb; border-radius:10px; padding:.5rem .75rem; outline:none; }
.input:focus,.select:focus { border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,.25); }
.btn { background:#2563eb; color:#fff; border:none; border-radius:10px; padding:.55rem .9rem; font-weight:600; cursor:pointer; }
.btn:hover { background:#1d4ed8; }
.table { width:100%; border-collapse:collapse; }
.table thead th { text-align:left; font-size:.9rem; color:#374151; background:#f3f4f6; padding:.65rem .75rem; }
.table tbody td { border-top:1px solid #e5e7eb; padding:.65rem .75rem; }
.table tbody tr:hover { background:#f9fafb; }
.row-action { background:transparent; border:1px solid #e5e7eb; border-radius:8px; padding:.25rem .5rem; cursor: pointer; }
.row-action:hover { background:#f3f4f6; }
.row-action.danger:hover { background:#fee2e2; }
.error { color:#dc2626; margin-top:.5rem; }
.backdrop { position:fixed; inset:0; background:rgba(0,0,0,.4); display:grid; place-items:center; z-index:50; }
</style>
