<template>
    <div class="game-restart w-100 d-flex jc-center ai-center py-66">
        <div class="game-restart-msg fw-700 fz-24 fz-md-40 pb-30">Restart Game?</div>
        <div class="d-flex jc-center gap-16">
            <button class="game-restart-btn fz-16 fw-700 pt-14 pb-18 px-16 br-10" @click="emit('cancel')">No,
                Cancel</button>
            <button class="game-restart-btn fz-16 fw-700 pt-14 pb-18 px-16 br-10" @click="emit('confirm')">Yes,
                Restart</button>
        </div>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
    (e: 'cancel'): void,
    (e: 'confirm'): void,
}>()
</script>

<style lang="scss" scoped>
.game-restart {
    background: var(--dark-2);
    flex-direction: column;
    color: var(--dark-1);

    &-msg {
        color: var(--light-1);
        letter-spacing: 1.5px;

        @media only screen and (min-width: 768px) {
            letter-spacing: 2.5px;
        }
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
}
</style>