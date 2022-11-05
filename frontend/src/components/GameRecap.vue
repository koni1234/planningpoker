<script setup lang="ts">
import {
    ALL_COLORS,
    FLEX_ALIGN,
    FLEX_JUSTIFY,
    FLEX_WRAP,
    GRID_GUTTERS,
    TEXT_SIZES,
} from '../ui.enums';
import { GameInterface, UserInterface } from '../types';
import PpGrid from './common/PpGrid.vue';
import PpGridItem from './common/PpGridItem.vue';
import PpText from './common/PpText.vue';
import { computed } from 'vue';

interface Props {
    game: GameInterface;
}

const props = defineProps<Props>();

const votes = computed<{ vote: string; totUsers: number }[]>(() => {
    const votes =
        props.game.users?.reduce(
            (votes: { vote: string; totUsers: number }[], user: UserInterface) => {
                const currentVote = votes.find((vote) => vote.vote === user.vote);

                if (currentVote) {
                    currentVote.totUsers++;
                } else if (user.vote) {
                    votes.push({
                        vote: user.vote,
                        totUsers: 1,
                    });
                }

                return votes;
            },
            []
        ) || [];

    return votes.sort((a, b) => a.totUsers - b.totUsers);
});
</script>

<template>
    <pp-grid
        :wrap="FLEX_WRAP.WRAP"
        :gutters="GRID_GUTTERS.SIZE_16"
        :align="FLEX_ALIGN.CENTER"
        :justify="FLEX_JUSTIFY.CENTER"
        class="color-bg--white radius--rounded padding--24"
    >
        <pp-grid-item :cols="12">
            <pp-text variant="header-1" class="margin-b--24" tag="h1"> Result </pp-text>
        </pp-grid-item>
        <pp-grid-item
            v-for="(vote, index) in votes"
            :key="index"
            class="game-recap-item animate__animated animate__fadeIn"
        >
            <div class="recap-card">
                <pp-text :size="TEXT_SIZES.SIZE_24" :color="ALL_COLORS.BLACK">{{
                    vote.vote
                }}</pp-text>
            </div>
            <pp-text class="margin-v--12">{{ vote.totUsers }} votes</pp-text>
        </pp-grid-item>
    </pp-grid>
</template>
<style lang="scss">
.game-recap-item {
    min-width: 100px;
    max-width: 100px;
    text-align: center;
}

.recap-card {
    border-radius: $radius--4;
    border: $border--2 $border-style--solid $color--black;
    height: 80px;
    min-width: 60px;
    max-width: 60px;
    background-color: $color--grey-2;
    transition: color ease 0.3s, background-color ease 0.3s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
</style>
