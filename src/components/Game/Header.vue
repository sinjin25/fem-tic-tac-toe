<template>
    <div class="game-header">
        <!-- header -->
        <div>
            <IconLogo></IconLogo>
        </div>
        <div
            class="game-header-turn gap-10 d-flex ai-center px-16 pt-6 pt-md-12 pb-12 pb-md-20 mx-a br-5 fz-md-16 fw-700">
            <div class="game-header-turn-icon">
                <IconX v-if="ugs.round.turn === 'x'"></IconX>
                <IconO v-else></IconO>
            </div>
            <div>turn</div>
        </div>
        <div class="game-header-restart px-12 pt-12 pb-16 ml-a br-5 clickable" @click="restart">
            <IconRestart class="game-header-restart-icon"></IconRestart>
        </div>
    </div>
</template>

<script setup lang="ts">
import IconLogo from '../Shared/IconLogo.vue';
import IconRestart from '../Shared/IconRestart.vue';
import IconX from '../Shared/IconX.vue';
import IconO from '../Shared/IconO.vue';
import ugs from '@/composables/use-game-state';

const emit = defineEmits<{
    (e: 'restart'): void,
}>()

const restart = () => {
    emit('restart')
}
</script>

<style lang="scss" scoped>
.game-header {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;

    &-turn {
        color: var(--light-1);
        background: var(--dark-2);
        box-shadow: inset #10212A 0 -4px 0 0;

        &-icon {
            height: 16px;
            width: 16px;

            :deep(path) {
                fill: var(--light-1);
            }
        }
    }

    &-restart {
        box-sizing: border-box;
        position: relative;
        background: var(--light-2);
        box-shadow: inset var(--light-1) 0 -4px 0 0;

        height: 40px;
        width: 40px;

        :deep(path) {
            fill: #1F3641;
        }

        &-icon {
            position: absolute;
            left: 50%;
            top: calc(50% - 4px);
            transform: translate(-50%, -50%);
            width: 16px;
            height: 16px;
        }

        @media only screen and (min-width: 768px) {
            height: 52px;
            width: 52px;

            &-icon {
                width: 20px;
                height: 20px;
            }
        }
    }
}
</style>