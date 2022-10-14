<script setup>
import TaskCreate from '../tasks/TaskCreate.vue';
import ListAction from './ListAction.vue'
import TaskListPending from '../tasks/TaskListPending.vue';
import TaskListCompleted from '../tasks/TaskListCompleted.vue'; 
import TaskCompletedHeading from '../tasks/TaskCompletedHeading.vue';

import { ref, inject, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({      
        list : Object,
})   

const { verticalView } = inject('verticalView');  
const isRenameState = ref(false);  
const isActionOpen = ref(false)
const input = ref()
const collapseTask = ref(false)

const collapse = () => {
    collapseTask.value = collapseTask.value ==  true ? false : true;
}

const  toggleActionButton = () => {
    isActionOpen.value = isActionOpen.value == true ? false : true;   
}

const  handleCloseNewTask = event => {         
    if(event.target.id == 'main') {  
        isActionOpen.value = false;
    }                
}

const renameState = () => {
    isRenameState.value = true;  
    isActionOpen.value = false;    
}


const  renameList = (event, id) =>  {
    console.log("clicked");
    store.dispatch('renameList', { id : id, name : event.target.value})
    isRenameState.value = false;
    isActionOpen.value = false;
}

const duplicate = () => {
        store.dispatch('duplicate',  props.list)
        isActionOpen.value = false;
}

const deleteList = () => { 
    store.dispatch('deleteList', props.list.id) 
    store.dispatch('getBoard', store.getters.selectedBoard);   
    isActionOpen.value = false;
}

const deleteCompletedTask = () => {
    store.dispatch('removeCompletedTask', props.list.id)
    isActionOpen.value = false;
}

const taskPending = computed(() => {
    if(props.list.tasks == null) return [];
    return props.list.tasks.filter(task => {
        return task.status == 'pending';
    })
})

const taskCompleted = computed(() => {
    if(props.list.tasks == null) return [];
    return props.list.tasks.filter(task => {
        return task.status == 'completed';
    })
});

document.addEventListener('click', handleCloseNewTask)

</script>

<template>

     <div ref="board" class="relative mt-4  border w-full lg:w-[300px] min-h-[100px] h-max rounded-lg shadow-md"  :class="{'!w-[700px]  mx-auto' :  verticalView, 'mr-8' : !verticalView}">

            <div class="p-4">
                <div class="flex items-center justify-between">
                    <label v-if="!isRenameState" for="" class="text-gray-500 text-lg capitalize">{{list.name}}</label>
                    <input v-else @keyup.enter ="renameList($event, list.id)" type="text" autofocus class="w-full capitalize border-b" :value="list.name"> 
                        <span @click="toggleActionButton">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 !text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </span>
                </div>                            
            <TaskCreate :list="list" />  
            </div>   

          
            <TaskListPending 
                :tasks="taskPending"  
                :listId=list.id
            />                
          

            <TaskCompletedHeading 
                v-if="taskCompleted.length > 0" 
                @collapse="collapse"              
                :count="taskCompleted.length" 
                :collapseTask="collapseTask" 
            />  
            <TaskListCompleted 
                v-if="taskCompleted.length > 0 && collapseTask" 
                :listId="list.id"
                :tasks="taskCompleted"
            />           
            <ListAction 
                    @deleteList="deleteList"
                    @duplicate="duplicate"
                    @deleteCompletedTask="deleteCompletedTask"
                    @renameState="renameState"                  
                    :isActionOpen="isActionOpen"
                    :completed="taskCompleted"
            />
    </div>  

</template>