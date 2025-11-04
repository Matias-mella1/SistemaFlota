<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

definePageMeta({ layout: 'admin' })

/* ===================== Tipos ===================== */
type ConductorRow = {
  id: number
  rut: string
  nombre: string
  email: string
  telefono: string
  licencia: string
  estado: 'ACTIVO' | 'INACTIVO' | string
  roles: string[]
}

type BusItem = { id:number; code:number; plate:string; model:string }

type TurnoRow = {
  id:number
  usuarioId:number
  usuarioNombre?:string
  busId:number
  busLabel:string
  inicio:string | Date
  fin:string | Date
  estado:string
  titulo:string
  descripcion:string
}

/* ===================== Estado: filtros ===================== */
const q = ref('')
const estado = ref('')
const incluirPropietario = ref(true)

/* ===================== Estado: tabla ===================== */
const rows = ref<ConductorRow[]>([])
const loading = ref(false)
const errorMsg = ref('')

/* ===================== Modal: Asignar ===================== */
const showAssign = ref(false)
const savingAssign = ref(false)
const buses = ref<BusItem[]>([])
const assignForm = ref<{ usuarioId:number|null; busId:number|null; inicio:string; fin:string; titulo:string }>({
  usuarioId: null, busId: null, inicio: '', fin: '', titulo: ''
})

/* ===================== Modal: Editar turnos ===================== */
const showEdit = ref(false)
const loadingTurns = ref(false)
const editConductor = ref<ConductorRow | null>(null)
const editTurns = ref<TurnoRow[]>([])
const errorTurns = ref('')

/* Inline edit */
const editingId = ref<number|null>(null)
const editForm = ref<{ id:number|null; busId:number|null; inicio:string; fin:string; titulo:string }>({
  id: null, busId: null, inicio: '', fin: '', titulo: ''
})
const savingEdit = ref(false)

/* ===================== Utils ===================== */
function toInputDT(v: string | Date) {
  if (!v) return ''
  const d = new Date(v)
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0,16)
}
function fmtDT (v: string | Date) {
  const d = new Date(v)
  return isNaN(d.getTime()) ? '—' : d.toLocaleString()
}
function busLabelOf(x:any) {
  // trata de unificar etiqueta de bus: CODE - PLATE (MODEL)
  const plate = x?.plate ?? x?.patente ?? x?.bus?.patente
  const code  = x?.code  ?? x?.bus?.code
  const model = x?.model ?? x?.modelo ?? x?.bus?.modelo
  if (code && plate && model) return `${code} - ${plate} (${model})`
  if (code && plate) return `${code} - ${plate}`
  if (plate && model) return `${plate} (${model})`
  return plate || (code ? `#${code}` : model || '—')
}
function badgeClass(s:string) {
  const e = (s||'').toUpperCase()
  if (e==='PROGRAMADO' || e==='ASIGNADO') return 'badge blue'
  if (e==='EN CURSO') return 'badge yellow'
  if (e==='COMPLETADO') return 'badge green'
  if (e==='CANCELADO') return 'badge red'
  return 'badge'
}

/* ===================== Cargas ===================== */
async function loadConductores() {
  loading.value = true
  errorMsg.value = ''
  try {
    const r = await $fetch<{items:ConductorRow[]}>('/api/conductor', {
      query: {
        q: q.value || undefined,
        estado: estado.value || undefined,
        incluirPropietario: incluirPropietario.value ? 'true' : 'false'
      },
      headers: { 'Cache-Control': 'no-cache' },
      credentials: 'include',
    } as any)
    rows.value = r.items || []
  } catch (e:any) {
    errorMsg.value = e?.data?.message || 'No se pudo cargar conductores'
    rows.value = []
  } finally {
    loading.value = false
  }
}

async function loadBusesOperativos() {
  if (buses.value.length) return
  try {
    const r = await $fetch<{items:any[]}>('/api/buses', {
      query: { estado: 'OPERATIVO' },
      headers: { 'Cache-Control': 'no-cache' },
      credentials: 'include',
    } as any)
    buses.value = (r.items || []).map(x => ({ id:x.id, code:x.code, plate:x.plate ?? x.patente, model:x.model ?? x.modelo }))
  } catch {
    buses.value = []
  }
}

/* ===================== Asignar turno ===================== */
function openAssign (c: ConductorRow) {
  assignForm.value = { usuarioId: c.id, busId: null, inicio: '', fin: '', titulo: '' }
  showAssign.value = true
  loadBusesOperativos()
}

