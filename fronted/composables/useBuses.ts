import { ref } from 'vue'

type Estado = 'OPERATIVO' | 'MANTENIMIENTO' | 'FUERA DE SERVICIO'
export interface Bus {
  id: number
  code: number
  plate: string
  model: string
  year: number
  km: number
  estado: Estado
}

export function useBuses() {
  const rows = ref<Bus[]>([])

  async function load() {
    try {
      const res = await $fetch<{ items: Bus[] }>('/api/buses')
      rows.value = res.items || []
    } catch (e) {
      rows.value = []
      // opcional: log/error toast
    }
  }

  async function create(data: Omit<Bus, 'id' | 'code'>) {
    await $fetch('/api/buses', { method: 'POST', body: data } as any)
    await load()
  }

  return { rows, load, create }
}
