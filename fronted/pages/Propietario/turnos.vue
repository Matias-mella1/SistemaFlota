<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

definePageMeta({ layout: 'admin' })

/** ===== Tipos ===== */
type Turno = {
  id: number
  usuarioId: number
  usuarioNombre: string
  busId: number
  busLabel: string
  inicio: string | Date
  fin: string | Date
  estadoId: number | null
  estadoNombre?: string | null
  estadoLabel: string
  titulo: string
  descripcion?: string
}

type ConductorRow = { id:number; nombre:string; estado?:string }
type BusItem      = { id:number; code:number; plate:string; model:string }
type EstadoItem   = { id:number; nombre:string }

/** ===== Filtros y datos ===== */
const from = ref('')
const to   = ref('')
const qUsuario = ref('')

const loading = ref(false)
const items = ref<Turno[]>([])

/** ===== Catálogo de estados =====
 * Se intenta cargar desde /api/turnos/estados.
 * Fallback local (ids oficiales):
 * 1 PROGRAMADO, 2 EN CURSO, 3 COMPLETADO, 4 CANCELADO
 */
const estados = ref<EstadoItem[]>([
  { id:1, nombre:'PROGRAMADO' },
  { id:2, nombre:'EN CURSO' },
  { id:3, nombre:'COMPLETADO' },
  { id:4, nombre:'CANCELADO' },
])

/** Helpers estado <-> id */
const idByName = (name:string) =>
  estados.value.find(e => e.nombre.toUpperCase() === name.toUpperCase())?.id ?? null

const nameById = (id:number|null|undefined) =>
  estados.value.find(e => e.id === id)?.nombre ?? null

/** ===== Catálogos auxiliares ===== */
const conductores = ref<ConductorRow[]>([])
const buses       = ref<BusItem[]>([])

/** ===== Modales (Agregar/Editar) ===== */
const showAdd = ref(false)
const savingAdd = ref(false)
const addForm = ref<{ usuarioId:number|null; busId:number|null; inicio:string; fin:string; titulo:string; estadoId:number }>(
  { usuarioId:null, busId:null, inicio:'', fin:'', titulo:'', estadoId:1 }
)

const showEdit = ref(false)
const savingEdit = ref(false)
const editing = ref<Turno|null>(null)
const editForm = ref<{ busId:number|null; inicio:string; fin:string; titulo:string; estadoId:number }>(
  { busId:null, inicio:'', fin:'', titulo:'', estadoId:1 }
)

/** ===== Utils ===== */
function fmtDT (v: string | Date) {
  const d = new Date(v)
  return isNaN(d.getTime()) ? '—' : d.toLocaleString()
}
function toInputDT (v: string | Date) {
  if (!v) return ''
  const d = new Date(v)
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0,16)
}
function badgeClass(label:string){
  const s = (label||'').toUpperCase()
  if (s==='PROGRAMADO') return 'badge blue'
  if (s==='EN CURSO')   return 'badge yellow'
  if (s==='COMPLETADO') return 'badge green'
  if (s==='CANCELADO')  return 'badge red'
  return 'badge'
}

/** ===== Derivar estado según tiempo (solo si NO está cancelado) ===== */
function deriveEstadoIdByTime(inicio:any, fin:any): number {
  const now = Date.now()
  const i = new Date(inicio).getTime()
  const f = new Date(fin).getTime()
  if (isNaN(i) || isNaN(f)) return idByName('PROGRAMADO') || 1
  if (now < i) return idByName('PROGRAMADO') || 1
  if (now > f) return idByName('COMPLETADO') || 3
  return idByName('EN CURSO') || 2
}

/** ===== Auto-sync de estado con backend =====
 * - Si el estado actual es CANCELADO => nunca se toca automáticamente
 * - Si el estado derivado por tiempo cambia => PUT /api/turnos/:id
 */
