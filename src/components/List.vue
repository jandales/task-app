<script setup>
    import { ref, onMounted } from 'vue';
    
    const newTask = ref(false)   
    const mainWrapper = ref()
    const isActionOpen = ref(false)

    function toggleActionButton(){
        isActionOpen.value = isActionOpen.value == true ? false : true;
   
    }

    function handelNewTask(){
        newTask.value = true       
    }

    function handleCloseNewTask(event) {         
        if(event.target.id == 'main') {          
           newTask.value = false;
           isActionOpen.value = false;
        }            
    }
   
    document.addEventListener('click', handleCloseNewTask)

</script>
<template>
     <div ref="board" class="relative float-left mt-4 mr-8 border w-[300px] min-h-[100px] h-max rounded-lg shadow-md">
            <div class="p-4">
                     <div class="flex items-center justify-between">
                <label for="" class="text-gray-500 text-lg">Task 1</label>
                <span @click="toggleActionButton">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 !text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                </span>
            </div>
            <div class="block mt-4" >
                <div @click="handelNewTask" ref="input" class="group flex items-center gap-2" :class="{'!hidden' : newTask}">
                    <span class="block p-2 rounded-full group-hover:bg-sky-500 group-hover:!text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                        </svg>                              
                    </span>
                    <label for="" class="group-hover:text-sky-500 text-sm">Add task</label>
                </div>
                <div class="items-center hidden" :class="{'!flex' : newTask}" >
                    <input ref="input" type="text" class="w-full border-0 outline-none text-sm" placeholder="New task" />
                    <span class="text-sky-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                        </svg> 
                    </span>
                </div>            
            </div>
            </div>            
            <ul>
                    <li class="mb-2 group">
                        <div class="w-full flex px-4 py-2 border-b border-t border-transparent group-hover:border-gray-100 group-hover:shadow-md">
                            <input type="radio" id=""/>
                            <input for="" class="ml-2 w-full capitalize text-sm" value="my first task" >
                            <span class="hidden group-hover:block">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </span>
                        </div>
                    </li>
            </ul>
            <div class="hidden absolute top-0 right-[-230px] w-70 rounded-lg p-4 shadow-md bg-white border z-10
                        before:clip-path: polygon(50% 0%, 0 100%, 100% 100%)
                        before:absolute
                        before:left-0
                        before:top-2"
                        :class="{'!block' : isActionOpen}">
                <ul>
                    <li>
                        <button class="flex items-center gap-2 text-sm py-1 text-gray-500">  
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </span>                          
                            Rename List                            
                        </button>
                    </li>
                    <li>
                        <button class="flex items-center gap-2 text-sm py-1 text-gray-500">
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
                        <button class="text-gray-500 flex text-sm py-1 items-center gap-2">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                </svg>
                            </span>
                            Delete List
                        </button>
                    </li>
                     <li>
                        <button class="text-gray-500 flex text-sm py-1 items-center gap-2">
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
        </div>  
</template>