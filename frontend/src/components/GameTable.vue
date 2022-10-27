<script setup lang="ts">
import { GameInterface } from '../types';

interface Props {
    game: GameInterface;
}

const props = defineProps<Props>();
</script>

<template>
    <div>
        <div v-for="(user, index) in props.game.users" :key="index">
            {{ user.name }}
            <template v-if="props.game.closed && user.vote"> has voted {{ user.vote }}</template>
            <template v-else-if="props.game.closed"> has not voted</template>
            <template v-else-if="user.vote"> has voted</template>
            <br />
        </div>
    </div>
</template>
