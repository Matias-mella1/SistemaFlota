<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import MecanicoForm from '~/components/MecanicoForm.vue'

definePageMeta({ layout: 'admin' })
type Taller = { id_taller:number; nombre:string }
type Row = {
  id_mecanico:number
  id_taller:number
  nombre:string
  apellido:string
  taller?: Taller | null
}

const filtros = reactive<{ q:string; id_taller:number|'' }>({ q:'', id_taller:'' })
const talleres = ref<Taller[]>([])
const items = ref<Row[]>([])
const loading = ref(false)
const err = ref('')

// cargar talleres una vez
async function loadTalleres() {
  try {
    const res = await $fetch<{ items:Taller[] }>('/api/talleres')
    talleres.value = res.items.map(t => ({ id_taller:t.id_taller, nombre:t.nombre }))
  } catch (e:any) {
    console.error(e)
    err.value = e?.data?.message || 'Error cargando talleres'
  }
}

async function load() {
  loading.value = true; err.value = ''
  try {
    const res = await $fetch<{items:Row[]}>('/api/mecanicos', {
      query: {
        q: filtros.q || undefined,
        id_taller: filtros.id_taller || undefined
      }
    })
    items.value = res.items
  } catch (e:any) {
    err.value = e?.data?.message || 'Error cargando mecánicos'
  } finally {
    loading.value = false
  }
}

// recarga con debounce simple al cambiar filtros
let t: any
watch(() => ({...filtros}), () => {
  clearTimeout(t)
  t = setTimeout(load, 250)
}, { deep:true })

onMounted(async () => {
  await loadTalleres()
  await load()
})

const showForm = ref(false)
const editing = ref<Row|null>(null)

function openCreate(){ editing.value = null; showForm.value = true }
function openEdit(r:Row){ editing.value = { ...r }; showForm.value = true }

async function removeRow(id:number){
  if (!confirm('¿Eliminar mecánico?')) return
  try {
    await $fetch(`/api/mecanicos/${id}`, { method:'DELETE' } as any)
    await load()
  } catch (e:any) {
    alert(e?.data?.message || 'No se pudo eliminar')
  }
}

async function save(data:{ id_mecanico?:number; id_taller:number; nombre:string; apellido:string }){
  try {
    if (data.id_mecanico){
      const { id_mecanico, ...body } = data
      await $fetch(`/api/mecanicos/${id_mecanico}`, { method:'PUT', body } as any)
    } else {
      await $fetch('/api/mecanicos', { method:'POST', body:data } as any)
    }
    showForm.value = false
    await load()
  } catch (e:any) {
    alert(e?.data?.message || 'No se pudo guardar')
  }
}
</script>

<template>
  <div class="wrap">
    <div class="card">
      <h3>Mecánicos</h3>
      <div class="filters">
        <input class="input" v-model="filtros.q" placeholder="Buscar nombre/apellido/taller" />
        <select class="select" v-model.number="filtros.id_taller">
          <option :value="''">Todos los talleres</option>
          <option v-for="t in talleres" :key="t.id_taller" :value="t.id_taller">{{ t.nombre }}</option>
        </select>
        <button class="btn" @click="openCreate">+ Nuevo Mecánico</button>
      </div>
      <p v-if="err" class="error">{{ err }}</p>
    </div>

    <div class="card">
      <table class="table">
        <thead>
          <tr><th>#</th><th>Nombre</th><th>Apellido</th><th>Taller</th><th></th></tr>
        </thead>
        <tbody>
          <tr v-for="r in items" :key="r.id_mecanico">
            <td>{{ r.id_mecanico }}</td>
            <td>{{ r.nombre }}</td>
            <td>{{ r.apellido }}</td>
            <td>{{ r.taller?.nombre ?? '—' }}</td>
            <td class="actions">
              <button class="row-action" @click="openEdit(r)">✏️</button>
              <button class="row-action danger" @click="removeRow(r.id_mecanico)">🗑</button>
            </td>
          </tr>
          <tr v-if="loading"><td colspan="5" style="text-align:center">Cargando…</td></tr>
          <tr v-if="!loading && !items.length"><td colspan="5" style="text-align:center">Sin resultados</td></tr>
        </tbody>
      </table>
    </div>

    <div v-if="showForm" class="backdrop">
      <div class="card modal">
        <h3 style="margin-top:0">{{ editing ? 'Editar mecánico' : 'Nuevo mecánico' }}</h3>
        <MecanicoForm
          :initial="editing ? { id_mecanico:editing.id_mecanico, id_taller:editing.id_taller, nombre:editing.nombre, apellido:editing.apellido } : undefined"
          :talleres="talleres"
          @cancel="showForm=false"
          @save="save"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrap{display:grid;gap:1rem}
.card{background:#fff;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,.08),0 1px 2px rgba(0,0,0,.06);padding:1rem}
.filters{display:flex;gap:.75rem;align-items:center}
.input,.select{border:1px solid #e5e7eb;border-radius:10px;padding:.5rem .75rem}
.btn{background:#2563eb;color:#fff;border:none;border-radius:10px;padding:.55rem .9rem;cursor:pointer}
.table{width:100%;border-collapse:collapse}
.table th{background:#f3f4f6;text-align:left;padding:.6rem .75rem}
.table td{border-top:1px solid #e5e7eb;padding:.6rem .75rem}
.actions{display:flex;gap:.5rem}
.row-action{border:1px solid #e5e7eb;border-radius:8px;padding:.25rem .5rem;background:transparent;cursor:pointer}
.row-action.danger:hover{background:#fee2e2}
.error{color:#dc2626}
.backdrop{position:fixed;inset:0;background:rgba(0,0,0,.4);display:grid;place-items:center;z-index:50}
.modal{width:min(520px,92vw)}
</style>
