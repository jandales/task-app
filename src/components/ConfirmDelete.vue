<template>
    <div class="hidden  w-full min-h-screen fixed z-50 top-0 left-0  bg-black bg-opacity-50 transition-all ease-in-out duration-[500ms]" :class="{'!flex items-center justify-center' : show}">
        <div class="bg-white w-[350px] min-h-[100px] p-4 border shadow-xl rounded-xl">
            <div class="flex items-center">
                <span class="text-amber-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </span>
                <h1 class="ml-2 text-sm">{{heading}}</h1>
            </div>

            <div class="text-sm text-gray-500 px-4 mt-2">{{ message }}</div>

            <div class="w-full flex justify-end items-end mt-4 gap-4">
                <button @click="confirm(false)" class="px-4 py-2 bg-gray-500 text-white text-sm rounded-md">Cancel</button>
                <button @click="confirm(true)" class="px-4 py-2 bg-rose-500 text-white text-sm rounded-md">Delete</button>
            </div>


        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    heading : String,
    message  : String,
    show : Boolean
})

const emit  =  defineEmits(['result'])

function confirm(result){
    emit('result',result)
}


</script>