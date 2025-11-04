<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'

type Props = {
  initial?: {
    id?: number
    rut?: string
    nombre?: string
    apellido?: string
    email?: string
    username?: string
    telefono?: string
    licencia?: string
    activo?: boolean
    roles?: string[]
  }
  allRoles: string[] // catálogo que llega desde la página (incluye los 4 por defecto)
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e:'save', payload:any):void
  (e:'cancel'):void
  (e:'resetPassword', id:number):void
}>()

const isEditing = computed(() => !!props.initial?.id)

// --------- Estado local ----------
const id        = ref<number | undefined>(props.initial?.id)
const rut       = ref(props.initial?.rut ?? '')
const nombre    = ref(props.initial?.nombre ?? '')
const apellido  = ref(props.initial?.apellido ?? '')
const email     = ref(props.initial?.email ?? '')
const username  = ref(props.initial?.username ?? '')
const telefono  = ref(props.initial?.telefono ?? '')
const licencia  = ref(props.initial?.licencia ?? '')
const activo    = ref<boolean>(props.initial?.activo ?? true)
const rolesSel  = ref<string[]>(props.initial?.roles ?? [])

const formError = ref('')

// Mostrar SIEMPRE los 4 roles base en UI
const baseRoles = ['ADMINISTRADOR','PROPIETARIO','CONDUCTOR','SUPERVISOR']
const rolesUI = computed(() => {
  const set = new Set<string>([...baseRoles, ...(props.allRoles || [])])
  return Array.from(set) // sin duplicados
})

watchEffect(() => {
  id.value        = props.initial?.id
  rut.value       = props.initial?.rut ?? ''
  nombre.value    = props.initial?.nombre ?? ''
  apellido.value  = props.initial?.apellido ?? ''
  email.value     = props.initial?.email ?? ''
  username.value  = props.initial?.username ?? ''
  telefono.value  = props.initial?.telefono ?? ''
  licencia.value  = props.initial?.licencia ?? ''
  activo.value    = props.initial?.activo ?? true
  rolesSel.value  = props.initial?.roles ?? []
  formError.value = ''
})

function onSave() {
  // Validaciones mínimas
  if (!rut.value || !nombre.value || !apellido.value || !email.value || !username.value) {
    formError.value = 'Completa los campos obligatorios.'
    return
  }

  // Validar al menos 1 rol. Si no hay, asignar por defecto CONDUCTOR
  if (!rolesSel.value.length) {
    rolesSel.value = ['CONDUCTOR']
  }

  const payload:any = {
    rut: rut.value,
    nombre: nombre.value,
    apellido: apellido.value,
    email: email.value,
    username: username.value,
    telefono: telefono.value,
    licencia: licencia.value,
    activo: !!activo.value,
    roles: rolesSel.value,
  }
  emit('save', payload)
}

function onResetPassword() {
  if (isEditing.value && id.value) emit('resetPassword', id.value)
}

function marcarTodos() {
  rolesSel.value = [...rolesUI.value]
}
function limpiarRoles() {
  rolesSel.value = []
}
</script>

<template>
  <form @submit.prevent="onSave">
    <div class="form-grid">
      <label><span>RUT</span><input v-model="rut" class="input" required /></label>
      <label><span>Nombre</span><input v-model="nombre" class="input" required /></label>
      <label><span>Apellido</span><input v-model="apellido" class="input" required /></label>
      <label><span>Email</span><input v-model="email" class="input" type="email" required /></label>
      <label><span>Usuario</span><input v-model="username" class="input" required /></label>

      <label><span>Teléfono</span><input v-model="telefono" class="input" /></label>
      <label><span>Licencia</span><input v-model="licencia" class="input" /></label>

      <label>
        <span>Activo</span>
        <select v-model="activo" class="select">
          <option :value="true">ACTIVO</option>
          <option :value="false">INACTIVO</option>
        </select>
      </label>

      <!-- ROLES -->
      <label class="roles">
        <span>Roles</span>
        <div class="roles-box">
          <label v-for="r in rolesUI" :key="r" class="chk">
            <input type="checkbox" :value="r" v-model="rolesSel" />
            <span>{{ r }}</span>
          </label>
        </div>
        <div class="roles-actions">
          <button type="button" class="btn ghost" @click="marcarTodos">✅ Marcar todos</button>
          <button type="button" class="btn ghost" @click="limpiarRoles">🧹 Limpiar</button>
        </div>
      </label>

      <div v-if="formError" class="error span-2">⚠️ {{ formError }}</div>

      <div class="actions">
        <button class="btn" type="submit">💾 {{ isEditing ? 'Guardar Cambios' : 'Crear Usuario' }}</button>
        <button class="btn ghost" type="button" @click="$emit('cancel')">✖ Cancelar</button>
        <button 
          v-if="isEditing"
          class="btn ghost"
          type="button"
          title="Enviar correo de restablecimiento"
          @click="onResetPassword"
        >
          🔐 Enviar restablecimiento
        </button>
      </div>
    </div>
  </form>
</template>

<style scoped>
.form-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:.75rem 1rem; }
.span-2 { grid-column: span 2 / span 2; }
.roles { grid-column:1 / -1; display:flex; flex-direction:column; gap:.5rem; }
.roles-box { display:flex; gap:.75rem; flex-wrap:wrap; border:1px solid #e5e7eb; border-radius:10px; padding:.5rem; }
.roles-actions { display:flex; gap:.5rem; }
.chk { display:flex; align-items:center; gap:.35rem; }
.actions { grid-column:1 / -1; display:flex; gap:.5rem; justify-content:flex-end; margin-top:.5rem; }
label > span { display:block; font-size:.85rem; margin-bottom:.25rem; color:#374151; font-weight:600; }
.input,.select,textarea.input { width:100%; border:1px solid #e5e7eb; border-radius:10px; padding:.5rem .75rem; outline:none; }
.input:focus,.select:focus,textarea.input:focus { border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,.25) }
.btn { background:#2563eb; color:#fff; border:none; border-radius:10px; padding:.55rem .9rem; font-weight:600; cursor:pointer; }
.btn:hover { background:#1d4ed8; }
.btn.ghost { background:#f3f4f6; color:#111827; }
.btn.ghost:hover { background:#e5e7eb; }
.error { background:#fee2e2; color:#991b1b; border:1px solid #fecaca; padding:.5rem .75rem; border-radius:8px; }
</style>
