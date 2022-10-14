<script setup>  
import { ref, onMounted, watch, computed, provide, inject } from 'vue';
import { useStore  } from 'vuex';
import List from '../lists/List.vue'

import HeadingHorizontal from '../headings/HeadingHorizontal.vue';
import HeadingVertical from '../headings/HeadingVertical.vue';
import ListCreate from '../lists/ListCreate.vue';


const store = useStore();
const { verticalView } = inject('verticalView');

const newList = ref(false);    

const handleNewList = () =>{
    newList.value = true;          
}

const storeList = (name) => {            
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

provide('newList', newList);

</script>

<template>  

    <div id="mainWrapper" class=" w-full mx-auto px-8 mt-20" :class="{ 'mb-8' : verticalView}"> 
        <HeadingHorizontal v-if="!verticalView" :board="board" />        
        <HeadingVertical v-else :board="board" />
        <div id="main" class="w-full flex flex-col mt-4 min-h-[calc(100vh_-_130px)] lg:w-auto lg:inline-flex lg:flex-row lg:mt-8" :class="{'lg:!w-full lg:!flex-col lg:!mt-0' : verticalView}">             
            <List v-if="board"  v-for="list in board.list" :list="list" />           
            <ListCreate  @handleNewList="handleNewList"  @storeList="storeList"/>
        </div>            
    </div>
</template>

