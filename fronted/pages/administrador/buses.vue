<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'
import StatusBadge from '../../components/StatusBadge.vue'

definePageMeta({ layout: 'admin' })

// -------------------- Tipos --------------------
type EstadoBus = 'OPERATIVO' | 'MANTENIMIENTO' | 'FUERA DE SERVICIO'
type Combustible = 'DIESEL' | 'GASOLINA' | 'GAS' | 'ELECTRICO'

interface Bus {
  id: number
  code: number
  plate: string
  model: string
  brand: string
  fuel: Combustible
  year: number
  km: number
  capacidad: number
  estado: EstadoBus
  fechaRevisionTecnica: string | null // YYYY-MM-DD | null
  fechaExtintor: string | null        // YYYY-MM-DD | null
  extintorVigente: boolean            // derivado (fechaExtintor >= hoy)
}

type BusInput = Omit<Bus, 'id' | 'code' | 'extintorVigente'>

// -------------------- Estado UI --------------------
const search = reactive({ q:'', estado:'' as ''|EstadoBus })
const items = ref<Bus[]>([])
const loading = ref(false)
const errorMsg = ref<string>('')

let abortCtrl: AbortController | null = null
let debounceId: number | null = null

// -------------------- Normalización --------------------
function normalizeFuel(v:any): Combustible {
  const s = String(v ?? '').toUpperCase()
  if (s === 'DIESEL') return 'DIESEL'
  if (s === 'GASOLINA') return 'GASOLINA'
  if (s === 'GAS') return 'GAS'
  if (s === 'ELECTRICO' || s === 'ELÉCTRICO') return 'ELECTRICO'
  return 'DIESEL'
}
function normalizeEstado(v:any): EstadoBus {
  const s = String(v ?? '').toUpperCase()
  if (s === 'MANTENIMIENTO') return 'MANTENIMIENTO'
  if (s === 'FUERA DE SERVICIO' || s === 'FUERA_DE_SERVICIO') return 'FUERA DE SERVICIO'
  return 'OPERATIVO'
}
function ymdOrNull(v:any): string | null {
  const s = String(v ?? '')
  if (!s) return null
  return s.slice(0,10) // YYYY-MM-DD de ISO
}
function isVigente(fecha: string | null): boolean {
  if (!fecha) return false
  const hoy = new Date().toISOString().slice(0,10)
  return fecha >= hoy
}
function normalizeBus(raw:any): Bus {
  const fechaRev = ymdOrNull(raw.fecha_revision_tecnica ?? raw.fechaRevisionTecnica)
  const fechaExt = ymdOrNull(raw.fecha_extintor ?? raw.fechaExtintor)

  return {
    id: Number(raw.id ?? raw.id_bus),
    code: Number(raw.code ?? raw.codigo ?? 0),
    plate: String(raw.patente ?? raw.plate ?? ''),
    model: String(raw.modelo ?? raw.model ?? ''),
    brand: String(raw.marca ?? raw.brand ?? ''),
    fuel: normalizeFuel(raw.combustible ?? raw.fuel),
    year: Number(raw.annio ?? raw.anio ?? raw.year ?? new Date().getFullYear()),
    km: Number(raw.km ?? raw.kilometraje ?? 0),
    capacidad: Number(raw.capacidad ?? 0),
    estado: normalizeEstado(raw.estado ?? raw.estado_bus?.nombre_estado),
    fechaRevisionTecnica: fechaRev,
    fechaExtintor: fechaExt,
    extintorVigente: isVigente(fechaExt)
  }
}
function normalizeMany(arr:any[]): Bus[] {
  return (arr || []).map(normalizeBus)
}

// -------------------- Carga --------------------
async function load() {
  if (abortCtrl) abortCtrl.abort()
  abortCtrl = new AbortController()

  loading.value = true
  errorMsg.value = ''
  try {
    const res = await $fetch<{items:any[]}>('/api/buses', {
      query: { q: search.q || undefined, estado: search.estado || undefined },
      signal: abortCtrl.signal as any
    })
    items.value = normalizeMany(res.items)
  } catch (e:any) {
    if (e?.name !== 'AbortError') {
      errorMsg.value = e?.data?.message || e?.message || 'Error cargando buses'
    }
  } finally {
    loading.value = false
  }
}