async function saveAssign () {
  const f = assignForm.value
  if (!f.usuarioId || !f.busId || !f.inicio || !f.fin) {
    alert('Completa conductor, bus, inicio y fin')
    return
  }
  if (!(new Date(f.inicio) < new Date(f.fin))) {
    alert('Inicio debe ser menor que fin')
    return
  }
  savingAssign.value = true
  try {
    await $fetch('/api/turnos', {
      method: 'POST',
      body: { id_usuario: f.usuarioId, id_bus: f.busId, inicio: f.inicio, fin: f.fin, titulo: f.titulo || undefined } as any,
      credentials: 'include',
    })
    showAssign.value = false
    // si estás editando ese mismo conductor, refresca su lista
    if (showEdit.value && editConductor.value?.id === f.usuarioId) {
      await loadTurnsOf(editConductor.value.id)
    }
    alert('Turno asignado')
  } catch (e:any) {
    alert(e?.data?.message || 'No se pudo asignar el turno')
  } finally {
    savingAssign.value = false
  }
}

/* ===================== Editar turnos de un conductor ===================== */
async function openEdit (c: ConductorRow) {
  editConductor.value = c
  editingId.value = null
  editTurns.value = []
  errorTurns.value = ''
  showEdit.value = true
  await Promise.all([ loadTurnsOf(c.id), loadBusesOperativos() ])
}

async function loadTurnsOf (id_usuario:number) {
  loadingTurns.value = true
  errorTurns.value = ''
  try {
    const r = await $fetch<{items:any[]}>('/api/conductor/turnos', {
      // ⚠️ tu endpoint espera id_usuario, no usuarioId
      query: { id_usuario },
      headers: { 'Cache-Control': 'no-cache' },
      credentials: 'include',
    } as any)

    editTurns.value = (r.items || []).map(t => ({
      id: Number(t.id ?? t.id_turno),
      usuarioId: Number(t.id_usuario ?? id_usuario),
      busId: Number(t.id_bus ?? t.busId ?? 0),
      busLabel: busLabelOf({ plate:t.bus || t.busLabel }),
      inicio: t.hora_inicio ?? t.inicio,
      fin: t.hora_fin ?? t.fin,
      estado: String(t.estado ?? t.estado_turno ?? '—'),
      titulo: String(t.titulo ?? ''),
      descripcion: String(t.descripcion ?? ''),
    } as TurnoRow))
  } catch (e:any) {
    errorTurns.value = e?.data?.message || 'No se pudieron cargar los turnos'
    editTurns.value = []
  } finally {
    loadingTurns.value = false
  }
}

/* ===================== Inline edit de turno ===================== */
function startEdit (t: TurnoRow) {
  editingId.value = t.id
  editForm.value = {
    id: t.id,
    busId: t.busId || null,
    inicio: toInputDT(t.inicio),
    fin: toInputDT(t.fin),
    titulo: t.titulo || ''
  }
}
function cancelEditInline () {
  editingId.value = null
  editForm.value = { id: null, busId: null, inicio: '', fin: '', titulo: '' }
}
async function saveEditInline () {
  const f = editForm.value
  if (!f.id || !f.busId || !f.inicio || !f.fin) {
    alert('Completa bus, inicio y fin')
    return
  }
  if (!(new Date(f.inicio) < new Date(f.fin))) {
    alert('Inicio debe ser menor que fin')
    return
  }
  savingEdit.value = true
  try {
    await $fetch(`/api/turnos/${f.id}`, {
      method: 'PUT',
      body: { id_bus: f.busId, inicio: f.inicio, fin: f.fin, titulo: f.titulo || undefined } as any,
      credentials: 'include',
    })
    if (editConductor.value) await loadTurnsOf(editConductor.value.id)
    cancelEditInline()
    alert('Turno actualizado')
  } catch (e:any) {
    alert(e?.data?.message || 'No se pudo actualizar')
  } finally {
    savingEdit.value = false
  }
}

async function removeTurno (turnoId:number) {
  if (!confirm('¿Eliminar turno?')) return
  try {
    await $fetch(`/api/turnos/${turnoId}`, { method: 'DELETE', credentials: 'include' } as any)
    if (editConductor.value) await loadTurnsOf(editConductor.value.id)
  } catch (e:any) {
    alert(e?.data?.message || 'No se pudo eliminar el turno')
  }
}

/* ===================== Hooks ===================== */
onMounted(loadConductores)

// Debounce filtros
let tHandle: any
watch([q, estado, incluirPropietario], () => {
  clearTimeout(tHandle)
  tHandle = setTimeout(loadConductores, 300)
})
</script>

