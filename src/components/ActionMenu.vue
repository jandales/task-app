<template>
        <ul v-if="board"  class="hidden absolute top-0 right-[80px] mt-2 w-70 rounded-lg p-4 shadow-md bg-white border z-30" :class="{'!block' : isOpen,  'right-[130px] !mt-8' : vertical}">
                <li>                     
                    <button @click="showRename" :disabled="board.default == 1" class="flex items-center gap-2 text-sm py-1 text-gray-500" :class="{'hover:cursor-not-allowed' : board.default == 1}">  
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </span>                          
                        Rename Board                            
                    </button>
                </li>                   
                <li>
                    <button @click="confirmDelete" :disabled="board.default == 1" class="text-gray-500 flex text-sm py-1 items-center gap-2" :class="{'hover:cursor-not-allowed' : board.default == 1}">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        Delete Board
                    </button>
                </li>                    
            </ul> 
            <RenameBoard 
                v-if="board" 
                @renameBoard="rename"
                @close="showRenameModal=false"
                :boardName="board.name"
                :show="showRenameModal">
            </RenameBoard>
            <ConfirmDelete 
                @result="destroy"
                :show="showModalDelete" 
                :heading="`Are you sure to delete this list?`" 
                :message="`All tasks and List in this Board will also be deleted. This action cannot be reverted.`">
            </ConfirmDelete>  
            
</template>
<script setup>
    import ConfirmDelete from './ConfirmDelete.vue';
    import RenameBoard from './RenameBoard.vue';
    import { ref } from 'vue';
    import { useStore } from 'vuex';

    const store = useStore();

    const props = defineProps({
        board : Object,
        isOpen : false, 
        vertical  : false,       
    })

    const showModalDelete = ref(false);
    const showRenameModal = ref(false)

    const emit = defineEmits(['close']);

    function close(event){       
        if(event.target.id == 'main' || event.target.id == 'mainWrapper') {  
             emit('close')
        }    
       
    }

    document.addEventListener('click',close);  

    function confirmDelete(){
        showModalDelete.value = true;
        emit('close') 
    }
    function showRename(){
        showRenameModal.value = true;
        emit('close') 
    }

    function rename(name){
        showRenameModal.value = false;
        store.dispatch('renameBoard', {id : props.board.id, name : name})
        store.dispatch('getBoard', store.getters.selectedBoard)    
    }

    function destroy(result){  
        showModalDelete.value = false;
        if(result == true){           
            store.dispatch('deleteBoard', props.board.id)
            store.dispatch('selectedBaord', 0);       
            store.dispatch('getBoard', store.getters.selectedBoard)
        }
       
    }


   

</script>