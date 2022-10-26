<script setup lang="ts">
import {
    GameInterface,
    GameUpdatedResponseInterface,
    GetGameResponseInterface,
    UserInterface,
} from '../types';
import { useLazyQuery, useMutation, useSubscription } from '@vue/apollo-composable';
import { ENTER_GAME } from '../graphql/mutations';
import { FetchResult } from '@apollo/client/link/core/types';
import { GAME_UPDATED } from '../graphql/subscriptions';
import { GET_GAME } from '../graphql/queries';
import SignIn from './SignIn.vue';
import { StorageProvider } from '../services/storage/StorageProvider';
import UserPanel from './UserPanel.vue';
import { ref } from 'vue';

const urlPath = window.location.pathname.substring(1);
const localStorage = StorageProvider.localStorage();
const userdata = ref<UserInterface>(localStorage.get('userdata') || { id: '', name: '' });
const game = ref<GameInterface | null>(null);

const {
    load: loadGame,
    onResult: onGameLoaded,
    loading,
} = useLazyQuery(GET_GAME, {
    input: urlPath,
});

onGameLoaded((data: FetchResult<GetGameResponseInterface>) => {
    game.value = data.data?.getRoom || null;

    if (game.value && !game.value.users?.find((user) => user.id === userdata.value.id)) {
        enterGame();
    }
});

const setUser = (data: UserInterface) => {
    userdata.value = data;
    localStorage.set('userdata', data);

    if (urlPath) {
        loadGame();
    }
};

const onNewGame = (data: GameInterface) => {
    game.value = { ...data };
    localStorage.set('game', data);
    window.history.replaceState(window.location.href, '', `/${data.id}`);
    enterGame();
};

const { onResult: onGameUpdated } = useSubscription(GAME_UPDATED);

onGameUpdated((data: FetchResult<GameUpdatedResponseInterface>) => {
    const updatedGame = data.data?.roomUpdated;

    if (!updatedGame) {
        return;
    }

    game.value = updatedGame;
});

const { mutate: enterGame } = useMutation(ENTER_GAME, () => ({
    variables: {
        input: {
            roomId: game.value?.id,
            userId: userdata.value.id,
            userName: userdata.value.name,
        },
    },
}));

const onLeaveGame = () => {
    setUser({ id: '', name: '' });
    window.history.replaceState(window.location.href, '', '/');
    game.value = null;
};

if (userdata.value.id && urlPath) {
    loadGame();
}
</script>

<template>
    <template v-if="loading"> loading ... </template>
    <template v-else-if="userdata.id">
        <user-panel :user="userdata" :game="game" @new-game="onNewGame" @leave-game="onLeaveGame" />
    </template>
    <template v-else>
        <sign-in @created="setUser" />
    </template>
</template>
