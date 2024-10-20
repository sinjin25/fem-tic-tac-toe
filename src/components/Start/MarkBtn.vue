<template>
    <div class="start-pick-btn-wrap">
        <div class="w-100">
            <div class="start-pick-btn py-12 br-10 clickable" :class="active === 0 ? '--active' : ''"
                @click="setActive(0)">
                <div class="mx-a" style="width: 32px; height: 32px;">
                    <IconX></IconX>
                </div>
            </div>
        </div>
        <div class="w-100">
            <div class="start-pick-btn py-12 br-10 clickable" :class="active === 1 ? '--active' : ''"
                @click="setActive(1)">
                <div class="mx-a" style="width: 32px; height: 32px;">
                    <IconO></IconO>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import IconX from '../Shared/IconX.vue';
import IconO from '../Shared/IconO.vue';
import { ref } from 'vue';
import useGameState from '@/composables/use-game-state';

const active = ref(1)
const setActive = (v: number) => {
    active.value = v
    useGameState.config.playerRole = v === 0 ? 'x' : 'o'
}
</script>

<style lang="scss" scoped>
.start-pick-btn {
    :deep(path) {
        fill: var(--light-1);
    }

    &.--active {
        background: var(--light-1);

        :deep(path) {
            fill: var(--dark-1);
        }
    }

    &:hover {
        background: rgba(168, 191, 201, .05);

        :deep(path) {
            fill: var(--light-1);
        }
    }

    &-wrap {
        background: var(--dark-1);
    }
}
</style>