<template>
    <div class="group flex items-center justify-between">
                <div @click="getBoard(board.id)" v-if="!isEdit"  class="flex items-center cursor-pointer text-gray-500 text-base">
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
                    <input @keyup.enter="updateBoard($event,board.id)" ref="input" class="text-gray-500 text-base" type="text " name="" :value="board.name" autofocus>
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
            </div>
</template>
<script setup>

    import { ref, computed } from 'vue' 
    import { useStore } from 'vuex';   
    const store = useStore();

    const props = defineProps({
        board : Object,        
    })

    const emit = defineEmits(['getList'])


    const isEdit = ref(false);
    const input = ref(null)

    const edit = () => {
        isEdit.value = true;    
    }

    function getBoard(id){
        store.dispatch('getBoard', id);
        console.log(store.getters.board);
    }

    const updateBoard = (event, id) => {
        store.dispatch('renameBoard',{ name : event.target.value, id : id})
        isEdit.value = false;
    }
    const deleteBoard = (id) => {
        store.dispatch('deleteBoard', id);        
    }

    function handleCloseNewTask(event) {  
        if(event.target.id == 'main-wrapper' || event.target.id == 'sidebar' ) {  
            isEdit.value = false;
        }            
    } 
    


    document.addEventListener('click', handleCloseNewTask)

</script>