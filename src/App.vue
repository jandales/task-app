<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import Header from './components/Header.vue';
import Content from './components/Content.vue';
import { ref, computed } from 'vue'



const verticalView = ref(false);

  function view(){   
      verticalView.value = verticalView.value == false ? true : false;
  }



  

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
