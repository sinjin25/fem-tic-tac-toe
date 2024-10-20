<template>
    <main class="temp">
        <div class="main" :class="useGameState.config.mode === 'off' ? 'd-flex ai-center jc-center' : ''">
            <div id="overlay"></div>
            <Start v-if="useGameState.config.mode === 'off'" @play="$event => startGame($event)"
                @set-player="$event => setPlayerRole($event)"></Start>
            <Game v-else class="px-24 pt-24 pt-md-0 px-md-0"></Game>
        </div>
    </main>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import Start from './components/Start/Index.vue'
import Game from './components/Game/Index.vue'
import useGameState from './composables/use-game-state';

const startGame = (mode: 'cpu' | 'player') => {
    useGameState.config.mode = mode
}

const setPlayerRole = (to: 'x' | 'o') => {
    useGameState.config.playerRole = to
}
</script>

<style scoped lang="scss">
.temp {
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
}

.main {
    display: flex;
    align-items: center;
    position: relative;
    /* width: 375px;
    height: 667px; */
    width: 768px;
    height: 1024px;
    background: var(--dark-1);
}

#overlay {
    // leave bottom out and then have it grow to fit content when putting something in
}
</style>
