<script setup>
import Header from './components/layouts/Header.vue';
import Content from './components/layouts/Content.vue';
import { ref, onMounted, provide } from 'vue'
import { useStore } from 'vuex';

const store = useStore();
const verticalView = ref(false);

const makeStorage = () => {
  const data = [{ id: 0, name: 'Main board', default: 1, list: [{ id: 1, name: 'List', tasks: [] }] }];

  store.dispatch('getBoards')

  const boards = store.getters.boards;

  if (boards == null || boards.length == 0) {
    localStorage.setItem("boards", JSON.stringify(data));
    localStorage.setItem("selectedBoard", 0);
  }

  store.dispatch('getBoard', store.getters.selectedBoard);
}

onMounted(() => {
  makeStorage()
})

provide('verticalView', {
  verticalView,
  toggleView: () => {
    verticalView.value = verticalView.value == false ? true : false;
  }
});
</script>

<template>
  <div class="app-shell">
    <Header />
    <Content />
  </div>
</template>