async function loadOne(id:number): Promise<Bus> {
  const raw = await $fetch<any>(`/api/buses/${id}`)
  return normalizeBus(raw)
}

onMounted(load)

watch(() => ({ q: search.q, estado: search.estado }), () => {
  if (debounceId) window.clearTimeout(debounceId)
  debounceId = window.setTimeout(load, 300)
}, { deep: false })

const filtered = computed(() => items.value)

// -------------------- Formulario inline --------------------
const showForm = ref(false)
const editing = ref<Bus|null>(null)
const validationError = ref('')

const form = reactive<BusInput>({
  plate: '',
  model: '',
  brand: '',
  fuel: 'DIESEL',
  year: new Date().getFullYear(),
  km: 0,
  capacidad: 0,
  estado: 'OPERATIVO',
  fechaRevisionTecnica: new Date().toISOString().slice(0,10),
  fechaExtintor: null,
})

function resetForm() {
  Object.assign(form, {
    plate: '',
    model: '',
    brand: '',
    fuel: 'DIESEL' as Combustible,
    year: new Date().getFullYear(),
    km: 0,
    capacidad: 0,
    estado: 'OPERATIVO' as EstadoBus,
    fechaRevisionTecnica: new Date().toISOString().slice(0,10),
    fechaExtintor: null as string | null,
  })
  validationError.value = ''
}

function toBusInput(b:any): BusInput {
  const n = normalizeBus(b)
  return {
    plate: n.plate,
    model: n.model,
    brand: n.brand,
    fuel: n.fuel,
    year: n.year,
    km: n.km,
    capacidad: n.capacidad,
    estado: n.estado,
    fechaRevisionTecnica: n.fechaRevisionTecnica || new Date().toISOString().slice(0,10),
    fechaExtintor: n.fechaExtintor
  }
}

function openCreate(){
  editing.value = null
  resetForm()
  showForm.value = true
}

async function openEdit(b:Bus){
  // Trae detalle por si la lista viene "liviana"
  try {
    const full = await loadOne(b.id)
    editing.value = full
    Object.assign(form, toBusInput(full))
  } catch {
    editing.value = b
    Object.assign(form, toBusInput(b))
  }
  validationError.value = ''
  showForm.value = true
}

// -------------------- Validación --------------------
function validate(): string | null {
  if (!form.plate || !form.model) return 'Debes completar la Patente y el Modelo.'
  if (!form.brand) return 'Debes completar la Marca.'
  if (!form.fuel) return 'Debes seleccionar el Combustible.'
  if (form.capacidad <= 0) return 'La Capacidad debe ser mayor que 0.'
  const currentYear = new Date().getFullYear()
  if (form.year < 1990 || form.year > currentYear + 1) return 'El Año ingresado no es válido (mínimo 1990).'
  if (form.fechaRevisionTecnica && !/^\d{4}-\d{2}-\d{2}$/.test(form.fechaRevisionTecnica)) {
    return 'La Fecha de Revisión Técnica debe tener formato YYYY-MM-DD.'
  }
  if (form.fechaExtintor && !/^\d{4}-\d{2}-\d{2}$/.test(form.fechaExtintor)) {
    return 'La Fecha de Extintor debe tener formato YYYY-MM-DD.'
  }
  return null
}

// -------------------- Guardar (FE -> BE) --------------------
async function saveBus(){
  const err = validate()
  if (err) { validationError.value = err; return }

  const mappedBody: any = {
    patente: form.plate,
    modelo: form.model,
    marca: form.brand,
    combustible: form.fuel,                             // 'DIESEL' | 'GASOLINA' | 'GAS' | 'ELECTRICO'
    annio: form.year,                                   // 👈 doble “n” hacia el backend
    km: form.km,
    capacidad: form.capacidad,
    estado: form.estado,                                // 'OPERATIVO' | ...
    fecha_revision_tecnica: form.fechaRevisionTecnica || null, // 'YYYY-MM-DD' | null
  }
  // Solo enviamos fecha_extintor si hay valor
  if (form.fechaExtintor) mappedBody.fecha_extintor = form.fechaExtintor

  try {
    if (editing.value) {
      await $fetch(`/api/buses/${editing.value.id}`, { method:'PUT', body: mappedBody } as any)
    } else {
      await $fetch('/api/buses', { method:'POST', body:mappedBody } as any)
    }
    showForm.value=false
    await load()
  } catch (e:any) {
    validationError.value = e?.data?.message || e?.message || 'No se pudo guardar el bus'
  }
}

