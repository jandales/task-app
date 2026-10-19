<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useStore } from 'vuex'

import Board from '../boards/Board.vue';

const store = useStore();

const props = defineProps({
  isOpen: false,
})

const newBoard = ref(false);
const input = ref()

const emit = defineEmits(['close'])

const handleNewBoard = () => {
  newBoard.value = newBoard.value == false ? true : false;
}

const closeMenu = () => {
  emit('close');
  newBoard.value = false;
}

const addBoard = () => {
  store.dispatch('addBoard', input.value)
  input.value = null;
  newBoard.value = false
  emit('close');
}

const onBoardSelect = () => {
  closeMenu();
}

const onKeydown = (event) => {
  if (event.key === 'Escape' && props.isOpen) {
    closeMenu();
  }
}

watch(() => props.isOpen, (open) => {
  if (open) {
    document.addEventListener('keydown', onKeydown);
  } else {
    document.removeEventListener('keydown', onKeydown);
  }
})

onMounted(() => {
  store.dispatch('getBoards');
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown);
})

const boards = computed(() => {
  return store.getters.boards
})
</script>

<template>
  <div
    id="main-wrapper"
    class="pointer-events-none fixed inset-0 z-40 opacity-0 transition-opacity duration-drawer"
    :class="{ '!pointer-events-auto opacity-100': isOpen }"
  >
    <div
      class="absolute inset-0 bg-ink/70 backdrop-blur-sm"
      aria-hidden="true"
      @click="closeMenu"
    />
    <aside
      id="sidebar"
      class="absolute left-0 top-0 flex h-full w-[300px] max-w-[85vw] -translate-x-full flex-col border-r border-white/10 bg-surface shadow-panel transition-transform duration-drawer ease-out"
      :class="{ '!translate-x-0': isOpen }"
      role="dialog"
      aria-modal="true"
      aria-label="Boards"
      @click.stop
    >
      <div class="flex items-center gap-3 border-b border-white/10 px-4 py-4">
        <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </span>
        <div class="min-w-0 flex-1">
          <p class="font-display text-base font-semibold text-mist">TaskBoard</p>
          <p class="text-xs text-mist-muted">Your boards</p>
        </div>
        <button
          type="button"
          class="icon-btn !h-9 !w-9"
          aria-label="Close boards menu"
          @click="closeMenu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="flex-1 overflow-y-auto px-3 py-3">
        <p class="mb-2 px-2 text-[11px] font-medium uppercase tracking-wider text-mist-faint">Boards</p>
        <div @click="onBoardSelect">
          <Board v-for="board in boards" :key="board.id" :board="board" />
        </div>

        <button
          v-if="!newBoard"
          type="button"
          @click="handleNewBoard"
          class="mt-2 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-mist-muted transition-colors hover:bg-surface-hover hover:text-accent"
        >
          <span class="flex h-8 w-8 items-center justify-center rounded-md bg-accent-soft text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </span>
          Add Board
        </button>
        <div v-else class="mt-2 flex gap-2 px-1">
          <input
            @keyup.enter="addBoard()"
            type="text"
            class="field-input"
            v-model="input"
            placeholder="New board name"
            autofocus
          />
          <button type="button" @click="addBoard" class="icon-btn shrink-0 text-accent" aria-label="Create board">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  </div>
</template>
