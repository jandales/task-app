<template>
    <ul>
        <TaskCompleted 
            v-for="task in tasks" 
            :key="task.id" 
            :task="task" 
            @taskRemove=taskRemove
        />
    </ul>
</template>
<script setup>
import { useStore } from 'vuex';
import TaskCompleted from './TaskCompleted.vue';

const store =  useStore();

const props = defineProps({
    listId : Number,
    tasks : Array,
})

const taskRemove = id => {
    const params = {id : listId, taskId : id}    
    store.dispatch('removeTask', params)      
}


</script>