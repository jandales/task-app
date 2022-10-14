<script setup>

const props = defineProps({      
    completed : Array,
    isActionOpen : Boolean,
    list : Object,
});

const emit = defineEmits([
    'duplicate',
    'deleteList',
    'deleteCompletedTask',
    'renameState'
]);

const duplicate = () => {
    emit('duplicate');
}

const deleteList = () => {      
    emit('deleteList');
}

const deleteCompletedTask = () => {
    emit('deleteCompletedTask');
}
const renameState = () => {
    emit('renameState');
}

</script>

<template>
      <div class="hidden 
                        absolute
                        top-8
                        right-12                       
                        w-70
                        rounded-lg 
                        p-4 shadow-md
                        bg-white
                        border
                        z-10
                        lg:top-4
                        lg:right-[-230px]
                        before:clip-path: polygon(50% 0%, 0 100%, 100% 100%)
                        before:absolute
                        before:left-0
                        before:top-2"
                        :class="{'!block' : isActionOpen}">
                <ul>
                    <li>
                        <button @click="renameState" class="flex items-center gap-2 text-sm py-1 text-gray-500">  
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </span>                          
                            Rename List                            
                        </button>
                    </li>
                    <li>
                        <button @click="duplicate()" class="flex items-center gap-2 text-sm py-1 text-gray-500">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                                    <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                                </svg>
                            </span>
                            Duplicate
                        </button>
                    </li>
                    <li>
                        <button @click="deleteList()" class="text-gray-500 flex text-sm py-1 items-center gap-2">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                </svg>
                            </span>
                            Delete List
                        </button>
                    </li>
                     <li>
                        <button @click="deleteCompletedTask" :disabled="completed.length == 0" class="text-gray-500 flex text-sm py-1 items-center gap-2" :class="{'cursor-not-allowed' : completed.length == 0}">
                             <span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                </svg>
                            </span>
                            Delete All Completed task
                        </button>
                    </li>
                </ul>
            </div>
</template>