async function maybeAutoSync(t: Turno) {
  const canceledId = idByName('CANCELADO') || 4
  if (t.estadoId === canceledId) return

  const derivedId = deriveEstadoIdByTime(t.inicio, t.fin)
  if (derivedId && derivedId !== t.estadoId) {
    try {
      await $fetch(`/api/turnos/${t.id}`, {
        method: 'put',
        body: { id_estado_turno: derivedId } as any
      })
      t.estadoId = derivedId
      t.estadoLabel = nameById(derivedId) || t.estadoLabel
    } catch (e) {
      // Silencioso; si falla reintenta en el próximo ciclo
    }
  }
}

/** ===== Cargas ===== */
async function loadEstados(){
  try {
    const r = await $fetch<{items:EstadoItem[]}>('/api/turnos/estados')
    if (Array.isArray(r?.items) && r.items.length) {
      estados.value = r.items.map(e => ({ id:Number(e.id), nombre:String(e.nombre).toUpperCase() }))
    }
  } catch {/* fallback */}
}

async function loadConductoresActivos () {
  const r = await $fetch<{items:any[]}>('/api/conductor', {
    query: { estado: 'ACTIVO', incluirPropietario: 'false' },
    headers: { 'Cache-Control': 'no-cache' }
  } as any)
  conductores.value = (r.items||[]).map(x=>({ id:x.id, nombre:x.nombre, estado:x.estado }))
}

async function loadBusesOperativos () {
  const r = await $fetch<{items:any[]}>('/api/buses', {
    query: { estado: 'OPERATIVO' },
    headers: { 'Cache-Control': 'no-cache' }
  } as any)
  buses.value = (r.items||[]).map(x=>({ id:x.id, code:x.code, plate:x.plate, model:x.model }))
}

async function loadTurnos () {
  loading.value = true
  try {
    const query:any = {}
    if (from.value) query.from = from.value
    if (to.value)   query.to   = to.value

    const r = await $fetch<{ items: any[] }>('/api/turnos', { query })
    items.value = (r.items||[]).map(t => {
      const estadoId = Number(t.id_estado_turno ?? t.estado_id ?? null)
      const estadoNombre = String(t.estado_turno ?? t.estado ?? '')

      const label =
        nameById(estadoId) ||
        (estadoNombre ? estadoNombre.toUpperCase() : 'PROGRAMADO')

      return {
        id: Number(t.id),
        usuarioId: Number(t.id_usuario ?? t.usuarioId),
        usuarioNombre: String(t.usuario_nombre ?? t.usuarioNombre ?? ''),
        busId: Number(t.id_bus ?? t.busId),
        busLabel: String(t.bus_label ?? t.bus?.patente ?? t.busLabel ?? ''),
        inicio: t.inicio, fin: t.fin,
        estadoId, estadoNombre,
        estadoLabel: label,
        titulo: String(t.titulo ?? ''),
        descripcion: String(t.descripcion ?? '')
      } as Turno
    })

    // Primera pasada de autosync al cargar
    for (const t of items.value) await maybeAutoSync(t)
  } finally {
    loading.value = false
  }
}

/** ===== Intervalo de auto-actualización ===== */
let tick: number | undefined
onMounted(async () => {
  await Promise.all([loadEstados(), loadTurnos()])
  tick = window.setInterval(async () => {
    for (const t of items.value) await maybeAutoSync(t)
  }, 60_000) // cada 60s
})
onUnmounted(() => { if (tick) clearInterval(tick) })

