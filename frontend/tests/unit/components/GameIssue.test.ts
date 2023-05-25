import { flushPromises, mount, VueWrapper } from '@vue/test-utils';
import GameIssue from 'Components/GameIssue.vue';
import { GameInterface, UserInterface, VotingScaleEnum } from 'Types';
import { createMockClient } from 'Mocks/apolloClientMock';
import { SET_GAME_ISSUE } from 'Graphql/mutations/SetGameIssue';
import PpInput from 'Components/common/PpInput.vue';
import { GET_GAME_ISSUE } from 'Graphql/queries/GetGameIssue';
import { SET_ISSUE_STORY_POINTS } from 'Graphql/mutations/SetIssueStoryPoints';

jest.mock('../../../src/constants', () => {
    return {
        VOTING_SCALES_VALUES: {
            fibonacci: ['1', '2', '3', '5', '8', '13', '21'],
        },
        GRAPH_URL: 'GRAPH_URL',
    };
});

describe('GameIssue tests', () => {
    let wrapper: VueWrapper;

    const stubs = {
        PpGrid: {
            template: '<div><slot /></div>',
        },
        PpGridItem: {
            template: '<div><slot /></div>',
        },
        PpText: {
            template: '<div><slot /></div>',
        },
        PpButton: {
            template: '<button><slot /></button>',
        },
    };

    const user: UserInterface = {
        id: 'uid1',
        name: 'User 1',
    };

    const game: GameInterface = {
        id: 'id',
        ownerId: 'uid1',
        name: 'game name',
        votingScale: VotingScaleEnum.fibonacci,
        users: [user],
        closed: false,
    };

    const jiraIssue = {
        id: 'jira-id',
        key: 'jira key',
        renderedFields: {
            description: 'jira description',
        },
        fields: {
            summary: 'jira summary',
            description: 'jira description',
        },
    };

    const successSetStoryPointsMutationHandler = jest
        .fn()
        .mockResolvedValue({ data: { setIssueStoryPoints: {} } });

    const successSetJiraIssueMutationHandler = jest
        .fn()
        .mockResolvedValue({ data: { setGameIssue: { ...game, issueId: 'jira-id' } } });

    const successGetJiraIssueMutationHandler = jest
        .fn()
        .mockResolvedValue({ data: { getIssue: jiraIssue } });

    afterEach(() => {
        wrapper.unmount();
        jest.clearAllMocks();
    });

    it('should initialize properly', () => {
        expect.assertions(1);

        wrapper = mount(GameIssue, { props: { user, game }, shallow: true });

        expect(wrapper.findComponent(GameIssue).exists()).toBe(true);
    });

    it('should set jira issue properly', async () => {
        expect.assertions(2);

        createMockClient([[SET_GAME_ISSUE, successSetJiraIssueMutationHandler]]);

        wrapper = mount(GameIssue, {
            props: {
                user,
                game,
            },
            stubs,
        });

        expect(successSetJiraIssueMutationHandler).toHaveBeenCalledTimes(0);
        await wrapper.findComponent(PpInput).vm.$emit('update:modelValue', 'BRUM-00000');
        await wrapper.findAll('.game-issue button').at(0)?.trigger('click');
        await flushPromises();
        expect(successSetJiraIssueMutationHandler).toHaveBeenCalledWith(
            expect.objectContaining({
                input: {
                    issueId: 'BRUM-00000',
                    userId: user.id,
                    gameId: game.id,
                },
            })
        );
    });

    it('should load jira issue properly', async () => {
        expect.assertions(4);

        createMockClient([[GET_GAME_ISSUE, successGetJiraIssueMutationHandler]]);

        wrapper = mount(GameIssue, {
            props: {
                user,
                game: {
                    ...game,
                    issueId: jiraIssue.id,
                },
            },
            stubs,
        });

        await flushPromises();

        expect(successGetJiraIssueMutationHandler).toHaveBeenCalledWith(
            expect.objectContaining({
                input: jiraIssue.id,
            })
        );

        expect(wrapper.find('.game-issue').text()).toContain(jiraIssue.key);
        expect(wrapper.find('.game-issue').text()).toContain(jiraIssue.fields.summary);
        expect(wrapper.find('.game-issue').text()).toContain(jiraIssue.renderedFields.description);
    });

    it('should set storypoints properly', async () => {
        expect.assertions(2);

        createMockClient([
            [GET_GAME_ISSUE, successGetJiraIssueMutationHandler],
            [SET_ISSUE_STORY_POINTS, successSetStoryPointsMutationHandler],
        ]);

        wrapper = mount(GameIssue, {
            props: {
                user,
                game: {
                    ...game,
                    issueId: jiraIssue.id,
                    closed: true,
                    ownerId: user.id,
                },
            },
            stubs,
        });

        await flushPromises();

        expect(successGetJiraIssueMutationHandler).toHaveBeenCalledWith(
            expect.objectContaining({
                input: jiraIssue.id,
            })
        );

        await wrapper.findAll('.game-issue button').at(0)?.trigger('click');

        await flushPromises();

        expect(successSetStoryPointsMutationHandler).toHaveBeenCalledWith(
            expect.objectContaining({
                input: {
                    storyPoints: 5,
                    issueId: jiraIssue.id,
                },
            })
        );
    });
});
