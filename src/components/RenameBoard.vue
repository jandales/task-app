<template>
    <div id="modal-raname" class="hidden  w-full min-h-screen fixed z-50 top-0 left-0  bg-black bg-opacity-50 transition-all ease-in-out duration-[500ms]" :class="{'!flex items-center justify-center' : show}">
        <div class="bg-white w-[350px] min-h-[100px] p-4 border shadow-xl rounded-xl">
            <input  type="text" @keyup.enter="rename" class="w-full p-2" autofocus :placeholder="boardName">
        </div>
    </div>
</template>

<script setup>
const props = defineProps({  
    boardName : String,
    show : Boolean
})

const emit  =  defineEmits(['renameBoard','close'])

function rename(event){
    emit('renameBoard',event.target.value)
}

document.addEventListener('click', function(e){
   if(e.target.id == 'modal-raname'){
        emit('close');
   }
})





</script>