<template>
  <div class="grid">
    <!-- Filtros -->
    <div class="card">
      <h3 style="margin:0 0 .75rem 0">Conductores</h3>
      <div class="filters" style="grid-template-columns: 1fr 180px 220px">
        <div>
          <label class="label">Buscar</label>
          <input class="input" placeholder="Nombre, email o RUT" v-model="q" />
        </div>
        <div>
          <label class="label">Estado</label>
          <select class="select" v-model="estado">
            <option value="">Todos</option>
            <option>ACTIVO</option>
            <option>INACTIVO</option>
          </select>
        </div>
        <div style="display:flex;align-items:end;gap:.5rem">
          <input id="incluye" type="checkbox" v-model="incluirPropietario" />
          <label for="incluye" class="label" style="margin:0">Incluir propietarios</label>
        </div>
      </div>
      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    </div>

    <!-- Tabla conductores -->
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th>#</th><th>RUT/Usuario</th><th>Nombre</th><th>Email</th>
            <th>Teléfono</th><th>Licencia</th><th>Estado</th><th>Roles</th><th style="width:260px"></th>
          </tr>
        </thead>

        <!-- Cargando -->
        <tbody v-if="loading">
          <tr v-for="i in 3" :key="i"><td colspan="9"><div class="skeleton" style="height:36px"></div></td></tr>
        </tbody>

        <!-- Datos -->
        <tbody v-else-if="rows.length">
          <tr v-for="c in rows" :key="c.id">
            <td>{{ c.id }}</td>
            <td class="code">{{ c.rut }}</td>
            <td>{{ c.nombre }}</td>
            <td>{{ c.email }}</td>
            <td>{{ c.telefono || '-' }}</td>
            <td>{{ c.licencia || '-' }}</td>
            <td><span class="badge" :class="c.estado==='ACTIVO' ? 'green' : 'red'">{{ c.estado }}</span></td>
            <td>
              <div style="display:flex; gap:.35rem; flex-wrap:wrap">
                <span v-for="r in c.roles" :key="r" class="badge" style="background:#eef; color:#223">{{ r }}</span>
              </div>
            </td>
            <td style="display:flex; gap:.5rem">
              <button type="button" class="btn" @click="openAssign(c)">Asignar turno</button>
              <button type="button" class="row-action" title="Editar turnos" @click="openEdit(c)">✏️</button>
            </td>
          </tr>
        </tbody>

        <!-- Vacío -->
        <tbody v-else>
          <tr><td colspan="9"><div class="empty">No hay conductores.</div></td></tr>
        </tbody>
      </table>
    </div>

    <!-- Modal: Asignar Turno -->
    <div v-if="showAssign" class="backdrop">
      <div class="card" style="width:min(560px,92vw);">
        <h3 style="margin-top:0">Asignar turno</h3>
        <div class="grid" style="grid-template-columns:1fr 1fr; gap:1rem">
          <div style="grid-column:1/-1">
            <label class="label">Bus (solo operativos)</label>
            <select class="select" v-model.number="assignForm.busId">
              <option :value="null" disabled>Selecciona bus</option>
              <option v-for="b in buses" :key="b.id" :value="b.id">
                {{ b.code }} - {{ b.plate }} ({{ b.model }})
              </option>
            </select>
          </div>
          <div>
            <label class="label">Inicio</label>
            <input class="input" type="datetime-local" v-model="assignForm.inicio" />
          </div>
          <div>
            <label class="label">Fin</label>
            <input class="input" type="datetime-local" :min="assignForm.inicio || undefined" v-model="assignForm.fin" />
          </div>
          <div style="grid-column:1/-1">
            <label class="label">Título (opcional)</label>
            <input class="input" placeholder="p.ej. Turno AM" v-model="assignForm.titulo" />
          </div>
        </div>
        <div class="actions">
          <button type="button" class="row-action" @click="showAssign=false">✖ Cancelar</button>
          <button type="button" class="btn" :disabled="savingAssign" @click="saveAssign">💾 Guardar</button>
        </div>
      </div>
    </div>

    <!-- Modal: Editar Turnos -->
    <div v-if="showEdit" class="backdrop">
      <div class="card" style="width:min(980px,96vw);">
        <h3 style="margin-top:0">Editar turnos — {{ editConductor?.nombre }}</h3>

        <div v-if="loadingTurns"><div class="skeleton" style="height:36px"></div></div>
        <p v-if="errorTurns" class="error">{{ errorTurns }}</p>

        <div v-else>
          <table class="table">
            <thead>
              <tr>
                <th>#</th><th>Bus</th><th>Inicio</th><th>Fin</th><th>Estado</th><th>Título</th><th style="width:210px"></th>
              </tr>
            </thead>
            <tbody v-if="editTurns.length">
              <tr v-for="t in editTurns" :key="t.id">
                <td>{{ t.id }}</td>

                <!-- Bus -->
                <td v-if="editingId !== t.id">{{ t.busLabel }}</td>
                <td v-else>
                  <select class="select" v-model.number="editForm.busId">
                    <option v-for="b in buses" :key="b.id" :value="b.id">
                      {{ b.code }} - {{ b.plate }} ({{ b.model }})
                    </option>
                  </select>
                </td>

                <!-- Inicio -->
                <td v-if="editingId !== t.id">{{ fmtDT(t.inicio) }}</td>
                <td v-else><input class="input" type="datetime-local" v-model="editForm.inicio" /></td>

                <!-- Fin -->
                <td v-if="editingId !== t.id">{{ fmtDT(t.fin) }}</td>
                <td v-else><input class="input" type="datetime-local" :min="editForm.inicio || undefined" v-model="editForm.fin" /></td>

                <!-- Estado -->
                <td><span :class="badgeClass(t.estado)">{{ t.estado }}</span></td>

                <!-- Título -->
                <td v-if="editingId !== t.id">{{ t.titulo || '-' }}</td>
                <td v-else><input class="input" v-model="editForm.titulo" placeholder="Turno AM / PM..." /></td>

                <!-- Acciones -->
                <td style="display:flex;gap:.5rem">
                  <template v-if="editingId !== t.id">
                    <button type="button" class="row-action" title="Editar" @click="startEdit(t)">✏️</button>
                    <button type="button" class="row-action danger" title="Eliminar" @click="removeTurno(t.id)">🗑</button>
                  </template>
                  <template v-else>
                    <button type="button" class="btn" :disabled="savingEdit" @click="saveEditInline">Guardar</button>
                    <button type="button" class="row-action" @click="cancelEditInline">Cancelar</button>
                  </template>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr><td colspan="7"><div class="empty">Sin turnos</div></td></tr>
            </tbody>
          </table>
        </div>

        <div class="actions">
          <button type="button" class="row-action" @click="showEdit=false">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid{display:grid;gap:1rem}