// -------------------- Eliminar --------------------
const busToDelete = ref<Bus|null>(null)
const showConfirmModal = ref(false)

function openRemoveConfirmation(b: Bus) {
  busToDelete.value = b
  showConfirmModal.value = true
}
function cancelRemoval() {
  busToDelete.value = null
  showConfirmModal.value = false
}
async function removeBus(){
  if (!busToDelete.value) return
  const id = busToDelete.value.id
  try {
    await $fetch(`/api/buses/${id}`, { method:'DELETE' } as any)
    cancelRemoval()
    await load()
  } catch (e:any) {
    errorMsg.value = e?.data?.message || e?.message || 'No se pudo eliminar el bus'
    cancelRemoval()
  }
}
</script>

<template>
  <div class="grid">
    <!-- Filtros -->
    <div class="card">
      <h3>Buses</h3>
      <div class="filters">
        <div>
          <label class="label">Buscar</label>
          <input class="input" placeholder="Patente o modelo" v-model="search.q" />
        </div>
        <div>
          <label class="label">Estado</label>
          <select class="select" v-model="search.estado">
            <option value="">Todos</option>
            <option :value="'OPERATIVO'">OPERATIVO</option>
            <option :value="'MANTENIMIENTO'">MANTENIMIENTO</option>
            <option :value="'FUERA DE SERVICIO'">FUERA DE SERVICIO</option>
          </select>
        </div>
        <div style="grid-column: -2 / -1; display:flex; align-items:end; justify-content:end">
          <button class="btn" @click="openCreate">+ Nuevo Bus</button>
        </div>
      </div>
      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    </div>

    <!-- Tabla -->
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th>#</th><th>Patente</th><th>Modelo</th><th>Marca</th>
            <th>Combustible</th><th>Año</th><th>KM</th><th>Capacidad</th>
            <th>Rev. Téc.</th><th>Fecha Extintor</th><th>Extintor Vigente</th><th>Estado</th><th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading"><td colspan="14" style="text-align:center;">Cargando...</td></tr>
          <tr v-else-if="filtered.length === 0"><td colspan="14" style="text-align:center;">Sin resultados</td></tr>
          <tr v-else v-for="b in filtered" :key="b.id">
            <td>{{ b.id }}</td>

            <td>{{ b.plate }}</td>
            <td>{{ b.model }}</td>
            <td>{{ b.brand }}</td>
            <td>{{ b.fuel }}</td>
            <td>{{ b.year }}</td>
            <td>{{ b.km.toLocaleString() }} km</td>
            <td>{{ b.capacidad }}</td>
            <td>{{ b.fechaRevisionTecnica ?? '' }}</td>
            <td>{{ b.fechaExtintor ?? '' }}</td>
            <td>{{ b.extintorVigente ? 'Sí' : 'No' }}</td>
            <td><StatusBadge :status="b.estado" /></td>
            <td style="display:flex; gap:.5rem">
              <button class="row-action" @click="openEdit(b)" title="Editar">✏️</button>
              <button class="row-action danger" @click="openRemoveConfirmation(b)" title="Eliminar">🗑</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Formulario -->
    <div v-if="showForm" class="backdrop">
      <div class="card" style="width:min(780px,92vw);">
        <h3 style="margin-top:0">{{ editing ? 'Editar Bus' : 'Nuevo Bus' }}</h3>

        <div class="grid" style="grid-template-columns:1fr 1fr; gap:1rem">
          <div><label class="label">Patente</label><input class="input" v-model="form.plate" required /></div>
          <div><label class="label">Modelo</label><input class="input" v-model="form.model" required /></div>
          <div><label class="label">Marca</label><input class="input" v-model="form.brand" required /></div>
          <div>
            <label class="label">Combustible</label>
            <select class="select" v-model="form.fuel">
              <option value="DIESEL">DIESEL</option>
              <option value="GASOLINA">GASOLINA</option>
              <option value="GAS">GAS</option>
              <option value="ELECTRICO">ELÉCTRICO</option>
            </select>
          </div>
          <div><label class="label">Año</label><input class="input" type="number" v-model.number="form.year" min="1990" :max="new Date().getFullYear()+1" /></div>
          <div><label class="label">Kilómetros</label><input class="input" type="number" v-model.number="form.km" min="0" /></div>
          <div><label class="label">Capacidad (pasajeros)</label><input class="input" type="number" v-model.number="form.capacidad" min="1" /></div>
          <div><label class="label">Fecha Revisión Técnica</label><input class="input" type="date" v-model="form.fechaRevisionTecnica" /></div>
          <div><label class="label">Fecha Extintor</label><input class="input" type="date" v-model="form.fechaExtintor" /></div>
          <div>
            <label class="label">Estado</label>
            <select class="select" v-model="form.estado">
              <option value="OPERATIVO">OPERATIVO</option>
              <option value="MANTENIMIENTO">MANTENIMIENTO</option>
              <option value="FUERA DE SERVICIO">FUERA DE SERVICIO</option>
            </select>
          </div>
        </div>

        <p v-if="validationError" class="error">{{ validationError }}</p>
        <div style="display:flex; gap:.5rem; justify-content:flex-end; margin-top:1.25rem">
          <button class="btn" style="background:#6b7280" @click="showForm=false">Cancelar</button>
          <button class="btn" @click="saveBus">Guardar</button>
        </div>
      </div>
    </div>

    <!-- Modal Eliminar -->
    <div v-if="showConfirmModal" class="backdrop">
      <div class="card" style="width:min(420px, 90vw); text-align:center;">
        <h3 style="color:#dc2626">Confirmar Eliminación</h3>
        <p v-if="busToDelete">¿Eliminar bus con Patente: <strong class="code">{{ busToDelete.plate }}</strong>?</p>
        <div style="display:flex; justify-content:center; gap:1rem; margin-top:1.5rem;">
          <button class="btn" style="background:#6b7280" @click="cancelRemoval">Cancelar</button>
          <button class="btn danger-btn" @click="removeBus">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid { display: grid; gap: 1rem; }
