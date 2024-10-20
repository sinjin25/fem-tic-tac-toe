<template>
    <div class="screen gap-32 gap-md-40">
        <div class="ta-center">
            <IconLogo></IconLogo>
        </div>
        <Pick class=""></Pick>
        <PlayBtn></PlayBtn>
    </div>
</template>

<script setup lang="ts">
import IconLogo from '../Shared/IconLogo.vue';
import PlayBtn from './PlayBtn.vue';
import Pick from './Pick.vue';
</script>

<style lang="scss" scoped>
.screen {
    display: flex;
    flex-direction: column;
    width: 327px;
    height: 429px;

    @media only screen and (min-width: 768px) {
        width: 460px;
        height: unset;
    }
}
</style>