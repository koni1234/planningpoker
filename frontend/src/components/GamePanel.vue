<script setup lang="ts">
import { BUTTON_VARIANTS, FLEX_ALIGN, FLEX_DIRECTION, TEXT_VARIANTS } from '../ui.enums';
import {
    CreateGameResponseInterface,
    GameInterface,
    UserInterface,
    VotingScaleEnum,
} from '../types';
import { computed, ref } from 'vue';
import { CLOSE_GAME } from '../graphql/mutations/CloseGame';
import { CREATE_GAME } from '../graphql/mutations/CreateGame';
import { FetchResult } from '@apollo/client/link/core/types';
import GameCards from './GameCards.vue';
import GameIssue from './GameIssue.vue';
import GameRecap from './GameRecap.vue';
import GameTable from './GameTable.vue';
import { LEAVE_GAME } from '../graphql/mutations/LeaveGame';
import PpButton from './common/PpButton.vue';
import PpContentBar from './common/PpContentBar.vue';
import PpContentBarItem from './common/PpContentBarItem.vue';
import PpGrid from './common/PpGrid.vue';
import PpGridItem from './common/PpGridItem.vue';
import PpText from './common/PpText.vue';
import { RESET_GAME } from '../graphql/mutations/ResetGame';
import { VOTE } from '../graphql/mutations/Vote';
import { useMutation } from '@vue/apollo-composable';
import { v4 as uuidv4 } from 'uuid';

interface Props {
    user: UserInterface;
    game: GameInterface | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'newGame', game: GameInterface): void;
    (e: 'leaveGame'): void;
}>();

const gameIssue = ref<InstanceType<typeof GameIssue> | null>(null);

const canShowGameIssueColumn = computed<boolean>(() => {
    return !!gameIssue.value?.gameIssue || props.game?.ownerId === props.user.id;
});

const newGameId = uuidv4();

const gameId = computed<string>(() => {
    return props.game?.id || newGameId;
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
            ownerName: props.user.name,
            name: 'test',
            votingScale: VotingScaleEnum.fibonacci.valueOf(),
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

const { mutate: revealCards } = useMutation(CLOSE_GAME, () => ({
    variables: {
        input: {
            gameId: props.game?.id,
            userId: props.user.id,
        },
    },
}));

const { mutate: resetGame } = useMutation(RESET_GAME, () => ({
    variables: {
        input: {
            gameId: props.game?.id,
            userId: props.user.id,
        },
    },
}));

const onVote = async (vote: string) => {
    await voteGame({
        input: {
            gameId: props.game?.id,
            userId: props.user.id,
            vote,
        },
    });
};

onCreateGame((data: FetchResult<CreateGameResponseInterface>) => {
    if (data.data?.createGame) {
        emit('newGame', data.data.createGame);
    }
});

onLeaveGame(() => {
    emit('leaveGame');
});

window.addEventListener('beforeunload', (e) => {
    leaveGame();
    e.returnValue = 'onbeforeunload';
});
</script>

<template>
    <pp-content-bar>
        <pp-content-bar-item v-if="props.game">
            <pp-button> Invite players </pp-button>
        </pp-content-bar-item>
        <pp-content-bar-item v-if="props.game">
            <pp-button :variant="BUTTON_VARIANTS.DANGER_OUTLINE" @click="leaveGame">
                Leave the game
            </pp-button>
        </pp-content-bar-item>
        <pp-content-bar-item v-if="canCloseGame">
            <pp-button :variant="BUTTON_VARIANTS.PRIMARY_OUTLINE" @click="revealCards">
                Reveal cards
            </pp-button>
        </pp-content-bar-item>
        <pp-content-bar-item v-if="canStartNewGame">
            <pp-button :variant="BUTTON_VARIANTS.PRIMARY" @click="resetGame"> New game </pp-button>
        </pp-content-bar-item>
    </pp-content-bar>
    <pp-grid full-width :direction="FLEX_DIRECTION.COLUMN" :align="FLEX_ALIGN.CENTER">
        <pp-grid-item v-if="props.game" :cols="12">
            <pp-grid full-width>
                <pp-grid-item
                    :cols="canShowGameIssueColumn ? 8 : 12"
                    class="is-resizable flex-none"
                >
                    <game-recap
                        v-if="props.game.closed"
                        class="margin-h--40 margin-v--64"
                        :game="props.game"
                    />
                    <game-table :game="props.game" class="margin-h--40 margin-v--64" />
                    <game-cards
                        v-if="!props.game.closed"
                        class="margin-v--64"
                        :voting-scale="props.game.votingScale"
                        @voted="onVote"
                    />
                </pp-grid-item>
                <pp-grid-item v-show="canShowGameIssueColumn">
                    <game-issue
                        ref="gameIssue"
                        class="margin-v--64"
                        :game="props.game"
                        :user="props.user"
                    />
                </pp-grid-item>
            </pp-grid>
        </pp-grid-item>
        <pp-grid-item v-else class="margin-v--64">
            <pp-text :variant="TEXT_VARIANTS.HEADER_3" class="margin-b--24" tag="h3">
                Hello {{ props.user.name }}
            </pp-text>

            <pp-button class="is-inline--f" @click="createGame">
                Start new game {{ gameId }}
            </pp-button>
        </pp-grid-item>
    </pp-grid>
</template>
