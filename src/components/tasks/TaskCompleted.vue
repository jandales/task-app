<script setup>
const props = defineProps({
  task: Object,
})
const emit = defineEmits(['taskRemove']);

const taskRemove = id => {
  emit('taskRemove', id)
}
</script>

<template>
  <li class="group mb-1">
    <div class="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 transition-colors group-hover:bg-surface-hover">
      <span class="animate-check shrink-0 text-accent">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <label class="text-sm capitalize text-mist-muted line-through">{{ task.name }}</label>
      <button
        type="button"
        @click="taskRemove(task.id)"
        class="ml-auto hidden rounded-md p-1 text-mist-faint transition-colors hover:bg-danger-soft hover:text-danger group-hover:block"
        aria-label="Delete completed task"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  </li>
</template>