.card { background:#fff; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,.08); padding:1rem; }
.filters { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; align-items:end; }
.label { font-size:.85rem; font-weight:600; color:#4b5563; margin-bottom:.35rem; }
.input,.select { width:100%; border:1px solid #e5e7eb; border-radius:10px; padding:.5rem .75rem; }
.input:focus,.select:focus { border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,.25); }
.btn { background:#2563eb; color:#fff; border:none; border-radius:10px; padding:.55rem .9rem; font-weight:600; cursor:pointer; }
.btn:hover { background:#1d4ed8; }
.danger-btn { background:#dc2626; color:#fff; border:none; border-radius:10px; padding:.55rem .9rem; font-weight:600; cursor:pointer; }
.danger-btn:hover { background:#b91c1c; }
.table { width:100%; border-collapse:collapse; }
.table th, .table td { border-top:1px solid #e5e7eb; padding:.65rem .75rem; font-size:.9rem; }
.table th { background:#f3f4f6; color:#374151; }
.table tr:hover { background:#f9fafb; }
.code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace; }
.row-action { background:transparent; border:1px solid #e5e7eb; border-radius:8px; padding:.25rem .5rem; cursor:pointer; }
.row-action:hover { background:#f3f4f6; }
.row-action.danger:hover { background:#fee2e2; }
.error { color:#dc2626; margin-top:.75rem; text-align:right; }
.backdrop { position:fixed; inset:0; background:rgba(0,0,0,.4); display:grid; place-items:center; z-index:50; }
</style>
