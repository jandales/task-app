<template>
   <div  class="relative group  w-full flex justify-between items-center lg:fixed lg:left-0 lg:px-8 ">
            <div  class="flex items-center">
                <h1 v-if="board" class="text-lg text-gray-500">{{board.name}}</h1>
            </div>  
             <span @click="toggleActionButton" class="block cursor-pointer">                   
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 !text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>                    
            </span> 
            <BoardActionMenu  :isOpen="isOpen" :board="board" @close="isOpen=false" />            
    </div>
</template>

<script setup>

import BoardActionMenu from '../boards/BoardActionMenu.vue';

import { ref } from 'vue';

const props = defineProps({
    board : Object
})

const isOpen = ref(false)

const toggleActionButton = () => {
    isOpen.value = isOpen.value == false ? true : false;
}

</script>