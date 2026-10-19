<template>
  <div
    id="modal-raname"
    class="modal-backdrop"
    :class="{ '!flex': show }"
  >
    <div class="w-[min(100%-2rem,380px)] rounded-2xl border border-white/10 bg-surface p-5 shadow-panel">
      <p class="mb-3 font-display text-sm font-semibold text-mist">Rename board</p>
      <input
        type="text"
        @keyup.enter="rename"
        :placeholder="boardName"
        class="field-input"
        autofocus
      >
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  boardName: String,
  show: Boolean
})

const emit = defineEmits(['renameBoard', 'close'])

function rename(event) {
  emit('renameBoard', event.target.value)
}

document.addEventListener('click', function (e) {
  if (e.target.id == 'modal-raname') {
    emit('close');
  }
})
</script>
