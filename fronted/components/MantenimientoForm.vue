<script setup lang="ts">
type CatalogBus = { id_bus:number; patente:string }
type CatalogTaller = { id_taller:number; nombre:string }                 // 👈 nombre
type CatalogTipo = { id_tipo_mantenimiento:number; nombre_tipo:string }  // 👈 nombre_tipo
type CatalogEstado = { id_estado_mantenimiento:number; nombre_estado:string } // 👈 nombre_estado

const props = defineProps<{
  initial?: {
    id_mantenimiento?: number
    id_bus?: number
    id_taller?: number
    id_tipo_mantenimiento?: number
    id_estado_mantenimiento?: number
    fecha?: string
    costo?: number
    observaciones?: string | null
  } | undefined
  buses: CatalogBus[]
  talleres: CatalogTaller[]
  tipos: CatalogTipo[]
  estados: CatalogEstado[]
}>()

const emit = defineEmits<{
  (e:'cancel'): void
  (e:'save', payload: {
    id_mantenimiento?: number
    id_bus: number
    id_taller: number
    id_tipo_mantenimiento: number
    id_estado_mantenimiento: number
    fecha: string
    costo?: number
    observaciones?: string | null
  }): void
}>()

const form = reactive({
  id_mantenimiento: props.initial?.id_mantenimiento,
  id_bus: props.initial?.id_bus ?? ('' as any),
  id_taller: props.initial?.id_taller ?? ('' as any),
  id_tipo_mantenimiento: props.initial?.id_tipo_mantenimiento ?? ('' as any),
  id_estado_mantenimiento: props.initial?.id_estado_mantenimiento ?? ('' as any),
  fecha: props.initial?.fecha ?? '',
  costo: props.initial?.costo ?? ('' as any),
  observaciones: props.initial?.observaciones ?? '',
})

function onSubmit() {
  if (!form.id_bus || !form.id_taller || !form.id_tipo_mantenimiento || !form.id_estado_mantenimiento || !form.fecha) {
    alert('Completa los campos obligatorios.')
    return
  }
  emit('save', {
    ...(form.id_mantenimiento ? { id_mantenimiento: form.id_mantenimiento } : {}),
    id_bus: Number(form.id_bus),
    id_taller: Number(form.id_taller),
    id_tipo_mantenimiento: Number(form.id_tipo_mantenimiento),
    id_estado_mantenimiento: Number(form.id_estado_mantenimiento),
    fecha: form.fecha,
    costo: form.costo !== '' ? Number(form.costo) : undefined,
    observaciones: form.observaciones || undefined,
  })
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="grid gap-3">
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <label class="field">
        <span>Bus</span>
        <select v-model="form.id_bus">
          <option disabled value="">Seleccione un bus</option>
          <option v-for="b in buses" :key="b.id_bus" :value="b.id_bus">#{{ b.id_bus }} - {{ b.patente }}</option>
        </select>
      </label>

      <label class="field">
        <span>Taller</span>
        <select v-model="form.id_taller">
          <option disabled value="">Seleccione un taller</option>
          <option v-for="t in talleres" :key="t.id_taller" :value="t.id_taller">{{ t.nombre }}</option>
        </select>
      </label>

      <label class="field">
        <span>Tipo</span>
        <select v-model="form.id_tipo_mantenimiento">
          <option disabled value="">Seleccione tipo</option>
          <option v-for="t in tipos" :key="t.id_tipo_mantenimiento" :value="t.id_tipo_mantenimiento">{{ t.nombre_tipo }}</option>
        </select>
      </label>

      <label class="field">
        <span>Estado</span>
        <select v-model="form.id_estado_mantenimiento">
          <option disabled value="">Seleccione estado</option>
          <option v-for="e in estados" :key="e.id_estado_mantenimiento" :value="e.id_estado_mantenimiento">{{ e.nombre_estado }}</option>
        </select>
      </label>

      <label class="field">
        <span>Fecha</span>
        <input type="date" v-model="form.fecha" />
      </label>

      <label class="field">
        <span>Costo</span>
        <input type="number" step="0.01" v-model="form.costo" placeholder="0" />
      </label>
    </div>

    <label class="field">
      <span>Observaciones</span>
      <input v-model="form.observaciones" placeholder="Detalle opcional" />
    </label>

    <div style="display:flex; gap:.5rem; justify-content:flex-end; margin-top:.25rem">
      <button type="button" class="btn ghost" @click="$emit('cancel')">Cancelar</button>
      <button type="submit" class="btn">Guardar</button>
    </div>
  </form>
</template>

<style scoped>
.field { display:grid; gap:.35rem; }
.field > span { font-size:.85rem; color:#4b5563; font-weight:600; }
.field > input, .field > select {
  border:1px solid #e5e7eb; border-radius:10px; padding:.5rem .75rem; outline:none;
}
.field > input:focus, .field > select:focus { border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,.25); }
.btn { background:#2563eb; color:#fff; border:none; border-radius:10px; padding:.55rem .9rem; font-weight:600; cursor:pointer; }
.btn.ghost { background:#f3f4f6; color:#111827; }
.btn:hover { background:#1d4ed8; }
.btn.ghost:hover { background:#e5e7eb; }
</style>
