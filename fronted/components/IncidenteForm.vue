<script setup lang="ts">
import { reactive, watchEffect } from 'vue'

type BusOpt = { id:number; label:string }
type CatOpt = { id:number; nombre:string }

type Initial = {
  id?: number
  id_bus?: number | null
  fecha?: string
  urgencia?: string
  ubicacion?: string
  descripcion?: string
  id_estado_incidente?: number | null
  id_tipo_incidente?: number | null
  estadoNombre?: string
  tipoNombreOId?: string | number
}

const props = defineProps<{
  initial?: Initial
  buses: BusOpt[]
  estados: CatOpt[]
  tipos: CatOpt[]
}>()

const emit = defineEmits<{
  (e:'save', payload:{
    id?: number
    id_bus: number
    fecha: string
    urgencia?: string
    ubicacion?: string
    descripcion?: string
    id_estado_incidente: number
    id_tipo_incidente: number
  }): void
  (e:'cancel'): void
}>()

// -------- helpers --------
function ymdOrEmpty(v?: string) {
  if (!v) {
    const d = new Date()
    const iso = new Date(d.getTime() - d.getTimezoneOffset()*60000).toISOString()
    return iso.slice(0,10)
  }
  return String(v).slice(0,10)
}
function findByName(arr:CatOpt[], name?:string) {
  if (!name) return null
  const s = name.trim().toUpperCase()
  return arr.find(e => e.nombre.toUpperCase() === s)?.id ?? null
}
function findTipoIdByNameOrId(arr:CatOpt[], v?:string|number) {
  if (v == null || v === '') return null
  if (typeof v === 'number') return v
  const s = String(v).trim().toUpperCase()
  return arr.find(t => t.nombre.toUpperCase() === s)?.id ?? null
}

// -------- form state --------
const form = reactive({
  id: props.initial?.id ?? undefined as number | undefined,
  id_bus: props.initial?.id_bus ?? '' as number | '',
  fecha: ymdOrEmpty(props.initial?.fecha),
  urgencia: props.initial?.urgencia ?? '',
  ubicacion: props.initial?.ubicacion ?? '',
  descripcion: props.initial?.descripcion ?? '',
  id_estado_incidente: props.initial?.id_estado_incidente ?? '' as number | '',
  id_tipo_incidente: props.initial?.id_tipo_incidente ?? '' as number | '',
  error: '' as string
})

watchEffect(() => {
  form.id = props.initial?.id ?? undefined
  form.id_bus = (props.initial?.id_bus ?? '') as number | ''
  form.fecha = ymdOrEmpty(props.initial?.fecha)
  form.urgencia = props.initial?.urgencia ?? ''
  form.ubicacion = props.initial?.ubicacion ?? ''
  form.descripcion = props.initial?.descripcion ?? ''

  let estadoId = props.initial?.id_estado_incidente ?? ''
  if ((estadoId === '' || estadoId == null) && props.initial?.estadoNombre) {
    estadoId = findByName(props.estados, props.initial.estadoNombre) ?? ''
  }
  form.id_estado_incidente = estadoId as number | ''

  let tipoId = props.initial?.id_tipo_incidente ?? ''
  if ((tipoId === '' || tipoId == null) && props.initial?.tipoNombreOId != null) {
    tipoId = findTipoIdByNameOrId(props.tipos, props.initial.tipoNombreOId) ?? ''
  }
  form.id_tipo_incidente = tipoId as number | ''
})

function validate(): string | null {
  if (!form.id_bus) return 'Debes seleccionar un Bus.'
  if (!form.id_estado_incidente) return 'Debes seleccionar un Estado.'
  if (!form.id_tipo_incidente) return 'Debes seleccionar un Tipo.'
  if (!/^\d{4}-\d{2}-\d{2}$/.test(form.fecha)) return 'La fecha debe tener formato YYYY-MM-DD.'
  return null
}

function onSave() {
  const err = validate()
  if (err) { form.error = err; return }

  emit('save', {
    id: form.id ?? undefined,
    id_bus: Number(form.id_bus),
    fecha: form.fecha,
    urgencia: form.urgencia || undefined,
    ubicacion: form.ubicacion || undefined,
    descripcion: form.descripcion || undefined,
    id_estado_incidente: Number(form.id_estado_incidente),
    id_tipo_incidente: Number(form.id_tipo_incidente)
  })
}
</script>

<template>
  <form @submit.prevent="onSave">
    <div class="grid" style="grid-template-columns:1fr 1fr; gap:1rem">
      <div>
        <label class="label">Bus *</label>
        <select class="input" v-model="form.id_bus">
          <option :value="''" disabled>Selecciona un bus…</option>
          <option v-for="b in buses" :key="b.id" :value="b.id">{{ b.label }}</option>
        </select>
      </div>

      <div>
        <label class="label">Fecha *</label>
        <input class="input" type="date" v-model="form.fecha" />
      </div>

      <div>
        <label class="label">Estado *</label>
        <select class="input" v-model="form.id_estado_incidente">
          <option :value="''" disabled>Selecciona estado…</option>
          <option v-for="s in estados" :key="s.id" :value="s.id">{{ s.nombre }}</option>
        </select>
      </div>

      <div>
        <label class="label">Tipo *</label>
        <select class="input" v-model="form.id_tipo_incidente">
          <option :value="''" disabled>Selecciona tipo…</option>
          <option v-for="t in tipos" :key="t.id" :value="t.id">{{ t.nombre }}</option>
        </select>
      </div>

      <div>
        <label class="label">Urgencia</label>
        <input class="input" v-model="form.urgencia" placeholder="BAJA / MEDIA / ALTA / CRÍTICA" />
      </div>

      <div>
        <label class="label">Ubicación</label>
        <input class="input" v-model="form.ubicacion" placeholder="Dirección o referencia" />
      </div>

      <div class="span-2">
        <label class="label">Descripción</label>
        <textarea class="input" rows="4" v-model="form.descripcion" placeholder="Detalle del incidente…"></textarea>
      </div>

      <p v-if="form.error" class="error span-2">⚠️ {{ form.error }}</p>

      <div class="actions span-2">
        <button type="button" class="row-action" @click="$emit('cancel')">✖ Cancelar</button>
        <button type="submit" class="btn">💾 Guardar</button>
      </div>
    </div>
  </form>
</template>

<style scoped>
.label {
  display: block;
  font-size: .85rem;
  color: #4b5563;
  margin-bottom: .35rem;
  font-weight: 600;
}

.input,
textarea.input,
select.input {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: .5rem .75rem;
  outline: none;
}

.input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, .25);
}

.grid {
  display: grid;
}

.span-2 {
  grid-column: span 2 / span 2;
}

.actions {
  display: flex;
  gap: .5rem;
  justify-content: flex-end;
  margin-top: .75rem;
}

/* --- Botón cancelar --- */
.row-action {
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: .45rem .8rem; /* más compacto */
  cursor: pointer;
  font-weight: 600;
  font-size: .9rem;
  min-width: 100px; /* ancho mínimo igual que el de Guardar */
  text-align: center;
}

.row-action:hover {
  background: #e5e7eb;
}

/* --- Botón guardar --- */
.btn {
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: .45rem .8rem; /* mismo padding que Cancelar */
  font-weight: 600;
  cursor: pointer;
  font-size: .9rem;
  min-width: 100px;
  text-align: center;
}

.btn:hover {
  background: #1d4ed8;
}

/* --- Botón deshabilitado opcional --- */
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: #dc2626;
  margin-top: .5rem;
}
</style>
