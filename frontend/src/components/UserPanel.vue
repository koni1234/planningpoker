<script setup lang="ts">
import { CREATE_GAME, LEAVE_GAME } from '../graphql/mutations';
import { CreateGameResponseInterface, GameInterface, UserInterface } from '../types';
import { FetchResult } from '@apollo/client/link/core/types';
import { defineEmits } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { v4 as uuidv4 } from 'uuid';

interface Props {
    user: UserInterface;
    game?: GameInterface;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'newGame', game: GameInterface): void;
    (e: 'leaveGame'): void;
}>();

const newGameId = uuidv4();

const { mutate: createGame, onDone: onCreateGame } = useMutation(CREATE_GAME, () => ({
    variables: {
        input: {
            id: newGameId,
            ownerId: props.user.id,
            name: 'test',
            votingScale: 'fibonacci',
        },
    },
}));

const { mutate: leaveGame, onDone: onLeaveGame } = useMutation(LEAVE_GAME, () => ({
    variables: {
        input: {
            roomId: props.game?.id,
            userId: props.user.id,
        },
    },
}));

onCreateGame((data: FetchResult<CreateGameResponseInterface>) => {
    if (data.data?.createRoom) {
        emit('newGame', data.data.createRoom);
    }
});

onLeaveGame(() => {
    emit('leaveGame');
});

window.addEventListener('beforeunload', () => leaveGame);
</script>

<template>
    <p>Hello {{ props.user.name }}</p>
    <template v-if="props.game">
        vai... {{ props.game }}
        <button type="button" @click="leaveGame">Leave game</button>
    </template>
    <template v-else>
        <button type="button" @click="createGame">
            Start new game <b>{{ props.game?.id || newGameId }}</b>
        </button>
    </template>
    <br />
</template>