/** ===== Agregar turno ===== */
function openAddTurno(){
  addForm.value = { usuarioId:null, busId:null, inicio:'', fin:'', titulo:'', estadoId: idByName('PROGRAMADO') || 1 }
  showAdd.value = true
  Promise.all([loadConductoresActivos(), loadBusesOperativos()]).catch(()=>{})
}
async function saveAddTurno(){
  const f = addForm.value
  if (!f.usuarioId || !f.busId || !f.inicio || !f.fin) return alert('Completa conductor, bus, inicio y fin')
  if (!(new Date(f.inicio) < new Date(f.fin))) return alert('Inicio debe ser menor que fin')

  savingAdd.value = true
  try {
    await $fetch('/api/turnos', {
      method: 'post',
      body: {
        id_usuario: f.usuarioId,             // 👈 obligatorio
        id_bus: f.busId,
        inicio: f.inicio,
        fin: f.fin,
        titulo: f.titulo || undefined,
        id_estado_turno: f.estadoId          // 👈 estado por ID
      } as any
    })
    showAdd.value = false
    await loadTurnos()
    alert('Turno agregado')
  } catch (e:any) {
    alert(e?.data?.message || 'No se pudo agregar el turno')
  } finally { savingAdd.value = false }
}

/** ===== Editar turno ===== */
function openEditTurno(t:Turno){
  editing.value = t
  editForm.value = {
    busId: t.busId,
    inicio: toInputDT(t.inicio),
    fin: toInputDT(t.fin),
    titulo: t.titulo || '',
    estadoId: t.estadoId ?? (idByName(t.estadoLabel) || idByName('PROGRAMADO') || 1)
  }
  showEdit.value = true
  loadBusesOperativos()
}
async function saveEditTurno(){
  if (!editing.value) return
  const f = editForm.value
  if (!f.busId || !f.inicio || !f.fin) return alert('Completa bus, inicio y fin')
  if (!(new Date(f.inicio) < new Date(f.fin))) return alert('Inicio debe ser menor que fin')

  savingEdit.value = true
  try {
    await $fetch(`/api/turnos/${editing.value.id}`, {
      method: 'put',
      body: {
        id_bus: f.busId,
        inicio: f.inicio,
        fin: f.fin,
        titulo: f.titulo || undefined,
        id_estado_turno: f.estadoId
      } as any
    })
    showEdit.value = false
    editing.value = null
    await loadTurnos()
    alert('Turno actualizado')
  } catch (e:any) {
    alert(e?.data?.message || 'No se pudo actualizar el turno')
  } finally { savingEdit.value = false }
}

async function cancelarTurno(t:Turno){
  const cancelId = idByName('CANCELADO') || 4
  const enCursoId = idByName('EN CURSO') || 2
  const completadoId = idByName('COMPLETADO') || 3

  // ❌ Bloquea cancelación si el turno está en curso o completado
  if (t.estadoId === enCursoId || t.estadoId === completadoId) {
    alert('No se puede cancelar un turno en curso o completado.')
    return
  }

  if (!confirm('¿Cancelar este turno?')) return

  try {
    await $fetch(`/api/turnos/${t.id}`, {
      method: 'put',
      body: { id_estado_turno: cancelId } as any
    })
    t.estadoId = cancelId
    t.estadoLabel = 'CANCELADO'
  } catch (e:any) {
    alert(e?.data?.message || 'No se pudo cancelar el turno')
  }
}

/** ===== Agrupar por conductor (UI) ===== */
const grupos = computed(() => {
  let rows = items.value
  if (qUsuario.value.trim()) {
    const q = qUsuario.value.trim().toLowerCase()
    rows = rows.filter(t => (t.usuarioNombre||'').toLowerCase().includes(q))
  }
  const map = new Map<number, { usuarioId:number; usuarioNombre:string; turnos:Turno[] }>()
  for (const t of rows) {
    if (!map.has(t.usuarioId)) map.set(t.usuarioId, { usuarioId:t.usuarioId, usuarioNombre:t.usuarioNombre, turnos:[] })
    map.get(t.usuarioId)!.turnos.push(t)
  }
  const list = Array.from(map.values()).sort((a,b)=> a.usuarioNombre.localeCompare(b.usuarioNombre,'es'))
  for (const g of list) g.turnos.sort((a,b)=> new Date(b.inicio).getTime() - new Date(a.inicio).getTime())
  return list
})
const open = ref<Record<number, boolean>>({})
function toggle(id:number){ open.value[id] = !open.value[id] }
</script>

