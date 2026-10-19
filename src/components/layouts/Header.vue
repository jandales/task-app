<script setup>
import { ref, inject } from 'vue';
import { useStore } from 'vuex';
import SideBarMenu from './SideBarMenu.vue';

const store = useStore();
const menuOpen = ref(false);
const showSearchClose = ref(false);
const searchInput = ref();

const emit = defineEmits(['view'])

const { verticalView, toggleView } = inject('verticalView');

const refresh = () => {
  store.dispatch('getBoard', store.getters.selectedBoard);
}

const close = () => {
  store.dispatch('getBoard', store.getters.selectedBoard);
  searchInput.value = null;
  showSearchClose.value = false;
}

const search = () => {
  if (searchInput.value == null) return close();
  showSearchClose.value = true;
  store.dispatch('search', searchInput.value)
}

</script>

<template>
  <header class="fixed top-0 left-0 z-30 w-full border-b border-white/10 bg-ink-soft/90 backdrop-blur-md">
    <div class="flex h-14 w-full items-center justify-between gap-2 px-2 sm:px-3">
      <div class="flex min-w-0 items-center gap-1">
        <button
          type="button"
          aria-label="Open boards menu"
          @click="menuOpen = true"
          class="icon-btn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <a href="" class="flex items-center gap-2.5 pl-1" aria-label="TaskBoard home">
          <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </span>
          <span class="font-display text-lg font-semibold tracking-tight text-mist hidden sm:inline">
            TaskBoard
          </span>
        </a>
      </div>

      <div class="flex w-full max-w-md items-center rounded-xl border border-white/10 bg-surface px-2 transition-colors focus-within:border-accent/40">
        <span class="px-2 text-mist-faint" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          type="text"
          @input="search"
          v-model="searchInput"
          class="w-full border-0 bg-transparent py-2.5 text-sm text-mist placeholder:text-mist-faint outline-none"
          placeholder="Search lists & tasks"
          aria-label="Search lists and tasks"
        />
        <button
          type="button"
          @click="close"
          aria-label="Clear search"
          class="hidden rounded-lg p-1.5 text-mist-muted transition-colors hover:bg-danger-soft hover:text-danger"
          :class="{ '!inline-flex': showSearchClose }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="flex items-center gap-0.5">
        <button type="button" @click="refresh" class="icon-btn" aria-label="Refresh board" title="Refresh">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
        <button
          type="button"
          @click="toggleView"
          class="icon-btn hidden lg:inline-flex"
          :aria-label="verticalView ? 'Switch to horizontal view' : 'Switch to vertical view'"
          :title="verticalView ? 'Horizontal view' : 'Vertical view'"
        >
          <svg v-if="!verticalView" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </header>
  <SideBarMenu :isOpen="menuOpen" @close="menuOpen = false" />
</template>
