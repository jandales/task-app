<template>
    <ul>
        <TaskPending
            v-for="task in tasks"
            :key="task.id"            
            :task="task" 
            @renameTask="renameTask" 
            @changeStatus="changeStatus"
        />      
    </ul>  
</template>
<script setup>

import { useStore } from 'vuex';

import TaskPending from './TaskPending.vue';

const store =  useStore();

const props = defineProps({
    listId : 0,
    tasks : Array,
})

const  renameTask = ( id, name) => {
    const params = {id : props.listId, taskId : id, name : name}    
    store.dispatch('renameTask', params)      
}

const changeStatus = (id) => {
    const params = {id : props.listId, taskId : id } 
    store.dispatch('changeStatusTask', params)
}

</script>