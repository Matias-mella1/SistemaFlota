
<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'

type Opt = { id:number; label:string }

type Props = {
  initial?: {
    id?: number
    usuarioId?: number|null
    busId?: number|null
    inicio?: string // ISO o "YYYY-MM-DDTHH:mm"
    fin?: string
    estado?: string
    titulo?: string
    descripcion?: string
  }
  allConductores: Opt[]
  allBuses: Opt[]
  estadosCatalogo?: string[]
}
const props = defineProps<Props>()
const emit = defineEmits<{ (e:'save', payload:any):void; (e:'cancel'):void }>()

const estados = computed(() => props.estadosCatalogo?.length ? props.estadosCatalogo : ['ASIGNADO','PROGRAMADO','COMPLETADO','CANCELADO'])

/* ---- helpers fecha ---- */
function toLocalInput(v?: string) {
  if (!v) return ''
  const d = new Date(v)
  if (isNaN(+d)) return v.slice(0,16) // ya viene "YYYY-MM-DDTHH:mm"
  return new Date(d.getTime() - d.getTimezoneOffset()*60000).toISOString().slice(0,16)
}
function localToISO(v: string) {
  // v: "YYYY-MM-DDTHH:mm"
  const d = new Date(v)
  return new Date(d.getTime() - d.getTimezoneOffset()*60000).toISOString()
}

/* ---- estado local ---- */
const usuarioId = ref<number|null>(props.initial?.usuarioId ?? null)
const busId     = ref<number|null>(props.initial?.busId ?? null)
const inicio    = ref<string>(toLocalInput(props.initial?.inicio) || '')
const fin       = ref<string>(toLocalInput(props.initial?.fin) || '')
const estado    = ref<string>(props.initial?.estado ?? 'ASIGNADO')
const titulo    = ref<string>(props.initial?.titulo ?? '')
const descripcion = ref<string>(props.initial?.descripcion ?? '')
const formError = ref('')

watchEffect(() => {
  usuarioId.value = props.initial?.usuarioId ?? null
  busId.value     = props.initial?.busId ?? null
  inicio.value    = toLocalInput(props.initial?.inicio) || ''
  fin.value       = toLocalInput(props.initial?.fin) || ''
  estado.value    = props.initial?.estado ?? 'ASIGNADO'
  titulo.value    = props.initial?.titulo ?? ''
  descripcion.value = props.initial?.descripcion ?? ''
  formError.value = ''
})

function onSave() {
  // Validaciones
  if (!usuarioId.value || !busId.value || !inicio.value || !fin.value) {
    formError.value = 'Faltan datos obligatorios: conductor, bus, inicio y fin.'
    return
  }
  const d1 = new Date(inicio.value)
  const d2 = new Date(fin.value)
  if (!(d1 < d2)) {
    formError.value = 'Inicio debe ser menor que fin.'
    return
  }

  // Emitimos ya normalizado para backend
  const payload = {
    usuarioId: Number(usuarioId.value),
    busId: Number(busId.value),
    inicio: localToISO(inicio.value),
    fin:    localToISO(fin.value),
    estado: estado.value,
    titulo: titulo.value?.trim() || undefined,
    descripcion: descripcion.value?.trim() || undefined,
  }
  emit('save', payload)
}
</script>

<template>
  <form @submit.prevent="onSave">
    <div class="form-grid">
      <label class="span-2">
        <span>Conductor *</span>
        <select class="select" v-model.number="usuarioId">
          <option :value="null" disabled>Selecciona conductor</option>
          <option v-for="o in allConductores" :key="o.id" :value="o.id">{{ o.label }}</option>
        </select>
      </label>

      <label class="span-2">
        <span>Bus *</span>
        <select class="select" v-model.number="busId">
          <option :value="null" disabled>Selecciona bus</option>
          <option v-for="o in allBuses" :key="o.id" :value="o.id">{{ o.label }}</option>
        </select>
      </label>

      <label>
        <span>Inicio *</span>
        <input class="input" type="datetime-local" v-model="inicio" />
      </label>
      <label>
        <span>Fin *</span>
        <input class="input" type="datetime-local" v-model="fin" :min="inicio || undefined"/>
      </label>

      <label>
        <span>Estado</span>
        <select class="select" v-model="estado">
          <option v-for="e in estados" :key="e" :value="e">{{ e }}</option>
        </select>
      </label>

      <label>
        <span>Título</span>
        <input class="input" v-model="titulo" placeholder="Turno AM / PM..." />
      </label>

      <label class="span-2">
        <span>Descripción</span>
        <textarea class="input" rows="3" v-model="descripcion" placeholder="Observaciones, incidencias, etc."></textarea>
      </label>

      <div v-if="formError" class="error span-2">⚠️ {{ formError }}</div>

      <div class="actions">
        <button class="btn" type="submit">💾 Guardar</button>
        <button class="btn ghost" type="button" @click="$emit('cancel')">✖ Cancelar</button>
      </div>
    </div>
  </form>
</template>

<style scoped>
.form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.75rem 1rem}
.span-2{grid-column:span 2 / span 2}
label>span{display:block;font-size:.85rem;margin-bottom:.25rem;color:#374151;font-weight:600}
.input,.select,textarea.input{width:100%;border:1px solid #e5e7eb;border-radius:10px;padding:.5rem .75rem}
.input:focus,.select:focus,textarea.input:focus{border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,.25)}
.actions{grid-column:1 / -1;display:flex;gap:.5rem;justify-content:flex-end;margin-top:.5rem}
.btn{background:#2563eb;color:#fff;border:none;border-radius:10px;padding:.55rem .9rem;font-weight:600;cursor:pointer}
.btn:hover{background:#1d4ed8}
.btn.ghost{background:#f3f4f6;color:#111827}
.btn.ghost:hover{background:#e5e7eb}
.error{background:#fee2e2;color:#991b1b;border:1px solid #fecaca;padding:.5rem .75rem;border-radius:8px}
</style>
