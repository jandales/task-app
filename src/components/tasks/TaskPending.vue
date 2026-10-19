<template>
  <li class="group mb-1">
    <div class="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 transition-colors group-hover:bg-surface-hover">
      <input
        @change="changeStatus"
        type="radio"
        class="h-4 w-4 shrink-0 cursor-pointer accent-accent"
        aria-label="Mark task complete"
      />
      <input
        @keyup.enter="renameTask($event)"
        @blur="renameTask($event)"
        class="w-full border-0 bg-transparent text-sm capitalize text-mist outline-none"
        :value="task.name"
      >
      <span class="hidden shrink-0 text-mist-faint group-hover:block" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </span>
    </div>
  </li>
</template>

<script setup>
const props = defineProps({
  task: Object,
})

const emit = defineEmits(['renameTask', 'changeStatus']);

const renameTask = (event) => {
  emit('renameTask', props.task.id, event.target.value);
}

const changeStatus = () => {
  emit('changeStatus', props.task.id);
}
</script>
