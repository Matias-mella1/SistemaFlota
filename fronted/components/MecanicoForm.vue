<script setup lang="ts">
import { reactive, ref } from 'vue'

const props = defineProps<{
  initial?: { id_mecanico?:number; id_taller?:number; nombre?:string; apellido?:string }
  talleres: { id_taller:number; nombre:string }[]
}>()

const emit = defineEmits<{
  (e:'cancel'):void
  (e:'save', v:{ id_mecanico?:number; id_taller:number; nombre:string; apellido:string }):void
}>()

const form = reactive({
  id_mecanico: props.initial?.id_mecanico,
  id_taller: props.initial?.id_taller ?? ('' as unknown as number|''),
  nombre: props.initial?.nombre ?? '',
  apellido: props.initial?.apellido ?? '',
})
const saving = ref(false)
const error = ref('')

function validate() {
  if (!form.id_taller) return 'Seleccione un taller'
  if (!form.nombre?.trim()) return 'Ingrese el nombre'
  if (!form.apellido?.trim()) return 'Ingrese el apellido'
  return ''
}

async function onSubmit(){
  error.value = validate()
  if (error.value) return
  try {
    saving.value = true
    emit('save', {
      ...(form.id_mecanico ? { id_mecanico: form.id_mecanico } : {}),
      id_taller: Number(form.id_taller),
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
    })
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="grid gap-3">
    <div class="grid sm:grid-cols-2 gap-3">
      <label class="field">
        <span>Taller</span>
        <select v-model="form.id_taller">
          <option disabled :value="''">Seleccione</option>
          <option v-for="t in talleres" :key="t.id_taller" :value="t.id_taller">{{ t.nombre }}</option>
        </select>
      </label>

      <label class="field">
        <span>Nombre</span>
        <input v-model="form.nombre" />
      </label>

      <label class="field">
        <span>Apellido</span>
        <input v-model="form.apellido" />
      </label>
    </div>

    <p v-if="error" class="error">{{ error }}</p>

    <div class="actions">
      <button type="button" class="btn ghost" @click="$emit('cancel')" :disabled="saving">Cancelar</button>
      <button type="submit" class="btn" :disabled="saving">{{ saving ? 'Guardando…' : 'Guardar' }}</button>
    </div>
  </form>
</template>

<style scoped>
.field{display:grid;gap:.35rem}
.field>span{font-size:.85rem;color:#4b5563;font-weight:600}
.field>input,.field>select{border:1px solid #e5e7eb;border-radius:10px;padding:.5rem .75rem}
.btn{background:#2563eb;color:#fff;border:none;border-radius:10px;padding:.55rem .9rem;cursor:pointer}
.btn.ghost{background:#f3f4f6;color:#111827}
.error{color:#dc2626}
.actions{display:flex;gap:.5rem;justify-content:flex-end}
</style>
