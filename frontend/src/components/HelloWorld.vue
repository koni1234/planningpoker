<script setup lang="ts">
import { CREATE_GAME, CREATE_USER } from '../graphql/mutations';
import {
    CreateUserResponseInterface,
    GameCreatedResponseInterface,
    GameInterface,
    GetGameResponseInterface,
    UserInterface,
} from '../types';
import { ref } from 'vue';
import { useMutation, useQuery, useSubscription } from '@vue/apollo-composable';
import { FetchResult } from '@apollo/client/link/core/types';
import { GAME_CREATED } from '../graphql/subscriptions';
import { GET_GAME } from '../graphql/queries';
import { StorageProvider } from '../services/storage/StorageProvider';
import { v4 as uuidv4 } from 'uuid';

const urlPath = window.location.pathname.substring(1);
const localStorage = StorageProvider.localStorage();
const userdata = ref<UserInterface | null>(localStorage.get('userdata'));
const gamedata = ref<GameInterface | null>(null);
const text = ref<string>(userdata.value?.name || '');
const game = ref<GameInterface>({
    id: uuidv4(),
    ownerId: '',
    name: '',
    votingScale: 'fibonacci',
    users: [],
});

if (urlPath) {
    const { onResult: onGameLoaded } = useQuery(GET_GAME, {
        input: urlPath,
    });

    onGameLoaded((data: FetchResult<GetGameResponseInterface>) => {
        gamedata.value = data.data?.getRoom || null;
        game.value = gamedata.value as GameInterface;
    });
}

const setUser = (data: UserInterface | null) => {
    userdata.value = data;
    localStorage.set('userdata', data);
    text.value = '';
};

const exitUser = () => {
    setUser(null);
    window.history.replaceState(window.location.href, '', '/');
    game.value = {
        id: uuidv4(),
        ownerId: '',
        name: '',
        votingScale: 'fibonacci',
        users: [],
    };
};

const { mutate: createGame } = useMutation(CREATE_GAME, () => ({
    variables: {
        input: {
            id: game.value.id,
            ownerId: userdata.value?.id,
            name: 'test',
            votingScale: 'fibonacci',
        },
    },
}));

const { mutate: createUser, onDone: onCreateUser } = useMutation(CREATE_USER, () => ({
    variables: {
        input: {
            name: text.value,
        },
    },
}));

onCreateUser((data: FetchResult<CreateUserResponseInterface>) => {
    setUser(data.data?.createUser || null);
});

const { onResult: onGameCreated } = useSubscription(GAME_CREATED);

onGameCreated((data: FetchResult<GameCreatedResponseInterface>) => {
    const createdGame = data.data?.roomCreated as GameInterface;

    game.value.ownerId = createdGame.ownerId;
    localStorage.set('game', createdGame);
    window.history.replaceState(window.location.href, '', `/${createdGame.id}`);
});
</script>

<template>
    <template v-if="userdata">
        Hi {{ userdata.name }}
        <template v-if="game.ownerId"> vai... {{ game }}</template>
        <template v-else>
            <br />
            <button type="button" @click="createGame">Start new game {{ game.id }}</button>
        </template>
        <br />
        <button type="button" @click="exitUser">Exit</button>
    </template>
    <template v-else>
        <input v-model="text" placeholder="Enter your name" />
        <button type="button" @click="createUser">Create user</button>
    </template>
</template>
