import 'nuxt/app'
declare module 'nuxt/app' {
  interface PageMeta { roles?: string[] }
}
