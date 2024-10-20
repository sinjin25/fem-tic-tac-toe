<template>
    <div class="game mx-md-a">
        <Header class="mb-64 mb-md-20" @restart="showRestart = true"></Header>
        <div class="game-board gap-20 mb-20 mx-a">
            <Tile :content="ugs.round.board[Math.floor(index / 3)][index % 3]" :iden="index" class="game-tile"
                v-for="(_, index) in 9" @play-tile="playTile(Math.floor(index / 3), index % 3)"></Tile>
        </div>
        <Score></Score>
        <Teleport to="#overlay">
            <Overlay v-if="ugs.score.lastWin !== 'off'" class="d-flex ai-center jc-center">
                <Win></Win>
            </Overlay>
            <Overlay v-if="showRestart" class="d-flex ai-center jc-center">
                <Restart @cancel="showRestart = false" @confirm="restart"></Restart>
            </Overlay>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import Header from './Header.vue';
import Tile from './Tile.vue';
import Score from './Score.vue'
import Overlay from '../Shared/Overlay.vue';
import Restart from './Restart.vue';
import Win from './Win.vue';

import ugs from '@/composables/use-game-state';
import { ref } from 'vue';

const showRestart = ref(false)

const restart = () => {
    showRestart.value = false
    ugs.resetRound()
}

const playTile = (y: number, x: number) => {
    if (ugs.round.board[y][x] !== 'off') return
    let result = ugs.setTile(y, x, ugs.round.turn)
    if (result === 'tie') {
        ugs.score.ties++
        ugs.score.lastWin = 'tie'
    } else if (result !== 'off') {
        ugs.incrementScore(ugs.round.turn)
    }

    if (ugs.config.mode === 'cpu' && ugs.round.turn !== ugs.config.playerRole) {
        let cpu: 'o' | 'x' = ugs.config.playerRole === 'x' ? 'o' : 'x'
        // do computer turn
        result = ugs.aiSetTile()
        if (result === 'tie') {
            ugs.score.ties++
            ugs.score.lastWin = 'tie'
        } else if (result !== 'off') {
            ugs.incrementScore(cpu)
        }
    }
}
</script>

<style lang="scss" scoped>
.game {
    @media only screen and (min-width: 768px) {
        max-width: 460px;
        display: flex;
        flex-direction: column;
        flex-basis: 100%;
    }

    &-board {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        height: 328px;
        width: 328px;

        @media only screen and (min-width: 768px) {
            width: 460px;
            height: 460px;
        }
    }
}
</style>