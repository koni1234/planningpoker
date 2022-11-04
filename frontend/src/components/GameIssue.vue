<script setup lang="ts">
import { GameInterface, GameIssue, GetGameIssueResponseInterface, UserInterface } from '../types';
import { ref, watch } from 'vue';
import { useLazyQuery, useMutation } from '@vue/apollo-composable';
import { FONT_WEIGHTS } from '../ui.enums';
import { FetchResult } from '@apollo/client/link/core/types';
import { GET_GAME_ISSUE } from '../graphql/queries/GetGameIssue';
import PpButton from './common/PpButton.vue';
import PpGrid from './common/PpGrid.vue';
import PpGridItem from './common/PpGridItem.vue';
import PpInput from './common/PpInput.vue';
import PpText from './common/PpText.vue';
import { SET_GAME_ISSUE } from '../graphql/mutations/SetGameIssue';

interface Props {
    user: UserInterface;
    game: GameInterface;
}

const props = defineProps<Props>();

const text = ref<string>(props.game.issueId || '');
//const errors = ref<string[]>([]);
const gameIssue = ref<GameIssue | null>(null);

const {
    load: loadGameIssue,
    onResult: onGameIssueLoaded,
    onError: onGameIssueError,
    loading,
} = useLazyQuery(GET_GAME_ISSUE, () => ({
    input: props.game.issueId,
}));

const { mutate: setGameIssue } = useMutation(SET_GAME_ISSUE, () => ({
    variables: {
        input: {
            issueId: text.value,
            gameId: props.game.id,
            userId: props.user.id,
        },
    },
}));

watch(
    () => props.game,
    (current, previous) => {
        if (!current.issueId) {
            gameIssue.value = null;
            return;
        }
        if (current.issueId !== previous?.issueId) {
            loadGameIssue();
        }
    },
    { immediate: true, deep: true }
);

onGameIssueLoaded((data: FetchResult<GetGameIssueResponseInterface>) => {
    console.log(data.data);
    gameIssue.value = data.data?.getIssue || null;
});

onGameIssueError((/*error: ApolloError*/) => {
    gameIssue.value = null;
    //  debugger;
    /*
    const errorResponse = error.graphQLErrors.at(0)?.extensions;
    let res: string[] = [];
  
    if (errorResponse?.code === 'BAD_USER_INPUT') {
      res = (errorResponse as BadUserInputExceptionInterface).response.message || [];
    }
  
    errors.value = res;
    */
});
</script>

<template>
    <pp-grid class="padding-r--12">
        <pp-grid-item class="padding-r--8" :cols="6">
            <pp-input
                v-model.trim="text"
                :disabled="!!game.closed"
                placeholder="Enter jira issue id"
            />
        </pp-grid-item>
        <pp-grid-item class="tp-align--left" :cols="6">
            <pp-button
                variant="primary"
                :disabled="!!game.closed"
                inline
                value="Set Jira issue"
                @click="setGameIssue"
            />
        </pp-grid-item>
        <pp-grid-item class="game-issue-recap tp-align--left tp--break-word" :cols="12">
            <template v-if="loading">
                <pp-text variant="header-1" class="game-issue-loader">loading</pp-text>
            </template>
            <div
                v-else-if="gameIssue"
                class="border--1 radius--rounded padding--16 margin-t--8 color-bg--white"
            >
                <pp-text variant="header-6" class="tp--uppercase" tag="h6">{{
                    gameIssue.key
                }}</pp-text>
                <pp-text
                    variant="header-3 margin-b--16 margin-t--4"
                    :weight="FONT_WEIGHTS.BOLD"
                    tag="h3"
                    >{{ gameIssue.fields.summary }}</pp-text
                >
                <pp-text variant="text" tag="p">{{
                    gameIssue.fields.description || 'no description'
                }}</pp-text>
            </div>
        </pp-grid-item>
    </pp-grid>
</template>
<style lang="scss">
.game-issue-recap {
    white-space: pre-line;
    overflow-y: auto;
    max-height: 70vh;
}
</style>
