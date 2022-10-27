<script setup lang="ts">
import { CreateGameResponseInterface, GameInterface, UserInterface } from '../types';
import { CLOSE_GAME } from '../graphql/mutations/CloseGame';
import { CREATE_GAME } from '../graphql/mutations/CreateGame';
import { ENTER_GAME } from '../graphql/mutations/EnterGame';
import { FetchResult } from '@apollo/client/link/core/types';
import GameCards from './GameCards.vue';
import GameTable from './GameTable.vue';
import { LEAVE_GAME } from '../graphql/mutations/LeaveGame';
import { RESET_GAME } from '../graphql/mutations/ResetGame';
import { VOTE } from '../graphql/mutations/Vote';
import { computed } from 'vue';
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

const alexIsHere = computed<boolean>(() => {
    return !!props.game?.users?.find((user) => user.id === 'alex');
});

const canInviteAlex = computed(() => {
    return (
        props.game?.ownerId === props.user.id &&
        !props.game.users?.find((user) => user.id === 'alex')
    );
});

const canCloseGame = computed<boolean>(() => {
    return props.game?.ownerId === props.user.id && !props.game.closed;
});

const canStartNewGame = computed<boolean>(() => {
    return props.game?.ownerId === props.user.id && props.game.closed;
});

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
            gameId: props.game?.id,
            userId: props.user.id,
        },
    },
}));

const { mutate: voteGame } = useMutation(VOTE);

const addAlexVote = () => {
    const choices = ['💯', '🙈', '💩', '⚽', '⛳', '🎯', '🎱', '🏀', '🏉', '💸', '💉', '🦄', '🏇'];

    voteGame({
        input: {
            gameId: props.game?.id,
            userId: 'alex',
            vote: choices[Math.floor(Math.random() * choices.length)],
        },
    });
};

const onVote = async (vote: string) => {
    await voteGame({
        input: {
            gameId: props.game?.id,
            userId: props.user.id,
            vote,
        },
    });

    if (alexIsHere.value) {
        addAlexVote();
    }
};

const { mutate: playWithAlex } = useMutation(ENTER_GAME, () => ({
    variables: {
        input: {
            gameId: props.game?.id,
            userId: 'alex',
            userName: 'Alex Chesterman OBE',
        },
    },
}));

const { mutate: revealCards } = useMutation(CLOSE_GAME, () => ({
    variables: {
        input: {
            gameId: props.game?.id,
            userId: props.user.id,
        },
    },
}));

const { mutate: resetGame, onDone: onResetGame } = useMutation(RESET_GAME, () => ({
    variables: {
        input: {
            gameId: props.game?.id,
            userId: props.user.id,
        },
    },
}));

onCreateGame((data: FetchResult<CreateGameResponseInterface>) => {
    if (data.data?.createGame) {
        emit('newGame', data.data.createGame);
    }
});

onLeaveGame(() => {
    emit('leaveGame');
});

onResetGame(() => {
    if (alexIsHere.value) {
        window.setTimeout(addAlexVote, 3000);
    }
});

window.addEventListener('beforeunload', () => leaveGame);
</script>

<template>
    <template v-if="props.game">
        <button>Invite player</button>
        <button v-if="canInviteAlex" @click="playWithAlex">Invite Alex</button>
        <br /><br /><br /><br /><br />
        <game-table :game="props.game" />
        <br /><br />
        <game-cards
            v-if="!props.game.closed"
            :voting-scale="props.game.votingScale"
            @voted="onVote"
        />
        <br /><br /><br /><br /><br />
        <button v-if="canCloseGame" @click="revealCards">Reveal cards</button>
        <button v-if="canStartNewGame" @click="resetGame">New game</button>
        <button type="button" @click="leaveGame">Leave the game</button>
    </template>
    <template v-else>
        <p>Hello {{ props.user.name }}</p>
        <button type="button" @click="createGame">
            Start new game <b>{{ props.game?.id || newGameId }}</b>
        </button>
    </template>
</template>
