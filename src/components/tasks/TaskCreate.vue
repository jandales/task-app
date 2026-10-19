<template>
  <div class="mt-4 block">
    <button
      type="button"
      @click="handelNewTask"
      class="group flex w-full items-center gap-2 rounded-lg py-1.5 text-left text-mist-muted transition-colors hover:text-accent"
      :class="{ '!hidden': newTask }"
    >
      <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-transparent transition-colors group-hover:bg-accent-soft">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </span>
      <span class="text-sm">Add task</span>
    </button>
    <div class="hidden items-center gap-2" :class="{ '!flex': newTask }">
      <input
        @keyup.enter="addTask($event)"
        ref="input"
        type="text"
        class="field-input"
        placeholder="New task"
      />
      <span class="shrink-0 text-accent" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({
  list: Object,
})

const newTask = ref(false)

function handelNewTask() {
  newTask.value = true
}

const addTask = (event) => {
  const task = { id: 0, name: event.target.value, status: 'pending' }
  store.dispatch('addTask', { id: props.list.id, task: task })
  newTask.value = false;
  event.target.value = null;
}

function handleCloseNewTask(event) {
  if (event.target.id == 'main') {
    newTask.value = false;
  }
}

document.addEventListener('click', handleCloseNewTask)
</script>