<template>
  <div class="grid">
    <!-- Filtros -->
    <div class="card">
      <h3 style="margin:0 0 .75rem 0">Turnos por Conductor</h3>
      <div class="filters" style="grid-template-columns: 1fr 1fr 1fr 160px">
        <div>
          <label class="label">Conductor</label>
          <input class="input" placeholder="Nombre del conductor" v-model="qUsuario" />
        </div>
        <div>
          <label class="label">Desde</label>
          <input class="input" type="datetime-local" v-model="from" />
        </div>
        <div>
          <label class="label">Hasta</label>
          <input class="input" type="datetime-local" v-model="to" />
        </div>
        <div style="display:flex; align-items:end; justify-content:end;">
          <button class="btn" @click="openAddTurno">+ Agregar turno</button>
        </div>
      </div>
    </div>

    <!-- Listado -->
    <div class="card" v-if="loading"><div class="skeleton" style="height:36px"></div></div>

    <div class="card" v-else>
      <template v-if="grupos.length">
        <div v-for="g in grupos" :key="g.usuarioId" style="border:1px solid #ddd;border-radius:12px;margin-bottom:.75rem;">
          <div style="background:#f9fafb;padding:.8rem 1rem;display:flex;justify-content:space-between;align-items:center;cursor:pointer" @click="toggle(g.usuarioId)">
            <div><strong>{{ g.usuarioNombre }}</strong> <span class="badge" style="margin-left:.5rem">{{ g.turnos.length }} turno(s)</span></div>
            <span>{{ open[g.usuarioId]!==false ? '▼' : '►' }}</span>
          </div>

          <div v-show="open[g.usuarioId]!==false" style="padding:1rem">
            <table class="table">
              <thead>
                <tr>
                  <th>#</th><th>Bus</th><th>Inicio</th><th>Fin</th><th>Estado</th><th>Título</th><th style="width:180px"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="t in g.turnos" :key="t.id">
                  <td>{{ t.id }}</td>
                  <td>{{ t.busLabel }}</td>
                  <td>{{ fmtDT(t.inicio) }}</td>
                  <td>{{ fmtDT(t.fin) }}</td>
                  <td><span :class="badgeClass(t.estadoLabel)">{{ t.estadoLabel }}</span></td>
                  <td>{{ t.titulo || '-' }}</td>
                  <td style="display:flex;gap:.5rem">
                    <button class="row-action" title="Editar" @click.stop="openEditTurno(t)">✏️</button>
                    <button class="row-action danger" title="Cancelar" @click.stop="cancelarTurno(t)">🚫</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="empty">No hay turnos para mostrar.</div>
      </template>
    </div>

    <!-- Modal Agregar -->
    <div v-if="showAdd" class="backdrop">
      <div class="card" style="width:min(560px,92vw);">
        <h3 style="margin-top:0">Agregar turno</h3>
        <div class="grid" style="grid-template-columns:1fr 1fr;gap:1rem">
          <div style="grid-column:1/-1">
            <label class="label">Conductor</label>
            <select class="select" v-model.number="addForm.usuarioId">
              <option :value="null" disabled>Selecciona conductor</option>
              <option v-for="c in conductores" :key="c.id" :value="c.id">{{ c.nombre }}</option>
            </select>
          </div>
          <div style="grid-column:1/-1">
            <label class="label">Bus</label>
            <select class="select" v-model.number="addForm.busId">
              <option :value="null" disabled>Selecciona bus</option>
              <option v-for="b in buses" :key="b.id" :value="b.id">{{ b.plate }} ({{ b.model }})</option>
            </select>
          </div>
          <div><label class="label">Inicio</label><input class="input" type="datetime-local" v-model="addForm.inicio" /></div>
          <div><label class="label">Fin</label><input class="input" type="datetime-local" v-model="addForm.fin" /></div>
          <div>
            <label class="label">Estado</label>
            <select class="select" v-model.number="addForm.estadoId">
              <option v-for="e in estados" :key="e.id" :value="e.id">{{ e.nombre }}</option>
            </select>
          </div>
          <div><label class="label">Título</label><input class="input" v-model="addForm.titulo" /></div>
        </div>
        <div style="display:flex;gap:.5rem;justify-content:flex-end;margin-top:1rem">
          <button class="row-action" @click="showAdd=false">Cancelar</button>
          <button class="btn" :disabled="savingAdd" @click="saveAddTurno">Guardar</button>
        </div>
      </div>
    </div>

    <!-- Modal Editar -->
    <div v-if="showEdit" class="backdrop">
      <div class="card" style="width:min(560px,92vw);">
        <h3 style="margin-top:0">Editar turno</h3>
        <div class="grid" style="grid-template-columns:1fr 1fr;gap:1rem">
          <div style="grid-column:1/-1">
            <label class="label">Bus</label>
            <select class="select" v-model.number="editForm.busId">
              <option v-for="b in buses" :key="b.id" :value="b.id">{{ b.plate }} ({{ b.model }})</option>
            </select>
          </div>
          <div><label class="label">Inicio</label><input class="input" type="datetime-local" v-model="editForm.inicio" /></div>
          <div><label class="label">Fin</label><input class="input" type="datetime-local" v-model="editForm.fin" /></div>
          <div>
            <label class="label">Estado</label>
            <select class="select" v-model.number="editForm.estadoId">
              <option v-for="e in estados" :key="e.id" :value="e.id">{{ e.nombre }}</option>
            </select>
          </div>
          <div style="grid-column:1/-1"><label class="label">Título</label><input class="input" v-model="editForm.titulo" /></div>
        </div>
        <div style="display:flex;gap:.5rem;justify-content:flex-end;margin-top:1rem">
          <button class="row-action" @click="showEdit=false">Cancelar</button>
          <button class="btn" :disabled="savingEdit" @click="saveEditTurno">Guardar</button>
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
.input,.select{width:100%;border:1px solid #e5e7eb;border-radius:10px;padding:.5rem .75rem}
.input:focus,.select:focus{border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,.25)}
.btn{background:#2563eb;color:#fff;border:none;border-radius:10px;padding:.55rem .9rem;font-weight:600;cursor:pointer}
.btn:hover{background:#1d4ed8}
.table{width:100%;border-collapse:collapse}
.table th,.table td{border-top:1px solid #e5e7eb;padding:.65rem .75rem;font-size:.9rem}
.table th{background:#f3f4f6;color:#374151}
.row-action{background:transparent;border:1px solid #e5e7eb;border-radius:8px;padding:.25rem .5rem;cursor:pointer}
.row-action:hover{background:#f3f4f6}
.row-action.danger:hover{background:#fee2e2}
.badge{background:#eef;padding:.25rem .5rem;border-radius:999px;font-size:.75rem;font-weight:700}
.badge.blue{background:#dbeafe;color:#1e40af}
.badge.yellow{background:#fef9c3;color:#92400e}
.badge.green{background:#dcfce7;color:#166534}
.badge.red{background:#fee2e2;color:#991b1b}
.backdrop{position:fixed;inset:0;background:rgba(0,0,0,.45);display:grid;place-items:center;z-index:50}
.empty{text-align:center;color:#6b7280;font-weight:600;padding:1rem}
.skeleton{background:linear-gradient(90deg,#f3f3f3 25%,#e0e0e0 50%,#f3f3f3 75%);background-size:200% 100%;animation:loading 1.5s infinite}
@keyframes loading{0%{background-position:200% 0}100%{background-position:-200% 0}}
</style>
