<script setup lang="ts">
import {
    ALL_COLORS,
    FLEX_ALIGN,
    FLEX_JUSTIFY,
    FLEX_WRAP,
    GRID_GUTTERS,
    TEXT_SIZES,
} from '../ui.enums';
import { GameInterface } from '../types';
import PpGrid from './common/PpGrid.vue';
import PpGridItem from './common/PpGridItem.vue';
import PpText from './common/PpText.vue';

interface Props {
    game: GameInterface;
}

const props = defineProps<Props>();
</script>

<template>
    <pp-grid
        :wrap="FLEX_WRAP.WRAP"
        :gutters="GRID_GUTTERS.SIZE_16"
        :align="FLEX_ALIGN.CENTER"
        :justify="FLEX_JUSTIFY.CENTER"
        class="color-bg--primary-light radius--rounded padding--24"
    >
        <template v-for="(user, index) in props.game.users" :key="index">
            <pp-grid-item class="vote-wrapper">
                <pp-text class="margin-b--8 tp--truncate">{{ user.name }}</pp-text>
                <div class="vote" :class="{ 'has-voted': !!user.vote || props.game.closed }">
                    <pp-text
                        v-if="props.game.closed"
                        :size="TEXT_SIZES.SIZE_24"
                        :color="ALL_COLORS.WHITE"
                        >{{ user.vote || '??' }}</pp-text
                    >
                </div>
            </pp-grid-item>
        </template>
    </pp-grid>
</template>
<style lang="scss">
.vote {
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

    &-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        min-width: 120px;
        max-width: 120px;
    }

    &.has-voted {
        background-color: $color--grey-5;
    }
}
</style>
