<script setup>

import { inject } from 'vue'

const newList = inject('newList');
const { verticalView } = inject('verticalView');

const emit = defineEmits(['storeList', 'handleNewList']);

const handleNewList = ()  => {
    emit('handleNewList');
}

const storeList = (event) => {
    emit('storeList', event.target.value)
}

</script>
<template>
     <div @click="handleNewList" class="flex items-center justify-center border bg-gray-100 mt-4  w-full lg:w-[300px] min-h-[50px] mb-8 rounded-lg shadow-md h-max" :class="{ 'bg-white' : newList, '!w-[700px] mx-auto' : verticalView , 'mr-8' : !verticalView}">
               <div v-if="!newList" class="flex">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                        </svg>                              
                    </span>
                    <label for="" class="text-sm ml-2">Add new list</label>
               </div>
               <div v-else class="w-full flex justify-between px-4">
                    <input @keyup.enter="storeList($event)" autofocus type="text" class="w-full border-0 outline-none bg-transparent text-sm" placeholder="New list" />
                    <span class="text-sky-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                        </svg> 
                    </span>
            </div>
        </div>
</template>