<template>
    <div class="game-score gap-20">
        <div class="game-score-tile br-10 px-30 py-12 ta-center">
            <div class="fz-12 fz-md-14">X {{ player === 'x' ? '(P1)' : '(P2)' }}</div>
            <div class="fw-700 fz-20 fz-md-24">{{ useGameState.score.x }}</div>
        </div>
        <div class="game-score-tile br-10 px-30 py-12 ta-center">
            <div class="fz-12 fz-md-14">Ties</div>
            <div class="fw-700 fz-20 fz-md-24">{{ useGameState.score.ties }}</div>
        </div>
        <div class="game-score-tile br-10 px-30 py-12 ta-center">
            <div class="fz-12 fz-md-14">O {{ player === 'o' ? '(P1)' : '(P2)' }}</div>
            <div class="fw-700 fz-20 fz-md-24">{{ useGameState.score.o }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import useGameState from '@/composables/use-game-state';
import { computed } from 'vue';

const player = computed(() => {
    return useGameState.config.playerRole
})
</script>

<style lang="scss" scoped>
.game-score {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    color: var(--dark-1);

    >*:nth-child(2) {
        background: var(--light-1);
    }

    >*:nth-child(3) {
        background: var(--orange-1);
    }

    &-tile {
        background: var(--blue-1);
    }
}
</style>