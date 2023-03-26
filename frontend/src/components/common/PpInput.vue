<template>
    <input :id="id" :type="type" :class="classes" :value="modelValue" @input="updateModelValue" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'PpInput',
    props: {
        /**
         * input id
         */
        id: {
            type: String,
            default: null,
        },
        /**
         * input type
         * (eg. text/search)
         */
        type: {
            type: String,
            default: 'text',
        },
        /**
         * input value / vModel
         */
        modelValue: {
            type: String,
            default: null,
        },
        /**
         * Set width 100%
         */
        fullWidth: {
            type: Boolean,
            default: false,
        },
        /**
         * Display button inline
         */
        inline: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const updateModelValue = (event: Event) => {
            emit('update:modelValue', (event.target as HTMLInputElement).value);
        };

        const classes = computed(() => {
            return [
                'pp-input',
                props.fullWidth ? 'width--100' : null,
                props.inline ? `is-inline--f` : null,
            ];
        });

        return {
            classes,
            updateModelValue,
        };
    },
});
</script>

<style lang="scss">
.pp-input {
    height: $input-height;
    border-radius: $radius--4;
    padding: $spacing--6;
    border: $border--1 solid $color--grey-4;
    display: flex;
    color: $color--text;
    transition: border 0.3s ease, color 0.3s ease, background-color 0.3s ease;
    box-shadow: none;
    outline: none;
    appearance: none;
    margin: $spacing--0;

    @each $fontValueKey, $fontValue in map-get($font-variants, 'input') {
        #{$fontValueKey}: #{$fontValue};
    }

    &[type='search']::-webkit-search-cancel-button {
        -webkit-appearance: searchfield-cancel-button;
    }

    &:focus,
    &:hover {
        border: $border--1 solid $color--grey-5;
    }

    &[disabled],
    &[readonly] {
        pointer-events: none;
        background-color: $color--grey-2;
    }
}
</style>
