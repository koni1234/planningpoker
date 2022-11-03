<template>
    <pp-grid-item class="pp-content-bar-item" :behavior="GRID_BEHAVIORS.FIXED">
        <slot />
    </pp-grid-item>
</template>

<script lang="ts">
import { GRID_BEHAVIORS } from '../../ui.enums';
import PpGridItem from './PpGridItem.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'PpContentBarItem',
    components: {
        PpGridItem,
    },
    setup() {
        return {
            GRID_BEHAVIORS,
        };
    },
});
</script>
<style lang="scss">
.pp-content-bar-item {
    margin-bottom: $spacing--8;
    margin-left: $spacing--4;
}
</style>
