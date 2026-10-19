<template>
  <div id="nav-board" class="group w-full">
    <button
      id="board"
      type="button"
      @click="getBoard(board.id)"
      class="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm transition-colors duration-150"
      :class="isSelected
        ? 'bg-accent-soft text-accent'
        : 'text-mist-muted hover:bg-surface-hover hover:text-mist'"
    >
      <span
        class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
        :class="isSelected ? 'bg-accent/20 text-accent' : 'text-mist-faint'"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </span>
      <span class="truncate font-medium">{{ board.name }}</span>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({
  board: Object,
})

const emit = defineEmits(['getList'])

const isSelected = computed(() => {
  return String(store.getters.selectedBoard) === String(props.board.id)
})

function getBoard(id) {
  store.dispatch('getBoard', id);
  store.dispatch('selectedBaord', id);
  store.dispatch('getList')
}
</script>
