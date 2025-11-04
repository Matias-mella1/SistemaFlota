<script setup lang="ts">
interface Props { label: string; value: number | string; note?: string }
const props = defineProps<Props>()
</script>


<template>
<div class="card">
<div class="kpi">{{ props.value }}</div>
<div class="label">{{ props.label }}</div>
<div v-if="props.note" class="label" style="margin-top:.25rem">{{ props.note }}</div>
</div>
</template>