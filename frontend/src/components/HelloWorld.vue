<script setup lang="ts">
import { CREATE_GAME, CREATE_USER, ENTER_GAME, LEAVE_GAME } from '../graphql/mutations';
import {
    CreateGameResponseInterface,
    CreateUserResponseInterface,
    GameInterface,
    GameUpdatedResponseInterface,
    GetGameResponseInterface,
    UserInterface,
} from '../types';
import { useMutation, useQuery, useSubscription } from '@vue/apollo-composable';
import { FetchResult } from '@apollo/client/link/core/types';
import { GAME_UPDATED } from '../graphql/subscriptions';
import { GET_GAME } from '../graphql/queries';
import { StorageProvider } from '../services/storage/StorageProvider';
import { onBeforeUnmount, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const urlPath = window.location.pathname.substring(1);
const localStorage = StorageProvider.localStorage();
const userdata = ref<UserInterface>(localStorage.get('userdata') || { id: '', name: '' });
const gamedata = ref<GameInterface | null>(null);
const text = ref<string>(userdata.value.name);
const game = ref<GameInterface>({
    id: uuidv4(),
    ownerId: '',
    name: '',
    votingScale: 'fibonacci',
    users: [],
});

const {
    refetch: loadGame,
    onResult: onGameLoaded,
    loading,
} = useQuery(GET_GAME, {
    input: urlPath,
    prefetch: false,
});

onGameLoaded((data: FetchResult<GetGameResponseInterface>) => {
    gamedata.value = data.data?.getRoom || null;
    game.value = gamedata.value || {
        id: uuidv4(),
        ownerId: '',
        name: '',
        votingScale: 'fibonacci',
        users: [],
    };

    if (
        gamedata.value?.ownerId &&
        !game.value.users?.find((user) => user.id === userdata.value.id)
    ) {
        enterGame();
    }
});

const setUser = (data: UserInterface) => {
    userdata.value = data;
    localStorage.set('userdata', data);
    text.value = '';
};

const { mutate: createGame, onDone: onCreateGame } = useMutation(CREATE_GAME, () => ({
    variables: {
        input: {
            id: game.value.id,
            ownerId: userdata.value?.id,
            name: 'test',
            votingScale: 'fibonacci',
        },
    },
}));

onCreateGame((data: FetchResult<CreateGameResponseInterface>) => {
    const createdGame = data.data?.createRoom as GameInterface;

    game.value.ownerId = createdGame.ownerId;
    localStorage.set('game', createdGame);
    window.history.replaceState(window.location.href, '', `/${createdGame.id}`);
    enterGame();
});

const { onResult: onGameUpdated } = useSubscription(GAME_UPDATED);
onGameUpdated((data: FetchResult<GameUpdatedResponseInterface>) => {
    const updatedGame = data.data?.roomUpdated;

    if (!updatedGame) {
        return;
    }

    game.value = updatedGame;
});

const { mutate: createUser, onDone: onCreateUser } = useMutation(CREATE_USER, () => ({
    variables: {
        input: {
            name: text.value,
        },
    },
}));
onCreateUser((data: FetchResult<CreateUserResponseInterface>) => {
    if (data.data?.createUser) {
        setUser(data.data.createUser);
    }
});

const { mutate: enterGame } = useMutation(ENTER_GAME, () => ({
    variables: {
        input: {
            roomId: game.value.id,
            userId: userdata.value.id,
            userName: userdata.value.name,
        },
    },
}));

const { mutate: leaveGame, onDone: onLeaveGame } = useMutation(LEAVE_GAME, () => ({
    variables: {
        input: {
            roomId: game.value.id,
            userId: userdata.value.id,
        },
    },
}));
onLeaveGame(() => {
    setUser({ id: '', name: '' });
    window.history.replaceState(window.location.href, '', '/');
    game.value = {
        id: uuidv4(),
        ownerId: '',
        name: '',
        votingScale: 'fibonacci',
        users: [],
    };
});

if (urlPath) {
    loadGame();
}

window.addEventListener('beforeunload', () => leaveGame);
</script>

<template>
    <template v-if="loading"> loading ... </template>
    <template v-else-if="userdata.id">
        Hi {{ userdata.name }}
        <template v-if="game?.ownerId">
            vai... {{ game }}
            <button type="button" @click="leaveGame">Exit</button>
        </template>
        <template v-else>
            <br />
            <button type="button" @click="createGame">Start new game {{ game.id }}</button>
        </template>
        <br />
    </template>
    <template v-else>
        <input v-model="text" placeholder="Enter your name" />
        <button type="button" @click="createUser">Create user</button>
    </template>
</template>
