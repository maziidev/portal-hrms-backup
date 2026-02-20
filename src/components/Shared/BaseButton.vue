<template>
    <button class="btn btn-blue-main mt-2 text-[16px] font-semibold cursor-pointer rounded-2xl border border-orbit-accent" @click="handleClick">{{ label }}</button>
</template>

<script setup>


const props = defineProps({
    label: {
        type: String,
        default: "Click"
    }
})

const emit = defineEmits(['click'])
function handleClick() {
    emit('click')
}
</script>