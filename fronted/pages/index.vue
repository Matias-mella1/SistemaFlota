<script setup lang="ts">
import { ref } from 'vue'
import { useState, useCookie, navigateTo } from 'nuxt/app'

// === Tipos del login que ya tenías ===
type LoginUser =
  | { id: number; nombre: string; rol: string }
  | { id: number; nombre: string; username?: string; roles: string[] }

interface LoginResponse {
  success: boolean
  user?: LoginUser
  token?: string
  message?: string
}

const user = ref('')
const pass = ref('')
const remember = ref(false)
const errMsg = ref('')
const loading = ref(false)

// --- Helpers nuevos (reemplazan a los anteriores) ---

// Normaliza un rol a MAYÚSCULAS sin tildes
function normalizeRole(r: string) {
  return r.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()
}

// Convierte el usuario devuelto por el backend a una forma estándar con roles[]
function toStandardUser(u: LoginUser) {
  const roles = 'roles' in u && Array.isArray(u.roles)
    ? u.roles.map(normalizeRole)
    : ('rol' in u ? [normalizeRole(u.rol)] : [])
  return { id: (u as any).id, nombre: (u as any).nombre, roles }
}

// Decide la página de inicio según prioridad de rol
function homeByRole(u: { roles: string[] }) {
  if (u.roles.includes('ADMINISTRADOR')) return '/admin'
  if (u.roles.includes('PROPIETARIO'))   return '/propietario'
  if (u.roles.includes('SUPERVISOR'))    return '/supervisor'
  if (u.roles.includes('CONDUCTOR'))     return '/conductor'
  return '/' // sin rol conocido -> vuelve al login
}

