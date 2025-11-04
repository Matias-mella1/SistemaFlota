<script setup lang="ts">
const props = defineProps<{
  initial?: { id_taller?:number; nombre?:string; id_tipo_taller?:number; contacto?:string; direccion?:string; email?:string }
  tipos: { id_tipo_taller:number; nombre_tipo:string }[]
}>()

const emit = defineEmits<{
  (e:'cancel'):void
  (e:'save', v:{ id_taller?:number; nombre:string; id_tipo_taller:number; contacto?:string; direccion?:string; email?:string }):void
}>()

const form = reactive({
  id_taller: props.initial?.id_taller,
  nombre: props.initial?.nombre ?? '',
  id_tipo_taller: props.initial?.id_tipo_taller ?? ('' as any),
  contacto: props.initial?.contacto ?? '',
  direccion: props.initial?.direccion ?? '',
  email: props.initial?.email ?? '',
})

function onSubmit(){
  if(!form.nombre || !form.id_tipo_taller){ alert('Nombre y tipo son obligatorios'); return }
  emit('save', {
    ...(form.id_taller ? { id_taller: form.id_taller } : {}),
    nombre: form.nombre,
    id_tipo_taller: Number(form.id_tipo_taller),
    contacto: form.contacto || undefined,
    direccion: form.direccion || undefined,
    email: form.email || undefined,
  })
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="grid gap-3">
    <div class="grid sm:grid-cols-2 gap-3">
      <label class="field">
        <span>Nombre</span>
        <input v-model="form.nombre"/>
      </label>

      <label class="field">
        <span>Tipo de Taller</span>
        <select v-model="form.id_tipo_taller">
          <option disabled value="">Seleccione tipo</option>
          <option v-for="t in tipos" :key="t.id_tipo_taller" :value="t.id_tipo_taller">{{ t.nombre_tipo }}</option>
        </select>
      </label>

      <label class="field">
        <span>Contacto</span>
        <input v-model="form.contacto"/>
      </label>

      <label class="field">
        <span>Email</span>
        <input v-model="form.email" type="email"/>
      </label>

      <label class="field" style="grid-column: 1 / -1">
        <span>Dirección</span>
        <input v-model="form.direccion"/>
      </label>
    </div>

    <div style="display:flex;gap:.5rem;justify-content:flex-end">
      <button type="button" class="btn ghost" @click="$emit('cancel')">Cancelar</button>
      <button type="submit" class="btn">Guardar</button>
    </div>
  </form>
</template>

<style scoped>
.field{display:grid;gap:.35rem}
.field>span{font-size:.85rem;color:#4b5563;font-weight:600}
.field>input,.field>select{border:1px solid #e5e7eb;border-radius:10px;padding:.5rem .75rem}
.btn{background:#2563eb;color:#fff;border:none;border-radius:10px;padding:.55rem .9rem}
.btn.ghost{background:#f3f4f6;color:#111827}
</style>
