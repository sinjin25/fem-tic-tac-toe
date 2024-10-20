<template>
    <div class="game-win w-100 pt-40 px-48 pb-48 ta-center">
        <div class="game-win-player-text fz-14 fz-md-16 mb-16">
            player 1 wins!
        </div>
        <div class="game-win-text d-inline-flex gap-8 gap-md-24 ai-center mb-24" :class="winnerClass">
            <div class="game-win-icon" v-if="gameState !== 'tie' && gameState !== 'off'">
                <IconX v-if="gameState === 'x'"></IconX>
                <IconO v-else-if="gameState === 'o'"></IconO>
            </div>
            <div class="fw-700 fz-24 fz-md-40">{{ ['x', 'o'].includes(gameState) ? 'Takes the round' : 'Round tied' }}
            </div>
        </div>
        <div class="d-flex jc-center gap-16">
            <button class="game-win-btn fz-16 fw-700 pt-14 pb-18 px-16 br-10" @click="quit">quit</button>
            <button class="game-win-btn fz-16 fw-700 pt-14 pb-18 px-16 br-10" @click="nextRound">next round</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import IconX from '../Shared/IconX.vue';
import IconO from '../Shared/IconO.vue';
import useGameState from '@/composables/use-game-state';

const gameState = computed(() => {
    if (useGameState.score.lastWin === 'x') return 'x'
    else if (useGameState.score.lastWin === 'o') return 'o'
    else if (useGameState.score.lastWin === 'tie') return 'tie'
    return 'off'
})

const winnerClass = computed(() => {
    let classes: Array<string> = []

    if (gameState.value === 'x') classes.push('--x')
    else if (gameState.value === 'o') classes.push('--o')
    else if (gameState.value === 'tie') classes.push('--tie')

    return classes.join(' ')
})

const quit = () => {
    useGameState.quit()
}

const nextRound = () => {
    useGameState.nextRound()
}
</script>

<style lang="scss" scoped>
.game-win {
    background: var(--dark-2);

    &-icon {
        width: 30px;
        height: 30px;

        @media only screen and (min-width: 768px) {
            width: 64px;
            height: 64px;
        }
    }

    &-player-text {
        color: var(--light-1);
    }

    &-btn {
        background: var(--light-1);
        color: var(--dark-1);
        box-shadow: inset #6B8997 0 -4px 0 0;
        letter-spacing: 1px;

        &:nth-of-type(2) {
            background: var(--orange-1);
            box-shadow: inset #CC8B13 0 -4px 0 0;
        }
    }

    &-text {
        letter-spacing: 1.5px;

        &.--o {
            color: var(--orange-1);

            :deep(path) {
                fill: var(--orange-1);
            }
        }

        &.--x {
            color: var(--blue-1);

            :deep(path) {
                fill: var(--blue-1);
            }
        }

        &.--tie {
            color: var(--light-1);
        }

        @media only screen and (min-width: 768px) {
            letter-spacing: 2.5px;
        }
    }
}
</style>