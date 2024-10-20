<template>
    <div class="start-pick px-24 pt-24 pb-30 br-15">
        <div class="mb-24 fw-700 fz-16 ta-center">Pick player 1's mark</div>
        <MarkBtn class="d-flex py-8 px-8 br-10 mb-16"></MarkBtn>
        <div class="ta-center">remember: x goes first</div>
    </div>
</template>

<script setup lang="ts">
import MarkBtn from './MarkBtn.vue';
</script>

<style lang="scss" scoped>
.start-pick {
    color: var(--light-1);
    background: var(--dark-2);
    box-shadow: inset #10212A 0px -8px 0px 0px;
}
</style>