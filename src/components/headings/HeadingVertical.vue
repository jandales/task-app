<template>
  <div class="group relative mb-4 w-full">
    <div class="mx-auto mt-4 flex w-full max-w-[700px] items-center justify-between rounded-xl border border-white/10 bg-surface/90 px-5 py-4 shadow-soft backdrop-blur-sm">
      <h1 v-if="board" class="font-display text-xl font-semibold tracking-tight text-mist">
        {{ board.name }}
      </h1>
      <button type="button" @click="toggleActionButton" class="icon-btn" aria-label="Board actions">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      </button>
      <ActionMenu :isOpen="isOpen" :board="board" :vertical="true" @close="isOpen = false" />
    </div>
  </div>
</template>

<script setup>
import ActionMenu from '../boards/BoardActionMenu.vue'
import { ref } from 'vue';

const props = defineProps({
  board: Object
})
const isOpen = ref(false)

function toggleActionButton() {
  isOpen.value = isOpen.value == false ? true : false;
}
</script>
