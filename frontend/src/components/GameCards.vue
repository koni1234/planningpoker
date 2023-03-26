<script setup lang="ts">
import { FLEX_ALIGN, FLEX_JUSTIFY, FLEX_WRAP, GRID_GUTTERS, TEXT_VARIANTS } from '../ui.enums';
import { computed, ref } from 'vue';
import PpGrid from './common/PpGrid.vue';
import PpGridItem from './common/PpGridItem.vue';
import PpText from './common/PpText.vue';
import { VOTING_SCALES_VALUES } from '../constants';
import { VotingScaleEnum } from '../types';

interface Props {
    votingScale: VotingScaleEnum;
}

const props = defineProps<Props>();

const vote = ref<string>('');

const emit = defineEmits<{
    (e: 'voted', vote: string): void;
}>();

const cards = computed<string[]>(() => {
    return [...VOTING_SCALES_VALUES[props.votingScale], '☕'];
});

const cssClasses = (card: string): string[] => {
    return ['card', 'is-clickable', card === vote.value ? 'selected' : ''];
};

const onVote = (card: string) => {
    emit('voted', card);
    vote.value = card;
};
</script>

<template>
    <pp-grid
        :wrap="FLEX_WRAP.WRAP"
        :gutters="GRID_GUTTERS.SIZE_16"
        :align="FLEX_ALIGN.CENTER"
        :justify="FLEX_JUSTIFY.CENTER"
        class="animate__animated animate__slideInLeft"
    >
        <pp-grid-item :cols="12">
            <pp-text :variant="TEXT_VARIANTS.HEADER_1" class="margin-b--24" tag="h1">
                Choose your card
            </pp-text>
        </pp-grid-item>
        <pp-grid-item
            v-for="(card, index) in cards"
            :key="index"
            :class="cssClasses(card)"
            @click="onVote(card)"
        >
            {{ card }}
        </pp-grid-item>
    </pp-grid>
</template>
<style lang="scss">
.card {
    border-radius: $radius--4;
    border: $border--2 $border-style--solid $color--black;
    height: 80px;
    min-width: 60px;
    max-width: 60px;
    background-color: $color--grey-2;
    transition: color ease 0.3s, background-color ease 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: $color--grey-3;
    }

    &.selected {
        font-weight: bold;
        background-color: $color--primary;
        color: $color--white;

        &:hover {
            background-color: $color--primary;
        }
    }
}
</style>
