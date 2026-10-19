<template>
  <div
    class="modal-backdrop"
    :class="{ '!flex': show }"
  >
    <div class="w-[min(100%-2rem,380px)] rounded-2xl border border-white/10 bg-surface p-5 shadow-panel">
      <div class="flex items-start gap-3">
        <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </span>
        <div>
          <h2 class="font-display text-base font-semibold text-mist">{{ heading }}</h2>
          <p class="mt-2 text-sm text-mist-muted">{{ message }}</p>
        </div>
      </div>

      <div class="mt-5 flex justify-end gap-2">
        <button type="button" @click="confirm(false)" class="btn-ghost">Cancel</button>
        <button type="button" @click="confirm(true)" class="btn-danger">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  heading: String,
  message: String,
  show: Boolean
})

const emit = defineEmits(['result'])

function confirm(result) {
  emit('result', result)
}
</script>
