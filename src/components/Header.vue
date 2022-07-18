<script setup>
    import { ref } from 'vue';
    import { useStore } from 'vuex';
    import SideBarMenu from '../components/SideBarMenu.vue';

    const store = useStore();
    const menuOpen = ref(false);
    const verticalView = ref(false);
     const showSearchClose = ref(false);
    const searchInput =  ref();

    const emit = defineEmits(['view'])

    function view(){
        verticalView.value = verticalView.value == false ? true :  false;
        emit('view')
    }

    function refresh(){
        store.dispatch('getBoard',store.getters.selectedBoard);
    }

    function close(){
        store.dispatch('getBoard',store.getters.selectedBoard);
        searchInput.value = null; 
        showSearchClose.value = false; 

    }

    function search() {
        if(searchInput.value == null){
            close();
            return;                    
        }
        showSearchClose.value = true;      
        store.dispatch('search', searchInput.value)
    }

    document.addEventListener('click', (event) => {
        if(event.target.id == 'nav-board' || event.target.id == 'board'){
            menuOpen.value = false;
        }      
    })

</script>

<template>
    <div class="fixed top-0 left-0 w-full flex items-center  bg-white border-b shadow-sm z-20">
        <div class="w-full flex justify-between mx-auto p-2">
            <div class="flex">
                <div @click="menuOpen=true" class="ml-4 icon-menu rounded-full hover:bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </div>
                <a href="" class="flex items-center">
                    <div class="w-10 h-10 flex items-center">
                    <img src="../assets/icon-logo.png" class="w-full h-full" alt="">                
                    </div>
                    <span class="ml-4 text-gray-500 text-[20px]">
                        TaskBoard
                    </span>
                </a>
            </div>
            <!--Search-->
            <div class="flex items-center border rounded-md w-full max-w-[500px] bg-gray-100">
                <span class="px-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </span> 
                <input type="text" @input="search" v-model="searchInput" class="w-full border-0 bg-transparent mr-4 outline-none" placeholder="Search">
                <span @click="close" class="hidden p-1 mr-4 rounded-full hover:bg-rose-400 hover:text-white" :class="{'!block' : showSearchClose}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </span>
            </div>

            <div class="flex items-center">
                <div @click="refresh" class="icon-menu">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </div>
                <!-- view --> 
                <div @click="view" class="icon-menu">
                    <svg v-if="!verticalView" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z" />
                    </svg>
                    <svg  v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                    </svg>
                </div>
                <!-- <div class="icon-menu">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div> -->
            </div>
        </div>
    </div>
      <SideBarMenu :isOpen="menuOpen"  @close="menuOpen=false"></SideBarMenu> 
</template>