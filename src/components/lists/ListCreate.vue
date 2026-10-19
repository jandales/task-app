<script setup>
import { inject } from 'vue'

const newList = inject('newList');
const { verticalView } = inject('verticalView');

const emit = defineEmits(['storeList', 'handleNewList']);

const handleNewList = () => {
  emit('handleNewList');
}

const storeList = (event) => {
  emit('storeList', event.target.value)
}
</script>

<template>
  <div
    @click="handleNewList"
    class="mt-4 mb-8 flex min-h-[52px] w-full shrink-0 cursor-pointer items-center justify-center rounded-xl border border-dashed border-white/15 bg-surface/40 transition-colors duration-200 hover:border-accent/40 hover:bg-accent-soft lg:w-[300px]"
    :class="{
      '!border-solid !border-white/10 !bg-surface': newList,
      '!mx-auto !w-full !max-w-[700px]': verticalView,
      'lg:mr-5': !verticalView
    }"
  >
    <div v-if="!newList" class="flex items-center gap-2 text-mist-muted">
      <span class="text-accent">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </span>
      <span class="text-sm font-medium">Add new list</span>
    </div>
    <div v-else class="flex w-full items-center justify-between gap-2 px-4" @click.stop>
      <input
        @keyup.enter="storeList($event)"
        autofocus
        type="text"
        class="w-full border-0 bg-transparent text-sm text-mist outline-none placeholder:text-mist-faint"
        placeholder="New list name"
      />
      <span class="text-accent" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </span>
    </div>
  </div>
</template>
