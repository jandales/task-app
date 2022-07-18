<script setup>   

import List from './List.vue'
import HorizontalHeading from './HorizontalHeading.vue';

import { ref, onMounted, computed } from 'vue';
import { useStore  } from 'vuex';
import VerticalHeading from './VerticalHeading.vue';


    const store = useStore();

    const props = defineProps({
        verticalView : Boolean,
        list : [],
    })

    const newList = ref(false);    

    function handleNewList(){
        newList.value = true;          
    }

    function storeList(event){
        const name = event.target.value;
        store.dispatch('addList', name);
        store.dispatch('getBoard', store.getters.selectedBoard);
        newList.value = false;
    }  
    
    onMounted(() => {
        store.dispatch('getList');
    })  

    const board = computed(()=> {
        return store.getters.board;
    }) 

    function handleCloseNewTask(event) {         
        if(event.target.id == 'main') {  
            newList.value = false;
        }            
    }
 
    document.addEventListener('click', handleCloseNewTask)   
  

</script>
<template>
  
    <div id="mainWrapper" class="relative  w-full mx-auto px-8 mt-16" :class="{ 'mb-8' : verticalView}">
       
        <HorizontalHeading v-if="!verticalView" :board="board"></HorizontalHeading>
        <VerticalHeading v-else :board="board"></VerticalHeading>
        <div id="main" class="inline-flex  min-h-[calc(100vh_-_130px)] mt-12" :class="{'w-full flex flex-col justify-center !mt-0' : verticalView}">           
            <List v-if="board"  :verticalView="verticalView" v-for="list in board.list" :list="list" ></List>           
            <div @click="handleNewList" class="flex items-center justify-center border bg-gray-100 mt-4  w-[300px] min-h-[50px] rounded-lg shadow-md h-max" :class="{ 'bg-white' : newList, '!w-[700px] mx-auto' : verticalView , 'mr-8' : !verticalView}">
               <div v-if="!newList" class="flex">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                        </svg>                              
                    </span>
                    <label for="" class="text-sm ml-2">Add new list</label>
               </div>
               <div v-else class="w-full flex justify-between px-4">
                    <input @keyup.enter="storeList($event)" autofocus type="text" class="w-full border-0 outline-none bg-transparent text-sm" placeholder="New list" />
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