async function onSubmit() {
  if (loading.value) return
  errMsg.value = ''
  loading.value = true
  try {
    const payload = {
      username: (user.value || '').trim(),
      password: (pass.value || '').trim(),
    }

    const res = await $fetch<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: payload,
    })

    if (res.success && res.user) {
      // Estandariza y guarda el usuario en el estado global
      const std = toStandardUser(res.user)
      const globalUser = useState<typeof std | null>('user', () => null)
      globalUser.value = std

      // (Opcional) guardar token en cookie si tu backend NO setea httpOnly
      if (res.token) {
        const cookie = useCookie<string | null>('auth_token', {
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production', // ⚠️ en local, que NO sea true
          ...(remember.value ? { maxAge: 60 * 60 * 24 * 7 } : {}),
        })
        cookie.value = res.token
      }

      // Redirige según rol (ahora sí a /admin si es ADMINISTRADOR)
      return navigateTo(homeByRole(std))
    } else {
      errMsg.value = res.message || 'Usuario o contraseña incorrectos'
    }
  } catch (err: any) {
    errMsg.value = err?.data?.message || err?.message || 'Error al iniciar sesión'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="bg">
    <div class="card">
      <!-- PANEL IZQUIERDO -->
      <section class="left">
        <div class="brand">
          <div class="logo">🚍</div>
          <h1>CheckBus</h1>
        </div>
        <h2 class="title">Sistema de Gestión de Flota</h2>
        <p class="subtitle">
          Administra tu flota de buses de manera eficiente y profesional.
        </p>

        <ul class="features">
          <li><span class="dot"></span> Control total de vehículos y conductores</li>
          <li><span class="dot"></span> Gestión de mantenciones programadas</li>
          <li><span class="dot"></span> Reportes y alertas en tiempo real</li>
          <li><span class="dot"></span> Control de documentación y repuestos</li>
        </ul>
      </section>

      <!-- PANEL DERECHO -->
      <section class="right">
        <h2 class="welcome">¡Bienvenido!</h2>
        <p class="hint">Ingresa tus credenciales para acceder al sistema</p>

        <div class="group">
          <label>Usuario</label>
          <input
            class="input"
            v-model="user"
            placeholder="usuario o email"
            @keydown.enter="onSubmit"
          />
        </div>

        <div class="group">
          <label>Contraseña</label>
          <input
            class="input"
            type="password"
            v-model="pass"
            placeholder="Ingresa tu contraseña"
            @keydown.enter="onSubmit"
          />
        </div>

        <div class="form-row">
          <label class="remember">
            <input type="checkbox" v-model="remember" />
            Recordar sesión
          </label>
          <NuxtLink to="/recuperar" class="link">¿Olvidaste tu contraseña?</NuxtLink>
        </div>

        <button class="btn" :disabled="loading" @click="onSubmit">
          {{ loading ? 'Ingresando…' : 'Iniciar Sesión' }}
        </button>

        <p v-if="errMsg" class="support" style="color:#b91c1c; font-weight:600; margin-top:12px">
          {{ errMsg }}
        </p>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* FONDO GLOBAL */
.bg {
  min-height: 100dvh;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #e0f2fe 0%, #93c5fd 100%);
  font-family: 'Inter', sans-serif;
  padding: clamp(16px, 3vw, 48px);
  transition: all 0.3s ease;
}

/* CARD CONTENEDOR */
.card {
  width: 100%;
  max-width: 1100px;
  background: #fff;
  border-radius: 22px;
  box-shadow: 0 35px 60px rgba(23, 23, 23, 0.2), 0 8px 18px rgba(23, 23, 23, 0.08);
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(340px, 1fr) minmax(360px, 480px);
  animation: fadeIn 0.8s ease forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

/* PANEL IZQUIERDO */
.left {
  background: linear-gradient(160deg, #2563eb 0%, #1d4ed8 55%, #316bff 100%);
  color: white;
  padding: clamp(24px, 4vw, 48px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}
.left::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(600px 300px at 20% 15%, rgba(255,255,255,0.2), transparent 55%);
  pointer-events: none;
}

/* Branding */
.brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 2rem;
}
.logo {
  width: 52px;
  height: 52px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 14px;
  display: grid;
  place-items: center;
  font-size: 28px;
}
.brand h1 {
  font-size: 1.9rem;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.title {
  font-size: clamp(1.4rem, 2.2vw, 1.8rem);
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.subtitle {
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  opacity: 0.95;
  margin-bottom: 1.5rem;
}

.features {
  list-style: none;
  padding: 0;
  margin: 0;
}
.features li {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 0.8rem;
  font-size: 0.95rem;
}
.dot {
  width: 20px;
  height: 20px;
  background: #d1fae5;
  border-radius: 50%;
  position: relative;
}
.dot::after {
  content: "";
  position: absolute;
  inset: 5px;
  border-radius: 50%;
  background: #10b981;
}

/* PANEL DERECHO */
.right {
  padding: clamp(24px, 4vw, 48px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid #e5e7eb;
}

.welcome {
  font-size: 1.7rem;
  font-weight: 800;
  margin-bottom: 0.3rem;
}
.hint {
  color: #6b7280;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.group {
  margin-bottom: 1rem;
}
.group label {
  font-size: 14px;
  font-weight: 700;
  color: #374151;
  display: block;
  margin-bottom: 0.5rem;
}
.input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: 0.2s;
}
.input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}

.form-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  margin: 1rem 0 1.5rem 0;
}
.link {
  color: #2563eb;
  text-decoration: none;
}
.link:hover {
  text-decoration: underline;
}

.btn {
  background: linear-gradient(180deg, #2563eb 0%, #1d4ed8 100%);
  color: white;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  padding: 0.9rem;
  cursor: pointer;
  font-size: 1rem;
  box-shadow: 0 8px 18px rgba(37, 99, 235, 0.25), inset 0 2px 0 rgba(255, 255, 255, 0.15);
  transition: filter 0.15s, transform 0.1s;
}
.btn:hover { filter: brightness(0.97); }
.btn:active { transform: translateY(1px); }
.btn:disabled { opacity: .6; cursor: not-allowed; }

.support {
  text-align: center;
  margin-top: 1.0rem;
  font-size: 0.95rem;
  color: #6b7280;
}

/* --- RESPONSIVE (CELULAR) --- */
@media (max-width: 768px) {
  .card {
    grid-template-columns: 1fr;
    max-width: 95%;
    box-shadow: none;
  }
  .left {
    border-radius: 0;
    border-bottom: 1px solid #e5e7eb;
    text-align: center;
    padding: 2rem 1.5rem;
  }
  .brand { justify-content: center; }
  .features { text-align: left; margin-top: 1rem; }
  .right { padding: 2rem 1.5rem; border-left: none; }
  .btn { width: 100%; }
  .support { font-size: 0.85rem; }
  .bg {
    padding: 1.5rem 0;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 60%, #1e40af 100%);
  }
}
</style>
