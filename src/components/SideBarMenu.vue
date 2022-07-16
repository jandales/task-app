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
            <!-- <div  v-for="board in boards" class="group flex items-center justify-between">
                <div v-if="!isEdit"  class="flex items-center cursor-pointer text-gray-500 text-base">
                    <div class="flex items-center w-10 h-10">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>               
                    {{ board.name }}
                </div>
                <div v-else class="flex items-center w-10 h-10">
                    <div class="flex items-center w-10 h-10 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>     
                    <input @keyup.enter="updateBoard($event,board.id)" class="text-gray-500 text-base" type="text " name="" :value="board.name">
                </div>

                <div v-if="!board.default" class="hidden  items-center gap-2 group-hover:flex">
                    <span @click="edit" class="text-gray-400 hover:cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </span>
                    <span @click="deleteBoard(board.id)" class="text-gray-400 hover:cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </span>
                </div>
            </div> -->
            
          


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