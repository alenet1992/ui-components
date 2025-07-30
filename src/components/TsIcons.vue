<template>
  <span class="ts-icon" :class="`ts-icon--${icon}`">
    <svg v-if="icon === 'search'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.35-4.35"></path>
    </svg>
    <svg v-else-if="icon === 'check-icon'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="20,6 9,17 4,12"></polyline>
    </svg>
    <svg v-else-if="icon === 'flag'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
      <line x1="4" y1="22" x2="4" y2="15"></line>
    </svg>
    <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  icon: string;
}>();
</script>

<style scoped>
.ts-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
}

.ts-icon svg {
  width: 100%;
  height: 100%;
}

.ts-icon--search {
  color: #6c757d;
}

.ts-icon--check-icon {
  color: #28a745;
}

.ts-icon--flag {
  color: #ffc107;
}
</style>