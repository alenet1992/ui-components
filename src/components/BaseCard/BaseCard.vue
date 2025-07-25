<template>
  <div class="product-card card" :style="extraStyles">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  extraStyles: {
    type: [Object, String],
    default: () => ({})
  }
});
</script>

<style scoped>
.product-card {
  padding: 1rem;
  background: var(--white, #ffffff);
  gap: 1rem;
}
.card {
  border-width: 1px;
  border-radius: var(--radius, 10px);
  border-color: var(--border-color, #e5e5e5);
  border-style: solid;


  &-bg-white {
    background-color: white;
  }

  &:not(.without-box-shadow) {
    box-shadow: 0 10px 15px -3px #0000001a, 0 4px 6px -4px #0000001a;
  }
}
</style>
