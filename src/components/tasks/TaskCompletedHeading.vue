<script setup>
const props = defineProps({
    count : Number,
    collapseTask : Boolean
});
const emit = defineEmits(['collapse']);
const collapse = () => {
    emit('collapse');
}


</script>
<template>
      <div @click="collapse" class="flex w-full p-4">
                <label  for="" class="text-sm">Completed ({{ count }})</label>
                <span  class="ml-auto" :class="{'rotate-180' : collapseTask}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </span>                
            </div>
</template>