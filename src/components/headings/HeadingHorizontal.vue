<template>
  <div class="relative group flex w-full items-center justify-between lg:fixed lg:left-0 lg:top-14 lg:z-10 lg:w-full lg:px-3 lg:py-2.5 lg:bg-ink/80 lg:backdrop-blur-sm">
    <div class="flex min-w-0 items-center">
      <h1 v-if="board" class="font-display truncate text-xl font-semibold tracking-tight text-mist sm:text-2xl">
        {{ board.name }}
      </h1>
    </div>
    <button
      type="button"
      @click="toggleActionButton"
      class="icon-btn"
      aria-label="Board actions"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
      </svg>
    </button>
    <BoardActionMenu :isOpen="isOpen" :board="board" @close="isOpen = false" />
  </div>
</template>

<script setup>
import BoardActionMenu from '../boards/BoardActionMenu.vue';
import { ref } from 'vue';

const props = defineProps({
  board: Object
})

const isOpen = ref(false)

const toggleActionButton = () => {
  isOpen.value = isOpen.value == false ? true : false;
}
</script>
