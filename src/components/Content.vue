<script setup>    
import List from './List.vue'

</script>
<template>
    <div ref="mainWrapper" class="relative w-full mx-auto px-8 mt-16">
        <div class="group relative overflow-hidden w-full flex">
            <div class="flex items-center  mt-4  transition-all ease-in-out duration-300 ml-[-35px] cursor-default hover:ml-0"> 
                <span class="p-1 rounded-full hover:bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                </span>
                <h1 class="text-lg text-gray-500">Main Board</h1>
            </div>        
        </div>
        <div id="main" class="inline-flex min-h-[calc(100vh_-_122px)]">
            <List v-for="index in 5"></List>
        </div>
            
    </div>
</template>