<script setup lang="ts">
import {
    ALL_COLORS,
    BUTTON_VARIANTS,
    FONT_WEIGHTS,
    GRID_BEHAVIORS,
    TEXT_VARIANTS,
} from '../ui.enums';
import { GameInterface, GameIssue, GetGameIssueResponseInterface, UserInterface } from '../types';
import { computed, ref, watch } from 'vue';
import { useLazyQuery, useMutation } from '@vue/apollo-composable';
import { FetchResult } from '@apollo/client/link/core/types';
import { GET_GAME_ISSUE } from '../graphql/queries/GetGameIssue';
import Multiselect from '@vueform/multiselect';
import PpButton from './common/PpButton.vue';
import PpGrid from './common/PpGrid.vue';
import PpGridItem from './common/PpGridItem.vue';
import PpInput from './common/PpInput.vue';
import PpText from './common/PpText.vue';
import { SET_GAME_ISSUE } from '../graphql/mutations/SetGameIssue';
import { SET_ISSUE_STORY_POINTS } from '../graphql/mutations/SetIssueStoryPoints';
import { VOTING_SCALES_VALUES } from '../constants';

interface Props {
    user: UserInterface;
    game: GameInterface;
}

const props = defineProps<Props>();

const text = ref<string>(props.game.issueId || '');
const showStoryPointsUpdateMessange = ref<boolean>(false);
const storypoints = ref<string>('5');
const gameIssue = ref<GameIssue | null>(null);

const canSetGameIssue = computed<boolean>(() => {
    return props.game?.ownerId === props.user.id && !props.game.closed;
});

const canSetIssueStoryPoints = computed<boolean>(() => {
    return props.game?.ownerId === props.user.id && props.game.closed && !!gameIssue.value;
});

const {
    load: loadGameIssue,
    onResult: onGameIssueLoaded,
    onError: onGameIssueError,
    loading,
} = useLazyQuery(
    GET_GAME_ISSUE,
    () => ({
        input: props.game.issueId,
    }),
    () => ({
        enabled: !!props.game.issueId,
    })
);

const { mutate: setGameIssue } = useMutation(SET_GAME_ISSUE, () => ({
    variables: {
        input: {
            issueId: text.value,
            gameId: props.game.id,
            userId: props.user.id,
        },
    },
}));

const {
    mutate: setIssueStoryPoints,
    onDone: onSetIssueStoryPoints,
    loading: loadingStoryPoints,
} = useMutation(SET_ISSUE_STORY_POINTS, () => ({
    variables: {
        input: {
            issueId: props.game.issueId,
            storyPoints: Number.parseInt(storypoints.value),
        },
    },
}));

watch(
    () => props.game,
    (current, previous) => {
        if (!current.issueId) {
            gameIssue.value = null;
            text.value = '';
            showStoryPointsUpdateMessange.value = false;
            return;
        }
        if (current.issueId !== previous?.issueId) {
            loadGameIssue();
        }
    },
    { immediate: true, deep: true }
);

onGameIssueLoaded((data: FetchResult<GetGameIssueResponseInterface>) => {
    gameIssue.value = data.data?.getIssue || null;
});

onGameIssueError(() => {
    gameIssue.value = null;
});
onSetIssueStoryPoints(() => {
    showStoryPointsUpdateMessange.value = true;
});

defineExpose({
    gameIssue,
});
</script>

<template>
    <pp-grid class="game-issue">
        <template v-if="canSetGameIssue">
            <pp-grid-item class="padding-r--8" :behavior="GRID_BEHAVIORS.FIXED">
                <pp-input v-model.trim="text" placeholder="Enter jira issue id" />
            </pp-grid-item>
            <pp-grid-item class="tp-align--left margin-b--16">
                <pp-button
                    :variant="BUTTON_VARIANTS.PRIMARY"
                    inline
                    value="Set Jira issue"
                    @click="setGameIssue"
                />
            </pp-grid-item>
            <pp-grid-item :cols="4" />
        </template>
        <pp-grid-item
            v-if="showStoryPointsUpdateMessange"
            class="tp-align--left margin-b--16"
            :cols="12"
        >
            <pp-text :color="ALL_COLORS.DANGER">Story points updated!</pp-text>
        </pp-grid-item>
        <template v-if="canSetIssueStoryPoints">
            <pp-grid-item class="padding-r--8" :cols="6">
                <multiselect
                    v-model="storypoints"
                    placeholder="Set story points"
                    :object="false"
                    :can-clear="false"
                    :options="VOTING_SCALES_VALUES[props.game.votingScale]"
                />
            </pp-grid-item>
            <pp-grid-item
                class="tp-align--left margin-b--16 animate__animated animate__heartBeat"
                :cols="6"
            >
                <pp-button
                    :variant="BUTTON_VARIANTS.SECONDARY"
                    inline
                    value="Set story points"
                    :disabled="loadingStoryPoints"
                    @click="
                        () => {
                            setIssueStoryPoints();
                            showStoryPointsUpdateMessange = false;
                        }
                    "
                />
            </pp-grid-item>
        </template>
        <pp-grid-item class="game-issue-recap tp-align--left tp--break-word" :cols="12">
            <template v-if="loading">
                <pp-text :variant="TEXT_VARIANTS.HEADER_1" class="game-issue-loader"
                    >loading</pp-text
                >
            </template>
            <div
                v-else-if="gameIssue"
                class="border--1 radius--rounded padding-h--16 padding-b--16 color-bg--white is-relative"
            >
                <div class="is-sticky color-bg--white padding-v--16">
                    <pp-text :variant="TEXT_VARIANTS.HEADER_6" class="tp--uppercase" tag="h6">{{
                        gameIssue.key
                    }}</pp-text>
                    <pp-text
                        :variant="TEXT_VARIANTS.HEADER_3"
                        class="margin-t--4"
                        :weight="FONT_WEIGHTS.BOLD"
                        tag="h3"
                        >{{ gameIssue.fields.summary }}</pp-text
                    >
                </div>
                <!-- eslint-disable vue/no-v-text-v-html-on-component vue/no-v-html -->
                <pp-text
                    :variant="TEXT_VARIANTS.TEXT"
                    tag="div"
                    class="description"
                    v-html="gameIssue.renderedFields.description || 'no description'"
                />
                <!-- eslint-enable vue/no-v-text-v-html-on-component vue/no-v-html -->
            </div>
        </pp-grid-item>
    </pp-grid>
</template>
<style lang="scss">
.game-issue {
    padding-right: $spacing--12;

    &-recap {
        white-space: pre-line;
        overflow-y: auto;
        max-height: 66vh;

        .description pre {
            white-space: pre-wrap;
        }
    }
}
</style>
