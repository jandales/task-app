<script setup> 
    import { ref } from 'vue';

    const props = defineProps({
        isOpen: false,
    }) 

    const main = ref()
    const emit = defineEmits(['close'])

    const close = (event) => { 
         if(event.target == main.value){       
            emit('close');
        } 
    }
   
</script>
<template>
<div @click="close($event)" ref="main" id="main-wrapper" class="hidden w-full min-h-screen absolute z-20 top-0 left-0 bg-black bg-opacity-50 transition-all ease-in-out duration-[500ms]" :class="{'!block' : isOpen}">
    <div class="w-[300px] min-h-screen bg-white fixed left-[-300px] transition-all ease-in-out duration-[300ms]" :class="{'!left-0' : isOpen}" >
        <div class="border-b px-4 py-1">
           <div class="flex items-center">
                <img src="../assets/icon-logo.png" alt=""/>
                <label for="" class="ml-4  text-gray-500 text-[20px]">TaskBoard</label>
           </div>
        </div>
         <div class="border-b px-4 py-2">
           <a class="flex items-center cursor-pointer text-gray-500 text-base">
                <div class="flex items-center w-10 h-10 ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                </div>               
                Main Board
           </a>
            <a class="flex items-center cursor-pointer text-gray-500 text-base">
                <div class="flex items-center w-10 h-10 ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </div>               
                Add Board
           </a>
        </div>
    </div>
</div>
</template>