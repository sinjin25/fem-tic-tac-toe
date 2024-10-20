<template>
    <div class="overlay">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.overlay {
    z-index: 999;
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, .5);
}
</style>