.card{background:#fff;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,.08);padding:1rem}
.filters{display:grid;gap:1rem;align-items:end}
.label{font-size:.85rem;font-weight:600;color:#4b5563;margin-bottom:.35rem}
.input,.select,textarea.input{width:100%;border:1px solid #e5e7eb;border-radius:10px;padding:.5rem .75rem}
.input:focus,.select:focus,textarea.input:focus{border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,.25)}
.table{width:100%;border-collapse:collapse}
.table th,.table td{border-top:1px solid #e5e7eb;padding:.65rem .75rem;font-size:.9rem}
.table th{background:#f3f4f6;color:#374151}
.skeleton{width:100%;border-radius:6px;background:linear-gradient(90deg,#f3f3f3 25%,#e0e0e0 50%,#f3f3f3 75%);background-size:200% 100%;animation:loading 1.5s infinite}
@keyframes loading{0%{background-position:200% 0}100%{background-position:-200% 0}}
.badge{display:inline-block;padding:.25rem .5rem;border-radius:999px;font-size:.75rem;font-weight:700}
.badge.blue{background:#dbeafe;color:#1e40af}
.badge.yellow{background:#fef9c3;color:#92400e}
.badge.green{background:#dcfce7;color:#166534}
.badge.red{background:#fee2e2;color:#991b1b}
.row-action{background:transparent;border:1px solid #e5e7eb;border-radius:8px;padding:.25rem .5rem;cursor:pointer}
.row-action:hover{background:#f3f4f6}
.row-action.danger:hover{background:#fee2e2}
.btn{background:#2563eb;color:#fff;border:none;border-radius:10px;padding:.55rem .9rem;font-weight:600;cursor:pointer}
.btn:hover{background:#1d4ed8}
.actions{display:flex;gap:.5rem;justify-content:flex-end;margin-top:1rem}
.empty{color:#6b7280;text-align:center;padding:1rem;font-weight:600}
.error{color:#dc2626;margin-top:.5rem}
.backdrop{position:fixed;inset:0;background:rgba(0,0,0,.45);display:grid;place-items:center;z-index:50}
</style>
