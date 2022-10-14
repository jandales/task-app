<template>
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
                    <input @keyup.enter="addTask($event)" ref="input" type="text" class="w-full border-0 outline-none text-sm" placeholder="New task" />
                    <span class="text-sky-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                        </svg> 
                    </span>
    </div>    
</div>   
</template>
<script setup>

import { ref } from 'vue';
import { useStore } from 'vuex';

    const store = useStore();

    const props = defineProps({
        list : Object,
    })

    const newTask = ref(false)

    function handelNewTask() {
        newTask.value = true       
    }

    const addTask = (event) => {
        const  task = { id : 0, name : event.target.value, status : 'pending' }
        store.dispatch('addTask',{ id : props.list.id, task : task })
        newTask.value = false;
        event.target.value = null;
    }



    function handleCloseNewTask(event) {         
        if(event.target.id == 'main') {          
           newTask.value = false;          
        } 
    }

    document.addEventListener('click', handleCloseNewTask)

 

</script>