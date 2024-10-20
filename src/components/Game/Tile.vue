<template>
    <div class="game-tile br-10 px-28 pt-24 pb-32 clickable" :class="tileClasses" @click="playTile"
        @mouseenter="preview" @mouseleave="endPreview">
        <IconXOutline v-if="content === 'off' && showingPreview && ugs.round.turn === 'x'" class="game-tile-icon">
        </IconXOutline>
        <IconOOutline v-else-if="content === 'off' && showingPreview && ugs.round.turn === 'o'" class="game-tile-icon">
        </IconOOutline>
        <IconX v-if="content === 'x'" class="game-tile-icon"></IconX>
        <IconO v-if="content === 'o'" class="game-tile-icon"></IconO>
    </div>
</template>

<script setup lang="ts">
import ugs from '@/composables/use-game-state';
import IconO from '../Shared/IconO.vue';
import IconX from '../Shared/IconX.vue';
import { computed, ref } from 'vue';
import IconXOutline from '../Shared/IconXOutline.vue';
import IconOOutline from '../Shared/IconOOutline.vue';
import useGameState from '@/composables/use-game-state';

const props = defineProps<{
    content: 'x' | 'o' | 'off',
    iden: number,
}>()

const emit = defineEmits<{
    (e: 'playTile'): void,
}>()

const playTile = () => {
    emit('playTile')
    endPreview()
}

const showingPreview = ref(false)

const preview = () => {
    showingPreview.value = true
}

const endPreview = () => {
    showingPreview.value = false
}

const tileClasses = computed(() => {
    if (props.iden in useGameState.round.winningPlay) {
        if (useGameState.score.lastWin === 'o') return '--o'
        else if (useGameState.score.lastWin === 'x') return '--x'
        return '--tie'
    }
})
</script>

<style lang="scss" scoped>
.game-tile {
    content-sizing: border-box;
    position: relative;
    background: var(--dark-2);
    box-shadow: inset #10212A 0px -8px 0 0;

    &-icon {
        position: absolute;
        left: 50%;
        top: calc(50% - 6px);
        transform: translate(-50%, -50%);
    }

    &.--x {
        background: var(--blue-1);

        :deep(path) {
            fill: var(--dark-1);
        }
    }

    &.--o {
        background: var(--orange-1);

        :deep(path) {
            fill: var(--dark-1);
        }
    }
}
</style>