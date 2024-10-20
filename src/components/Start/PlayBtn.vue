<template>
    <div class="start-play w-100 d-flex gap-16 gap-md-20 fd-column">
        <button class="start-play-btn fz-16 fz-md-20 pt-14 pt-16 pb-22 pb-md-26 br-15 fw-700" @click="start('cpu')">new
            game (vs
            CPU)</button>
        <button class="start-play-btn fz-16 fz-md-20 pt-14 pt-16 pb-22 pb-md-26 br-15 fw-700"
            @click="start('player')">new game (vs
            player)</button>
    </div>
</template>

<script setup lang="ts">
import useGameState from '@/composables/use-game-state';

const start = (mode: 'cpu' | 'player') => {
    useGameState.config.mode = mode
    useGameState.resetRound()
}
</script>

<style lang="scss" scoped>
.start-play {
    flex-basis: 100%;

    &-btn {
        color: var(--dark-1);
        letter-spacing: 1px;
        line-height: 1.25;

        @media only screen and (min-width: 768px) {
            letter-spacing: 1.25px;
        }
    }

    & *:first-child {
        background: var(--orange-1);
        box-shadow: inset #CC8B13 0 -8px 0 0;

        &:hover {
            background: var(--orange-2);
        }
    }

    & *:nth-child(2) {
        background: var(--blue-1);
        box-shadow: inset #118C87 0 -8px 0 0;

        &:hover {
            background: var(--blue-2);
        }
    }
}
</style>