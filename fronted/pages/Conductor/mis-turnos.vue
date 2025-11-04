<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

definePageMeta({ layout: 'admin' })

type APITurno = {
  id: number
  id_usuario: number
  fecha: string | null
  hora_inicio: string
  hora_fin: string
  bus: string | null
  estado: string | null
  titulo: string | null
  descripcion: string | null
}

type Row = {
  id: number
  bus: string
  inicio: string
  fin: string
  estado: string
  estadoDesc: string
  titulo: string
  descripcion: string
}

const { user, refresh } = useAuth()
const from = ref(''); const to = ref('')
const loading = ref(false)
const items = ref<Row[]>([])
const editingId = ref<number|null>(null)
const editDescripcion = ref('')
const savingEdit = ref(false)

function fmtDT(v: string){const d=new Date(v);return isNaN(d.getTime())?'—':d.toLocaleString()}
function badgeClass(e:string){e=(e||'').toUpperCase();if(e==='PROGRAMADO')return'badge blue';if(e==='EN CURSO')return'badge yellow';if(e==='COMPLETADO')return'badge green';if(e==='CANCELADO')return'badge red';return'badge'}
function estadoHelp(e:string){e=(e||'').toUpperCase();return e==='PROGRAMADO'?'Turno creado':e==='EN CURSO'?'Turno activo':e==='COMPLETADO'?'Turno finalizado':e==='CANCELADO'?'No se ejecuta':''}

async function loadTurnos () {
  loading.value = true
  try {
    // asegúrate de tener el usuario cargado
    if (user.value === undefined) await refresh(true)

    const query:any = {
      from: from.value || undefined,
      to:   to.value   || undefined,
    }
    // Fallback: si el endpoint no recibe auth context, mandamos id_usuario
    if (user.value?.id) query.id_usuario = user.value.id

    const r = await $fetch<{items: APITurno[]}>('/api/conductor/turnos', {
      query,
      credentials: 'include', // 🔑 envía cookie httpOnly
    })

    const list = (r.items || []).map(t => ({
      id: t.id,
      bus: t.bus || '—',                  // SOLO patente
      inicio: t.hora_inicio,
      fin: t.hora_fin,
      estado: (t.estado || '—').toUpperCase(),
      estadoDesc: estadoHelp(t.estado || ''),
      titulo: t.titulo || '—',
      descripcion: t.descripcion || '',
    }))

    list.sort((a,b)=> new Date(b.inicio).getTime() - new Date(a.inicio).getTime())
    items.value = list
  } catch (e:any) {
    console.error('Mis turnos error:', e?.data || e)
    items.value = []
    // feedback visible
    window.alert(e?.data?.message || 'No se pudieron cargar tus turnos (¿sesión iniciada?)')
  } finally {
    loading.value = false
  }
}

function startEditDescripcion(r:Row){editingId.value=r.id;editDescripcion.value=r.descripcion||''}
function cancelEdit(){editingId.value=null;editDescripcion.value=''}
async function saveDescripcion(){
  if (!editingId.value) return
  savingEdit.value = true
  try {
    await $fetch(`/api/turnos/${editingId.value}`, {
      method:'PUT',
      body:{ descripcion: editDescripcion.value || null } as any,
      credentials:'include',
    })
    await loadTurnos()
    cancelEdit()
    alert('Descripción actualizada')
  } catch(e:any){
    alert(e?.data?.message || 'No se pudo actualizar la descripción')
  } finally {
    savingEdit.value = false
  }
}

onMounted(loadTurnos)
</script>

<template>
  <div class="grid">
    <div class="card">
      <h3>Mis Turnos</h3>
      <div class="filters">
        <div>
          <label class="label">Desde</label>
          <input class="input" type="datetime-local" v-model="from" />
        </div>
        <div>
          <label class="label">Hasta</label>
          <input class="input" type="datetime-local" v-model="to" />
        </div>
        <div style="display:flex;align-items:end;justify-content:end">
          <button class="btn" @click="loadTurnos">Filtrar</button>
        </div>
      </div>
    </div>

    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th>#</th><th>Patente</th><th>Inicio</th><th>Fin</th><th>Estado</th><th>Título</th><th>Descripción</th><th style="width:160px">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading"><td colspan="8" style="text-align:center;color:#6b7280">Cargando…</td></tr>
          <tr v-else-if="!items.length"><td colspan="8" class="empty">No tienes turnos</td></tr>

          <tr v-else v-for="t in items" :key="t.id">
            <td>{{ t.id }}</td>
            <td>{{ t.bus }}</td>
            <td>{{ fmtDT(t.inicio) }}</td>
            <td>{{ fmtDT(t.fin) }}</td>
            <td><span :class="badgeClass(t.estado)" :title="t.estadoDesc">{{ t.estado }}</span></td>
            <td>{{ t.titulo }}</td>

            <td v-if="editingId !== t.id">{{ t.descripcion || '—' }}</td>
            <td v-else>
              <textarea class="textarea" rows="6" v-model="editDescripcion" placeholder="Describe qué pasó en el turno…"></textarea>
              <div class="hint">Solo puedes modificar la <strong>descripción</strong>.</div>
            </td>

            <td>
              <template v-if="editingId !== t.id">
                <button class="row-action" @click="startEditDescripcion(t)">✏️ Editar</button>
              </template>
              <template v-else>
                <button class="btn small" :disabled="savingEdit" @click="saveDescripcion">Guardar</button>
                <button class="row-action" @click="cancelEdit">Cancelar</button>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="note">🔒 Como conductor, solo puedes <strong>editar la descripción</strong>.</p>
    </div>
  </div>
</template>

<style scoped>
.grid{display:grid;gap:1rem}.card{background:#fff;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,.08);padding:1rem}
.filters{display:grid;grid-template-columns:1fr 1fr 160px;gap:1rem;align-items:end}
.label{font-weight:600;color:#374151;font-size:.9rem}.input,.textarea{width:100%;border:1px solid #d1d5db;border-radius:10px;padding:.5rem .75rem;font-size:.9rem}
.textarea{resize:vertical;min-height:120px}.input:focus,.textarea:focus{border-color:#2563eb;box-shadow:0 0 0 2px rgba(37,99,235,.2);outline:none}
.table{width:100%;border-collapse:collapse}.table th,.table td{border-top:1px solid #e5e7eb;padding:.65rem .75rem;font-size:.9rem;vertical-align:top}
.table th{background:#f3f4f6;color:#374151}.btn{background:#2563eb;color:#fff;border:none;border-radius:8px;padding:.55rem 1rem;font-weight:600;cursor:pointer}
.btn:hover{background:#1d4ed8}.btn.small{padding:.35rem .8rem;font-size:.85rem}.row-action{background:transparent;border:1px solid #e5e7eb;border-radius:8px;padding:.35rem .6rem;cursor:pointer}
.row-action:hover{background:#f3f4f6}.empty{text-align:center;color:#6b7280;padding:1rem}.note{margin-top:.75rem;color:#6b7280;font-size:.9rem}.hint{margin-top:.35rem;font-size:.8rem;color:#6b7280}
.badge{display:inline-block;padding:.25rem .6rem;border-radius:999px;font-weight:700;font-size:.78rem}
.badge.blue{background:#dbeafe;color:#1e40af}.badge.yellow{background:#fef9c3;color:#92400e}.badge.green{background:#dcfce7;color:#166534}.badge.red{background:#fee2e2;color:#991b1b}
</style>
