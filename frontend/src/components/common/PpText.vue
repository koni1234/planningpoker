<script setup lang="ts">
import {
    ALL_COLORS,
    FONT_WEIGHTS,
    TEXT_ALIGNMENTS,
    TEXT_SIZES,
    TEXT_VARIANTS,
} from '../../ui.enums';
import { computed } from 'vue';

interface Props {
    value?: string | number;
    variant?: TEXT_VARIANTS;
    tag?: string;
    color?: string;
    align?: TEXT_ALIGNMENTS;
    weight?: FONT_WEIGHTS;
    size?: TEXT_SIZES;
}

const props = withDefaults(defineProps<Props>(), {
    value: undefined,
    variant: undefined,
    tag: 'p',
    color: ALL_COLORS.BLACK,
    align: undefined,
    weight: undefined,
    size: TEXT_SIZES.SIZE_14,
});

const classes = computed(() => {
    return [
        'pp-text',
        props.variant ? `tp--${props.variant}` : null,
        props.color ? `color--${props.color}` : null,
        props.align ? `tp-align--${props.align}` : null,
        props.weight ? `tp-weight--${props.weight}` : null,
        props.size && !props.variant ? `tp-size--${props.size}` : null,
        props.variant === TEXT_VARIANTS.INPUT_LABEL ? `is-inline--f margin-b--8` : null,
    ];
});
</script>

<template>
    <component :is="tag" :class="classes">
        <slot>
            {{ value }}
        </slot>
    </component>
</template>

<style lang="scss">
.pp-text {
    padding: $spacing--0;
    margin: $spacing--0;
}
</style>
