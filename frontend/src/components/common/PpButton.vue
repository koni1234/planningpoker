<template>
    <component :is="componentTag" :class="classes" :disabled="disabled" :href="href">
        <slot>
            {{ value }}
        </slot>
    </component>
</template>

<script lang="ts">
import { BUTTON_SIZES, BUTTON_VARIANTS } from '../../ui.enums';
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'PpButton',
    props: {
        /**
         * Text to show
         */
        value: {
            type: [String, Number],
            default: null,
        },
        /**
         * Button size xs/s/m
         */
        size: {
            type: String,
            default: BUTTON_SIZES.MEDIUM,
            validator: (value: BUTTON_SIZES) => {
                return Object.values(BUTTON_SIZES).includes(value);
            },
        },
        /**
         * Button variant
         */
        variant: {
            type: String,
            default: BUTTON_VARIANTS.TERTIARY_OUTLINE,
            validator: (value: BUTTON_VARIANTS) => {
                return Object.values(BUTTON_VARIANTS).includes(value);
            },
        },
        /**
         * Disabled status
         */
        disabled: {
            type: Boolean,
            default: null,
        },
        /**
         * Display button inline
         */
        inline: {
            type: Boolean,
            default: false,
        },
        /**
         * Target URL of the link for link variant or tag a
         */
        href: {
            type: String,
            default: null,
        },
        /**
         * Component html tag: button/a
         */
        tag: {
            type: String,
            default: 'button',
            validator: (value: string) => {
                return Object.values(['a', 'button']).includes(value);
            },
        },
    },
    setup(props) {
        const isLink = props.variant === BUTTON_VARIANTS.LINK || props.tag === 'a';

        const classes = computed(() => {
            return [
                'pp-button',
                props.size ? `pp-button--size-${props.size}` : null,
                props.variant ? `pp-button--${props.variant}` : null,
                props.disabled ? `disabled` : null,
                props.inline ? `is-inline--f` : null,
            ];
        });

        const componentTag = isLink ? 'a' : 'button';

        return {
            componentTag,
            classes,
        };
    },
});
</script>
<style lang="scss">
$button-primary: (
    'color': $color--white,
    'border-color': $color--primary-dark,
    'background-color': $color--primary,
);

$button-primary--hover: (
    'background-color': $color--primary-dark,
);

$button-primary-outline: (
    'color': $color--primary,
    'border-color': $color--primary-dark,
    'background-color': $color--white,
);

$button-primary-outline--hover: (
    'color': $color--primary-dark,
    'background-color': $color--grey-2,
);

$button-secondary: (
    'color': $color--white,
    'background-color': $color--secondary,
    'border-color': $color--secondary-dark,
);

$button-secondary--hover: (
    'background-color': $color--secondary-dark,
);

$button-secondary-outline: (
    'color': $color--secondary,
    'background-color': $color--white,
    'border-color': $color--secondary-dark,
);

$button-secondary-outline--hover: (
    'color': $color--secondary-dark,
    'background-color': $color--grey-2,
);

$button-tertiary: (
    'color': $color--white,
    'background-color': $color--tertiary,
    'border-color': $color--tertiary-dark,
);

$button-tertiary--hover: (
    'background-color': $color--tertiary-dark,
);

$button-tertiary-outline: (
    'color': $color--black,
    'background-color': $color--white,
    'border-color': $color--grey-4,
);

$button-tertiary-outline--hover: (
    'color': $color--tertiary-dark,
    'background-color': $color--grey-2,
);

$button-danger: (
    'color': $color--white,
    'background-color': $color--danger,
    'border-color': $color--danger-dark,
);

$button-danger--hover: (
    'background-color': $color--danger-dark,
);

$button-danger-outline: (
    'color': $color--danger,
    'background-color': $color--white,
    'border-color': $color--danger-dark,
);

$button-danger-outline--hover: (
    'color': $color--danger-dark,
    'background-color': $color--danger-light,
);

$button-link: (
    'color': $color--blue,
    'background-color': $color--transparent,
    'display': inline-flex,
    'padding': $spacing--0,
    'text-decoration': none,
    'height': 'auto',
);

$button-link--hover: (
    'text-decoration': underline,
);

$button-variants: (
    'primary': $button-primary,
    'primary-outline': $button-primary-outline,
    'secondary': $button-secondary,
    'secondary-outline': $button-secondary-outline,
    'tertiary': $button-tertiary,
    'tertiary-outline': $button-tertiary-outline,
    'danger': $button-danger,
    'danger-outline': $button-danger-outline,
    'link': $button-link,
);

$button-variants--hover: (
    'primary': $button-primary--hover,
    'primary-outline': $button-primary-outline--hover,
    'secondary': $button-secondary--hover,
    'secondary-outline': $button-secondary-outline--hover,
    'tertiary': $button-tertiary--hover,
    'tertiary-outline': $button-tertiary-outline--hover,
    'danger': $button-danger--hover,
    'danger-outline': $button-danger-outline--hover,
    'link': $button-link--hover,
);

.pp-button {
    color: $color--white;
    background-color: $color--black;
    outline-width: $border--0;
    border: $border--1 solid $color--transparent;
    padding: $spacing--0 $spacing--24;
    white-space: nowrap;
    word-break: normal;
    border-radius: $radius--4;
    height: $button-height;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: $font-size--14;
    font-weight: normal;
    transition: opacity $transition-duration ease, outline-color $transition-duration ease,
        background-color $transition-duration ease, color $transition-duration ease,
        border $transition-duration ease;

    &--size-xs {
        padding: $spacing--0 $spacing--6;
        font-size: $font-size--11;
        height: $button-height--x-small;
    }

    &--size-s {
        padding: $spacing--0 $spacing--8;
        font-size: $font-size--11;
        height: $button-height--small;
    }

    &--size-m {
        padding: $spacing--0 $spacing--12;
        font-size: $font-size--14;
    }

    @each $variant, $map in $button-variants {
        &--#{$variant} {
            @each $prop, $value in $map {
                #{$prop}: #{$value};
            }
        }
    }

    @each $variant, $map in $button-variants--hover {
        &--#{$variant}:hover,
        &--#{$variant}:active,
        &.active {
            @each $prop, $value in $map {
                #{$prop}: #{$value};
            }
        }
    }

    &.disabled {
        pointer-events: none;

        &:is(button) {
            color: $color--white;
            background-color: $color--grey-3;
            border-color: $color--grey-3;
        }

        &:is(a) {
            color: currentColor;
        }
    }
}
</style>
