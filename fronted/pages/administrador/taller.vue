<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue'
import TallerForm from '../../components/TallerForm.vue'
definePageMeta({ layout: 'admin' })
type Row = {
  id_taller:number
  nombre:string
  contacto?:string|null
  direccion?:string|null
  email?:string|null
  id_tipo_taller:number
  tipo_taller?: { id_tipo_taller:number; nombre_tipo:string } | null
  _count?: { mecanicos:number; mantenimientos:number }
}

const filtros = reactive({ q:'', id_tipo_taller: '' as number|'' })
const tiposCat = (await $fetch<{tipos:{id_tipo_taller:number; nombre_tipo:string}[]}>('/api/talleres/catalogos')).tipos

const items = ref<Row[]>([])
const loading = ref(false)
const err = ref('')

async function load(){
  loading.value=true; err.value=''
  try{
    const res = await $fetch<{items:Row[]}>('/api/talleres', {
      query:{ q: filtros.q || undefined, id_tipo_taller: filtros.id_tipo_taller || undefined }
    })
    items.value = res.items
  }catch(e:any){ err.value = e?.data?.message || 'Error' }
  finally{ loading.value=false }
}
watchEffect(load)

const showForm = ref(false)
const editing = ref<Row|null>(null)

function openCreate(){ editing.value=null; showForm.value=true }
function openEdit(r:Row){ editing.value={...r}; showForm.value=true }

async function removeRow(id:number){
  if(!confirm('¿Eliminar taller?')) return
  await $fetch(`/api/talleres/${id}`, { method:'DELETE' } as any)
  await load()
}

async function save(data:{ nombre:string; id_tipo_taller:number; contacto?:string; direccion?:string; email?:string } & { id_taller?:number }){
  if (data.id_taller){
    const { id_taller, ...body } = data
    await $fetch(`/api/talleres/${id_taller}`, { method:'PUT', body } as any)
  } else {
    await $fetch('/api/talleres', { method:'POST', body:data } as any)
  }
  showForm.value=false
  await load()
}
</script>

<template>
  <div class="wrap">
    <div class="card">
      <h3>Talleres</h3>
      <div class="filters">
        <input class="input" v-model="filtros.q" placeholder="Buscar nombre/contacto/email" />
        <select class="select" v-model.number="filtros.id_tipo_taller">
          <option value="">Todos los tipos</option>
          <option v-for="t in tiposCat" :key="t.id_tipo_taller" :value="t.id_tipo_taller">{{ t.nombre_tipo }}</option>
        </select>
        <button class="btn" @click="openCreate">+ Nuevo Taller</button>
      </div>
      <p v-if="err" class="error">{{ err }}</p>
    </div>

    <div class="card">
      <table class="table">
        <thead><tr><th>#</th><th>Nombre</th><th>Tipo</th><th>Contacto</th><th>Email</th><th>Mecánicos</th><th>Mants.</th><th></th></tr></thead>
        <tbody>
          <tr v-for="r in items" :key="r.id_taller">
            <td>{{ r.id_taller }}</td>
            <td>{{ r.nombre }}</td>
            <td>{{ r.tipo_taller?.nombre_tipo ?? '—' }}</td>
            <td>{{ r.contacto ?? '—' }}</td>
            <td>{{ r.email ?? '—' }}</td>
            <td>{{ r._count?.mecanicos ?? 0 }}</td>
            <td>{{ r._count?.mantenimientos ?? 0 }}</td>
            <td style="display:flex;gap:.5rem">
              <button class="row-action" @click="openEdit(r)">✏️</button>
              <button class="row-action danger" @click="removeRow(r.id_taller)">🗑</button>
            </td>
          </tr>
          <tr v-if="loading"><td colspan="8" style="text-align:center">Cargando…</td></tr>
        </tbody>
      </table>
    </div>

    <div v-if="showForm" class="backdrop">
      <div class="card" style="width:min(600px,92vw)">
        <h3 style="margin-top:0">{{ editing ? 'Editar taller' : 'Nuevo taller' }}</h3>
        <TallerForm
          :initial="editing ? {
            id_taller: editing.id_taller,
            nombre: editing.nombre,
            id_tipo_taller: editing.id_tipo_taller,
            contacto: editing.contacto ?? '',
            direccion: editing.direccion ?? '',
            email: editing.email ?? ''
          } : undefined"
          :tipos="tiposCat"
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
.row-action{border:1px solid #e5e7eb;border-radius:8px;padding:.25rem .5rem;background:transparent;cursor:pointer}
.row-action.danger:hover{background:#fee2e2}
.error{color:#dc2626}
.backdrop{position:fixed;inset:0;background:rgba(0,0,0,.4);display:grid;place-items:center;z-index:50}
</style>
