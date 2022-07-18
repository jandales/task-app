<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import Header from './components/Header.vue';
import Content from './components/Content.vue';
import { ref, onMounted  } from 'vue'
import { useStore } from 'vuex';

const store = useStore();
const verticalView = ref(false);

function view(){   
    verticalView.value = verticalView.value == false ? true : false;
}

function makeStorage(){
    const data =  [{ id : 0, name : 'Main board', default : 1, list : [{id: 1, name : 'List',  tasks : [] }] }]; 
    if(localStorage.getItem('boards') == null){
       localStorage.setItem("boards", JSON.stringify(data));
       localStorage.setItem("selectedBoard", 0);    
    }
    store.dispatch('getBoard', store.getters.selectedBoard);
}

onMounted(() => {
    makeStorage()
})

</script>

<template>
  <Header  @view="view"></Header>
  <Content :verticalView="verticalView"></Content>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
