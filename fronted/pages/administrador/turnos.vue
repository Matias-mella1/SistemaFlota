
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
definePageMeta({
  layout: 'admin',
})
type Turno = {
  id: number
  usuarioId: number
  usuarioNombre: string
  busId: number
  busLabel: string
  inicio: string | Date
  fin: string | Date
  estado: string
  titulo: string
  descripcion: string
}

const from = ref('')
const to = ref('')
const qUsuario = ref('') // filtro por nombre de conductor
const loading = ref(false)
const items = ref<Turno[]>([])

// cargar todos los turnos (puedes filtrar por rango en backend si quieres)
async function loadTurnos () {
  loading.value = true
  try {
    const query: any = {}
    if (from.value) query.from = from.value
    if (to.value)   query.to = to.value
    const r = await $fetch<{ items: Turno[] }>('/api/turnos', { query })
    items.value = r.items
  } finally {
    loading.value = false
  }
}

onMounted(loadTurnos)

// Agrupar por conductor (usuarioId)
const grupos = computed(() => {
  // 1) filtro simple por nombre (front)
  let rows = items.value
  if (qUsuario.value.trim()) {
    const q = qUsuario.value.trim().toLowerCase()
    rows = rows.filter(t => (t.usuarioNombre || '').toLowerCase().includes(q))
  }

  // 2) agrupar
  const map = new Map<number, { usuarioId: number; usuarioNombre: string; turnos: Turno[] }>()
  for (const t of rows) {
    if (!map.has(t.usuarioId)) {
      map.set(t.usuarioId, { usuarioId: t.usuarioId, usuarioNombre: t.usuarioNombre, turnos: [] })
    }
    map.get(t.usuarioId)!.turnos.push(t)
  }

  // ordenar conductores por nombre
  const list = Array.from(map.values()).sort((a, b) =>
    a.usuarioNombre.localeCompare(b.usuarioNombre, 'es')
  )

  // ordenar turnos por inicio descendente dentro de cada grupo
  for (const g of list) {
    g.turnos.sort((a, b) => new Date(b.inicio).getTime() - new Date(a.inicio).getTime())
  }

  return list
})

// estados de despliegue (acordeón simple)
const open = ref<Record<number, boolean>>({})
function toggle(id: number) {
  open.value[id] = !open.value[id]
}
</script>

<template>
  <div class="grid">
    <div class="card">
      <h3 style="margin:0 0 .75rem 0">Turnos por Conductor</h3>
      <div class="filters" style="grid-template-columns: 1fr 1fr 1fr 120px">
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
        <div>
          <button class="btn" @click="loadTurnos">Recargar</button>
        </div>
      </div>
    </div>

    <div class="card" v-if="loading">
      <div class="skeleton" style="height:36px; margin-bottom:.5rem"></div>
      <div class="skeleton" style="height:36px; margin-bottom:.5rem"></div>
      <div class="skeleton" style="height:36px;"></div>
    </div>

    <div class="card" v-else>
      <template v-if="grupos.length">
        <div v-for="g in grupos" :key="g.usuarioId" style="border:1px solid var(--border); border-radius:12px; margin-bottom:.75rem; overflow:hidden">
          <!-- Cabecera del conductor -->
          <div
            style="display:flex; justify-content:space-between; align-items:center; padding:.8rem 1rem; background:#f9fafb; cursor:pointer"
            @click="toggle(g.usuarioId)"
          >
            <div style="display:flex; gap:.75rem; align-items:center">
              <strong>{{ g.usuarioNombre }}</strong>
              <span class="badge" style="background:#eef; color:#223">{{ g.turnos.length }} turno(s)</span>
            </div>
            <button class="row-action" :title="open[g.usuarioId] ? 'Ocultar' : 'Mostrar'">
              {{ open[g.usuarioId] ? '▼' : '►' }}
            </button>
          </div>

          <!-- Tabla de turnos del conductor -->
          <div v-show="open[g.usuarioId] !== false" style="padding: .5rem 1rem 1rem 1rem">
            <table class="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Bus</th>
                  <th>Inicio</th>
                  <th>Fin</th>
                  <th>Estado</th>
                  <th>Título</th>
                </tr>
              </thead>
              <tbody v-if="g.turnos.length">
                <tr v-for="t in g.turnos" :key="t.id">
                  <td>{{ t.id }}</td>
                  <td>{{ t.busLabel }}</td>
                  <td>{{ new Date(t.inicio).toLocaleString() }}</td>
                  <td>{{ new Date(t.fin).toLocaleString() }}</td>
                  <td>{{ t.estado }}</td>
                  <td>{{ t.titulo || '-' }}</td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr><td colspan="6"><div class="empty">Sin turnos</div></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="empty">No hay turnos para mostrar.</div>
      </template>
    </div>
  </div>
</template>
