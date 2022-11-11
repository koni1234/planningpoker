<script setup lang="ts">
import {
    GameInterface,
    GameUpdatedResponseInterface,
    GetGameResponseInterface,
    GetUserResponseInterface,
    UserInterface,
} from '../types';
import { computed, ref } from 'vue';
import { useLazyQuery, useMutation, useSubscription } from '@vue/apollo-composable';
import { ENTER_GAME } from '../graphql/mutations/EnterGame';
import { FetchResult } from '@apollo/client/link/core/types';
import { GAME_UPDATED } from '../graphql/subscriptions/GameUpdate';
import { GET_GAME } from '../graphql/queries/GetGame';
import { GET_USER } from '../graphql/queries/GetUser';
import GamePanel from './GamePanel.vue';
import LoginPanel from './LoginPanel.vue';
import PpText from './common/PpText.vue';
import { StorageProvider } from '../services/storage/StorageProvider';

const urlPath = window.location.pathname.substring(1);
const localStorage = StorageProvider.localStorage();
const userdata = ref<UserInterface>(localStorage.get('userdata') || { id: '', name: '' });
const game = ref<GameInterface | null>(null);

const {
    load: loadGame,
    onResult: onGameLoaded,
    loading: loadingGame,
} = useLazyQuery(GET_GAME, {
    input: urlPath,
});

const {
    load: loadUser,
    onResult: onUserLoaded,
    loading: loadingUser,
} = useLazyQuery(GET_USER, {
    input: userdata.value.id,
});

const loading = computed<boolean>(() => {
    return !!(loadingGame.value || loadingUser.value);
});

onGameLoaded((data: FetchResult<GetGameResponseInterface>) => {
    game.value = data.data?.getGame
        ? {
              ...data.data.getGame,
              users: data.data.getGame.users ? [...data.data.getGame.users] : [],
          }
        : null;
    if (game.value && !game.value.users?.find((user) => user.id === userdata.value.id)) {
        game.value.users?.push({
            ...userdata.value,
            vote: null,
        });

        enterGame();
    }
});

onUserLoaded((data: FetchResult<GetUserResponseInterface>) => {
    if (!data.data?.getUser) {
        userdata.value.id = '';
    } else if (urlPath) {
        loadGame();
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
    window.history.replaceState(window.location.href, '', `/${data.id}`);
    enterGame();
};

const subscribeGame = () => {
    const { onResult: onGameUpdated } = useSubscription(
        GAME_UPDATED,
        () => ({
            gameId: game.value?.id,
        }),
        () => ({
            enabled: !!game.value?.id,
        })
    );

    onGameUpdated((data: FetchResult<GameUpdatedResponseInterface>) => {
        const updatedGame = data.data?.gameUpdated;

        if (!updatedGame) {
            return;
        }

        game.value = updatedGame;
    });
};

const { mutate: enterGame } = useMutation(ENTER_GAME, () => ({
    variables: {
        input: {
            gameId: game.value?.id,
            userId: userdata.value.id,
            userName: userdata.value.name,
        },
    },
}));

const onLeaveGame = () => {
    window.history.replaceState(window.location.href, '', '/');
    game.value = null;
};

subscribeGame();

if (userdata.value.id) {
    loadUser();
}
</script>

<template>
    <div class="tp-align--center">
        <template v-if="loading">
            <pp-text variant="header-1" class="loader">loading</pp-text>
        </template>
        <template v-else-if="userdata.id">
            <game-panel
                :user="userdata"
                :game="game"
                @new-game="onNewGame"
                @leave-game="onLeaveGame"
            />
        </template>
        <template v-else>
            <login-panel @created="setUser" />
        </template>
    </div>
</template>

<style lang="scss">
.loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
