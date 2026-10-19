<script setup>
const props = defineProps({
  count: Number,
  collapseTask: Boolean
});
const emit = defineEmits(['collapse']);
const collapse = () => {
  emit('collapse');
}
</script>

<template>
  <button
    type="button"
    @click="collapse"
    class="flex w-full items-center border-t border-white/5 px-4 py-3 text-left transition-colors hover:bg-surface-hover"
  >
    <span class="text-sm text-mist-muted">Completed ({{ count }})</span>
    <span class="ml-auto text-mist-faint transition-transform duration-200" :class="{ 'rotate-180': collapseTask }">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </span>
  </button>
</template>
