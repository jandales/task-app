<template>
    <li  class="mb-2 group">
            <div class="w-full flex px-4 py-2 border-b border-t border-transparent group-hover:border-gray-100 group-hover:shadow-md">
                <input @change="changeStatus" type="radio" id=""/>

                <input for="" 
                    @keyup.enter="renameTask($event)" 
                    @blur="renameTask($event)" 
                    class="ml-2 w-full capitalize text-sm" :value="task.name">

                <span class="hidden group-hover:block">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </span>

            </div>
    </li>
</template>
<script setup>
    import { useStore } from 'vuex';

    const store =  useStore();

    const props = defineProps({
        listId : 0,
        task : Object,
    })

    function renameTask(event) {
        const params = {id : props.listId, taskId : props.task.id, name : event.target.value}    
        store.dispatch('renameTask', params)
      
    }

    function changeStatus(){
        const params = {id : props.listId, taskId : props.task.id } 
        store.dispatch('changeStatusTask', params)
    }

</script>