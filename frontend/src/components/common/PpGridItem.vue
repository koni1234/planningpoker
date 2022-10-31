<template>
    <component :is="tag" :class="classes">
        <slot />
    </component>
</template>

<script lang="ts">
import { GRID_BEHAVIORS, SIDES, VERTICAL_ALIGNMENTS } from '../../ui.enums';
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'PpGridItem',
    props: {
        /**
         * How many cols it takes, max 12
         */
        cols: {
            type: Number,
            default: null,
            validator: (value: number) => value >= 1 && value <= 12,
        },
        /**
         * Vertical content align
         */
        align: {
            type: String,
            default: null,
            validator: (value: VERTICAL_ALIGNMENTS) => {
                return Object.values(VERTICAL_ALIGNMENTS).includes(value);
            },
        },
        /**
         * Behavior inside Grid. default nowrap
         * Possible values: 'fixed' | 'stretch' | 'no-shrink'
         */
        behavior: {
            type: String,
            default: null,
            validator: (value: GRID_BEHAVIORS) => {
                return Object.values(GRID_BEHAVIORS).includes(value);
            },
        },
        /**
         * Push item in special position
         * Possible values: 'top,left,right,bottom'
         */
        push: {
            type: String,
            default: null,
            validator: (value: SIDES) => {
                return Object.values(SIDES).includes(value);
            },
        },
        /**
         * Element tag to render in the DOM
         */
        tag: {
            type: String,
            default: 'div',
        },
    },
    setup(props) {
        const classes = computed(() => {
            return [
                'pp-grid-item',
                props.behavior ? `pp-grid-item--behavior-${props.behavior}` : null,
                props.align ? `pp-grid-item--align-${props.align}` : null,
                props.push ? `pp-grid-item--push-${props.push}` : null,
                props.cols ? `pp-grid-item--cols-${props.cols}` : null,
            ];
        });

        return {
            classes,
        };
    },
});
</script>
<style lang="scss">
$columns: 12;
$gutters: 8, 16, 24, 32;

.pp-grid-item {
    flex: 1 1 0;
    margin-bottom: $spacing--8;

    @for $i from 1 through $columns {
        &--cols-#{$i} {
            width: calc((100 / (#{$columns} / #{$i})) * 1%);
            max-width: calc((100 / (#{$columns} / #{$i})) * 1%);
            flex-basis: calc((100 / (#{$columns} / #{$i})) * 1%);
        }
    }

    @each $size in $gutters {
        .pp-grid--gutters-#{$size} > & {
            @for $i from 1 through $columns {
                &--cols-#{$i} {
                    width: calc((100 / (#{$columns} / #{$i})) * 1% - #{$size}px);
                    max-width: calc((100 / (#{$columns} / #{$i})) * 1% - #{$size}px);
                    flex-basis: calc((100 / (#{$columns} / #{$i})) * 1% - #{$size}px);
                }
            }
        }
    }

    &--push {
        &-top {
            margin-bottom: auto;
        }
        &-bottom {
            margin-top: auto;
        }
        &-left {
            margin-right: auto;
        }
        &-right {
            margin-left: auto;
        }
    }

    &--behavior {
        &-fixed {
            flex: 0 1 auto;
        }

        &-stretch {
            flex: 1 1 auto;
        }

        &-no-shrink {
            flex: 1 0 auto;
        }
    }

    &--align {
        &-top {
            align-self: flex-start;
        }

        &-middle {
            align-self: center;
        }

        &-bottom {
            align-self: flex-end;
        }
    }
}
</style>
