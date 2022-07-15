<script setup>    
import List from './List.vue'
import { ref, onMounted } from 'vue';

    const props = defineProps({
        verticalView : Boolean,
    })

    const isOpen = ref(false);
    const newList = ref(false);

    const Lists = ref([]);

    const list = [
        { id : 1, name  : 'list 1', tasks : [
            {
                id : 1, name : 'task 1', dueDate : 'null' 
            },
            {
                id : 2, name : 'task 2', dueDate : 'null',              
            },
            {
                id : 3, name : 'task 3', dueDate : 'null',               
            },
            {
                id : 4, name : 'task 4', dueDate : 'null',               
            },
            {
                id : 5, name : 'task 5', dueDate : 'null',
            }
        ] },
        { id : 2, name  : 'list 2' },
        { id : 3, name  : 'list 3' },
        { id : 4, name  : 'list 4' },
        { id : 5, name  : 'list 5' },
        { id : 6, name  : 'list 6' },
        { id : 7, name  : 'list 7' },
        { id : 8, name  : 'list 8' },
        { id : 9, name  : 'list 9' },
    ]

    Lists.value = [...list];

    function toggleActionButton(){
        isOpen.value = isOpen.value == false ? true : false;
    }

    function handleCloseNewTask(event) {         
        if(event.target.id == 'main') {  
           isOpen.value = false;
            newList.value = false;
        }            
    }

    function handleNewList(){
        newList.value = true;          
    }
   
    document.addEventListener('click', handleCloseNewTask)

    onMounted(() => {
      
    })

</script>
<template>
    <div ref="mainWrapper" class="relative  w-full mx-auto px-8 mt-16" :class="{ 'mb-8' : verticalView}">
        <div v-if="!verticalView" class="group fixed overflow-hidden w-full flex">
            <div  class="w-full flex items-center  mt-4  transition-all ease-in-out duration-300 ml-[-35px] cursor-default hover:ml-0"> 
                <span class="p-1 rounded-full hover:bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                </span>
                <h1 class="text-lg text-gray-500">Main Board</h1>
            </div>                 
        </div>
        <div v-else class="group relative w-full flex">
             <div  class="flex justify-between border w-[700px] p-4  mt-8 mx-auto  rounded-lg shadow-md">
                 <h1 class="text-lg text-gray-500">Main Board</h1>
                 <span @click="toggleActionButton" class="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 !text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                </span>
                 <ul class="hidden absolute top-0 right-[120px] mt-8 w-70 rounded-lg p-4 shadow-md bg-white border z-20" :class="{'!block' : isOpen}">
                    <li>
                        <button class="flex items-center gap-2 text-sm py-1 text-gray-500">  
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </span>                          
                            Rename Board                            
                        </button>
                    </li>                   
                    <li>
                        <button class="text-gray-500 flex text-sm py-1 items-center gap-2">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                </svg>
                            </span>
                            Delete Board
                        </button>
                    </li>
                    
                </ul>
            </div>  
        </div>
        <div id="main" class="inline-flex  min-h-[calc(100vh_-_122px)] mt-12" :class="{'w-full flex flex-col justify-center !mt-0' : verticalView}">
            <List :verticalView="verticalView" v-for="list in Lists" :list="list" ></List>
            <div @click="handleNewList" class="flex items-center justify-center border bg-gray-100 mt-4  w-[300px] min-h-[50px] rounded-lg shadow-md h-max " :class="{ 'bg-white' : newList, '!w-[700px] mx-auto' : verticalView }">
               <div v-if="!newList" class="flex">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                        </svg>                              
                    </span>
                    <label for="" class="text-sm ml-2">Add new list</label>
               </div>
               <div v-else class="w-full flex justify-between px-4">
                    <input ref="input" type="text" class="w-full border-0 outline-none bg-transparent text-sm" placeholder="New list" />
                    <span class="text-sky-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                        </svg> 
                    </span>
               </div>
            </div>
        </div>
            
    </div>
</template>

