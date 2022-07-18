<script setup>
    import AddTaskVue from './AddTask.vue';
    import Task from './Task.vue';
    import { ref, onMounted, computed } from 'vue';
    import { useStore } from 'vuex';
    import Completed from './Completed.vue';  


    const store = useStore();

    const props = defineProps({
        verticalView : false,
         list : Object,
    })     

  
    const isRenameState = ref(false);   
    const mainWrapper = ref()
    const isActionOpen = ref(false)
    const input = ref()
    const collapseTask = ref(false)

    function collapse(){
        collapseTask.value = collapseTask.value ==  true ? false : true;
    }

    function toggleActionButton(){
        isActionOpen.value = isActionOpen.value == true ? false : true;   
    }

    function handleCloseNewTask(event) {         
        if(event.target.id == 'main') {  
           isActionOpen.value = false;
        }                
    }

    function renameState(){
        isRenameState.value = true;      
    }

    function renameList(event, id){
        store.dispatch('renameList', { id : id, name : event.target.value})
        isRenameState.value = false;
        isActionOpen.value = false;
    }

    function duplicate(list){
         store.dispatch('duplicate', list)
         isActionOpen.value = false;
    }

    function deleteList(id){      
        store.dispatch('deleteList', id) 
        isActionOpen.value = false;
    }

    function deleteCompletedTask(){
        store.dispatch('removeCompletedTask', props.list.id)
        isActionOpen.value = false;
    }

    const pending = computed(() => {
         if(props.list.tasks == null) return [];
        return props.list.tasks.filter(task => {
            return task.status == 'pending';
        })
    })

    const completed = computed(() => {
        if(props.list.tasks == null) return [];
        return props.list.tasks.filter(task => {
            return task.status == 'completed';
        })
    })


    document.addEventListener('click', handleCloseNewTask)



</script>
<template>

     <div ref="board" class="relative  float-left mt-4 border w-[300px] min-h-[100px] h-max rounded-lg shadow-md"  :class="{'!w-[700px] mx-auto' :  verticalView, 'mr-8' : !verticalView}">
            <div class="p-4">
                <div class="flex items-center justify-between">
                <label v-if="!isRenameState" for="" class="text-gray-500 text-lg capitalize">{{list.name}}</label>
                <input v-else @keyup.enter ="renameList($event, list.id)" type="text" autofocus class="w-full capitalize" :value="list.name"> 
                <span @click="toggleActionButton">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 !text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                </span>
            </div>
            <div class="block mt-4" >            
                <AddTaskVue :list="list"></AddTaskVue>
            </div>
            </div>            
            <ul>
                <Task v-for="task in pending" :listId=list.id :task=task></Task>                
            </ul>

            <div @click="collapse" v-if="completed.length > 0" class="flex w-full p-4">
                <label  for="" class="text-sm">Completed ({{completed.length}})</label>
                <span  class="ml-auto" :class="{'rotate-180' : collapseTask}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </div>

            <ul v-if="completed.length > 0 && collapseTask"> 
                <Completed v-for="task in completed" :listId=list.id :task=task></Completed>                
            </ul>

            <div class="hidden absolute top-0 right-[-230px] w-70 rounded-lg p-4 shadow-md bg-white border z-10
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
                        <button @click="duplicate(list)" class="flex items-center gap-2 text-sm py-1 text-gray-500">
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
                        <button @click="deleteList(list.id)" class="text-gray-500 flex text-sm py-1 items-center gap-2">
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
    </div>  
</template>