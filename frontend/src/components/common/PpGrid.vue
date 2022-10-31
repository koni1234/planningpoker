<template>
    <div :class="classes">
        <slot />
    </div>
</template>

<script lang="ts">
import {
    FLEX_ALIGN,
    FLEX_CONTENT,
    FLEX_DIRECTION,
    FLEX_JUSTIFY,
    FLEX_WRAP,
    GRID_GUTTERS,
    SIDES,
} from '../../ui.enums';
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'PpGrid',
    props: {
        /**
         * Props gutter dimension, 8, 16, 24, 32
         */
        gutters: {
            type: String,
            default: null,
            validator: (value: GRID_GUTTERS) => {
                return Object.values(GRID_GUTTERS).includes(value);
            },
        },
        /**
         * Flex-wrap param. default nowrap
         */
        wrap: {
            type: String,
            default: FLEX_WRAP.WRAP,
            validator: (value: FLEX_WRAP) => {
                return Object.values(FLEX_WRAP).includes(value);
            },
        },
        /**
         * Flex alignment along main axis
         */
        justify: {
            type: String,
            default: null,
            validator: (value: FLEX_JUSTIFY) => {
                return Object.values(FLEX_JUSTIFY).includes(value);
            },
        },
        /**
         * Flex alignment behavior of flex grid items
         */
        align: {
            type: String,
            default: null,
            validator: (value: FLEX_ALIGN) => {
                return Object.values(FLEX_ALIGN).includes(value);
            },
        },
        /**
         * Flex alignment behavior of flex grid items
         */
        content: {
            type: String,
            default: null,
            validator: (value: FLEX_CONTENT) => {
                return Object.values(FLEX_CONTENT).includes(value);
            },
        },
        /**
         * Props for Flex grids with width 50% of relative container
         */
        direction: {
            type: String,
            default: null,
            validator: (value: FLEX_DIRECTION) => {
                return Object.values(FLEX_DIRECTION).includes(value);
            },
        },
        /**
         * Apply an equal height for all grid items
         */
        equalHeight: {
            type: Boolean,
            default: false,
        },
        /**
         * Props for Flex grids with width 100% of relative container
         */
        fullWidth: {
            type: Boolean,
            default: false,
        },
        /**
         * Props for Flex grids with width 50% of relative container
         */
        halfWidth: {
            type: Boolean,
            default: false,
        },
        /**
         * Props for Flex reverse content
         */
        reverse: {
            type: Boolean,
            default: false,
        },
        /**
         * Push grid in special position,
         * Possible values: 'top,right,bottom,eft' Usefull in nested grids
         */
        push: {
            type: String,
            default: null,
            validator: (value: SIDES) => {
                return Object.values(SIDES).includes(value);
            },
        },
    },
    setup(props) {
        const classes = computed(() => {
            return [
                'pp-grid',
                props.wrap ? `pp-grid--${props.wrap}` : null,
                props.gutters ? `pp-grid--gutters-${props.gutters}` : null,
                props.align ? `pp-grid--align-${props.align}` : null,
                props.justify ? `pp-grid--justify-${props.justify}` : null,
                props.content ? `pp-grid--content-${props.content}` : null,
                props.direction ? `pp-grid--direction-${props.direction}` : null,
                props.equalHeight ? `pp-grid--equal-height` : null,
                props.push ? `pp-grid--push-${props.push}` : null,
                props.fullWidth ? `pp-grid--full-width` : null,
                props.halfWidth ? `pp-grid--half-width` : null,
                props.reverse ? `pp-grid--reverse` : null,
            ];
        });

        return {
            classes,
        };
    },
});
</script>
<style lang="scss">
$componentName: '.pp-grid';
$gutters: 8, 16, 24, 32;

.pp-grid {
    display: flex;
    flex-direction: row;
    margin: $spacing--0;
    padding: $spacing--0;

    @each $key, $value in $flex-wrap-types {
        &--#{$key} {
            flex-wrap: #{$value};
        }
    }

    @each $key, $value in $flex-justify-types {
        &--justify-#{$key} {
            justify-content: #{$value};
        }
    }

    @each $key, $value in $flex-align-types {
        &--align-#{$key} {
            align-items: #{$value};
        }
    }

    @each $key, $value in $flex-content-types {
        &--content-#{$key} {
            align-content: #{$value};
        }
    }

    @each $key, $value in $flex-directions {
        &--direction-#{$key} {
            flex-direction: #{$value};

            @if ($value == row) or ($value == row-reverse) {
                flex-wrap: wrap;
            } @else {
                flex-wrap: nowrap;
            }
        }
    }

    @each $size in $gutters {
        &--gutters-#{$size} {
            column-gap: #{$size}px;
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

    &--reverse {
        flex-direction: row-reverse;
    }

    &--equal-height {
        > .pp-grid-item {
            display: flex;

            > * {
                flex: 1;
            }
        }
    }

    &--full-width {
        flex-basis: 100%;
    }

    &--half-width {
        flex-basis: 100%;
        max-width: 50%;
    }
}
</style>
