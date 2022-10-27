<script setup lang="ts">
import { VotingScaleEnum } from '../types';
import { computed } from 'vue';

interface Props {
    votingScale: VotingScaleEnum;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'voted', vote: string): void;
}>();

const cards = computed<string[]>(() => {
    return props.votingScale === VotingScaleEnum.tshirt
        ? ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', '☕']
        : ['1', '2', '3', '5', '8', '13', '21', '☕'];
});
</script>

<template>
    <button v-for="(card, index) in cards" :key="index" @click="emit('voted', card)">
        {{ card }}
    </button>
</template>
