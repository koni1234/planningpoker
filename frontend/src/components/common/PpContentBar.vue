<template>
    <pp-grid
        :class="classes"
        :full-width="true"
        :justify="FLEX_JUSTIFY.FLEX_END"
        :gutters="GRID_GUTTERS.SIZE_8"
    >
        <pp-content-bar-item :behavior="GRID_BEHAVIORS.FIXED" :push="SIDES.LEFT">
            <pp-text variant="header-2" :color="ALL_COLORS.SECONDARY">Planning Poker</pp-text>
        </pp-content-bar-item>
        <slot />
    </pp-grid>
</template>

<script lang="ts">
import { ALL_COLORS, FLEX_JUSTIFY, GRID_BEHAVIORS, GRID_GUTTERS, SIDES } from '../../ui.enums';
import { computed, defineComponent } from 'vue';
import PpContentBarItem from './PpContentBarItem.vue';
import PpGrid from './PpGrid.vue';
import PpText from './PpText.vue';

export default defineComponent({
    name: 'PpContentBar',
    components: {
        PpText,
        PpContentBarItem,
        PpGrid,
    },
    props: {
        /**
         * Set the content bar sticky
         */
        sticky: {
            type: Boolean,
            default: true,
        },
        /**
         * Set the content bar sticky position top/bottom
         */
        stickyPosition: {
            type: String,
            default: 'top',
            validator: (value: string) => ['null', 'top', 'bottom'].includes(value),
        },
    },
    setup(props) {
        const classes = computed<(string | null)[]>(() => {
            return [
                'pp-content-bar',
                props.sticky ? 'pp-content-bar--sticky' : null,
                props.stickyPosition ? `pp-content-bar--sticky-${props.stickyPosition}` : null,
            ];
        });

        return {
            ALL_COLORS,
            FLEX_JUSTIFY,
            GRID_BEHAVIORS,
            GRID_GUTTERS,
            SIDES,
            classes,
        };
    },
});
</script>
<style lang="scss">
.pp-content-bar {
    padding: $spacing--16 $spacing--8 $spacing--8;

    &--sticky {
        position: sticky;
        z-index: $z-index--sticky-footer;
        background-color: $color--white;

        &-top {
            border-bottom: $border--1 solid $color--grey-3;
            top: 0;
        }

        &-bottom {
            border-top: $border--1 solid $color--grey-3;
            bottom: 0;
        }
    }
}
</style>
