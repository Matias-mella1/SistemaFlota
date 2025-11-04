export default defineNuxtPlugin(async () => {
  const user = useState<any>('user')
  if (user.value !== undefined) return

  const headers = process.server ? useRequestHeaders(['cookie']) : undefined
  try {
    const { user: me } = await $fetch<{ user: any }>('/api/auth/me', {
      headers,                // pasa cookies en SSR
      credentials: 'include', // usa cookies en cliente
    })
    user.value = me // puede ser null
  } catch {
    user.value = null
  }
})
