<script setup>
import { ref, onMounted, computed, provide, inject } from 'vue';
import { useStore } from 'vuex';
import List from '../lists/List.vue'

import HeadingHorizontal from '../headings/HeadingHorizontal.vue';
import HeadingVertical from '../headings/HeadingVertical.vue';
import ListCreate from '../lists/ListCreate.vue';

const store = useStore();
const { verticalView } = inject('verticalView');

const newList = ref(false);

const handleNewList = () => {
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

const board = computed(() => {
  return store.getters.board;
})

const hasLists = computed(() => {
  return board.value && board.value.list && board.value.list.length > 0;
})

function handleCloseNewTask(event) {
  if (event.target.id == 'main') {
    newList.value = false;
  }
}

document.addEventListener('click', handleCloseNewTask)

provide('newList', newList);
</script>

<template>
  <main id="mainWrapper" class="w-full px-2 pt-[4.5rem] pb-8 sm:px-3" :class="{ 'mb-8': verticalView }">
    <HeadingHorizontal v-if="!verticalView" :board="board" />
    <HeadingVertical v-else :board="board" />

    <div
      v-if="board && !hasLists && !newList"
      class="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-surface/40 px-6 py-16 text-center"
    >
      <p class="font-display text-lg font-semibold text-mist">No lists yet</p>
      <p class="mt-2 max-w-sm text-sm text-mist-muted">Create a list to start organizing tasks on this board.</p>
    </div>

    <div
      id="main"
      class="mt-4 flex min-h-[calc(100vh_-_140px)] w-full flex-col lg:mt-12 lg:inline-flex lg:w-auto lg:flex-row lg:items-start lg:overflow-x-auto lg:pb-4"
      :class="{ 'lg:!mt-0 lg:!w-full lg:!flex-col lg:overflow-x-visible': verticalView }"
    >
      <List v-if="board" v-for="list in board.list" :key="list.id" :list="list" />
      <ListCreate @handleNewList="handleNewList" @storeList="storeList" />
    </div>
  </main>
</template>
