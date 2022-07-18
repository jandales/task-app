<template>
    <div id="nav-board" class="group w-full flex items-center justify-between">
                <div id="board" @click="getBoard(board.id)"   class="w-full flex items-center cursor-pointer text-gray-500 text-base">
                    <div class="flex items-center w-10 h-10">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>               
                    {{ board.name }}
                </div>  
            </div>
</template>
<script setup>  
    import { useStore } from 'vuex';   
    const store = useStore();

    const props = defineProps({
        board : Object,        
    })

    const emit = defineEmits(['getList'])

    function getBoard(id){
        store.dispatch('getBoard', id);   
        store.dispatch('selectedBaord', id);
        store.dispatch('getList')
    } 



</script>