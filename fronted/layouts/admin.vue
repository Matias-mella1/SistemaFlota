<template>
  <div class="admin-layout">
    <Sidebar />
    <main class="admin-content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
// Si tienes auto-import de components activado, este import es opcional.
// Asegúrate que el nombre del archivo y el tag coincidan en mayúsculas/minúsculas.
import Sidebar from '~/components/sidebar.vue'
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f3f4f6;
}
.admin-content {
  flex: 1;
  margin-left: 260px;
  padding: 1.5rem;
}
</style>
