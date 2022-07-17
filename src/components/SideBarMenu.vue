<script setup> 
    import { ref, computed } from 'vue'
    import { useStore } from 'vuex'
    import Board from './Board.vue';

     const store = useStore();

    const props = defineProps({
        isOpen: false,
    }) 

    const main = ref()
    const newBoard = ref(false);  
    const input = ref()
    
    const emit = defineEmits(['close'])

    const handleNewBoard = () => {
        newBoard.value =  newBoard.value == false ? true : false;
    }


    const close = (event) => { 
         if(event.target == main.value){       
            emit('close');
            newBoard.value =false;
        } 
    }  


    const addBoard = () => {
        store.dispatch('addBoard',input.value)
        input.value = null;
        newBoard.value = false
    }  

    const boards =  computed(()=> {
        return store.getters.boards
    })
 

   
</script>
<template>
<div @click="close($event)" ref="main" id="main-wrapper" class="hidden w-full min-h-screen fixed z-20 top-0 left-0 bg-black bg-opacity-50 transition-all ease-in-out duration-[500ms]" :class="{'!block' : isOpen}">
    <div id="sidebar" class="w-[300px] min-h-screen bg-white fixed left-[-300px] transition-all ease-in-out duration-[300ms]" :class="{'!left-0' : isOpen}" >
        <div class="border-b px-4 py-1">
           <div class="flex items-center">
                <img src="../assets/icon-logo.png" alt=""/>
                <label for="" class="ml-4  text-gray-500 text-[20px]">TaskBoard</label>
           </div>
        </div>
         <div class="border-b px-4 py-2">
            <Board v-for="board in boards" :board="board"></Board>           

            <a v-if="!newBoard" @click="handleNewBoard" class="flex items-center cursor-pointer text-gray-500 text-base">
                <div class="flex items-center w-10 h-10 ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </div>               
                Add Board
           </a>
           <div v-else class="flex w-full">
                <input @keyup.enter="addBoard()" type="text" class="w-full"  v-model="input" placeholder="New Board">
                <span class="flex items-center w-10 h-10 ">
                     <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </span>
           </div>
        </div>
    </div>
</div>
</template>