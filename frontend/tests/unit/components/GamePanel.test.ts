import { flushPromises, mount, VueWrapper } from '@vue/test-utils';
import GamePanel from 'Components/GamePanel.vue';
import { GameInterface, UserInterface, VotingScaleEnum } from 'Types';
import { createMockClient } from 'Mocks/apolloClientMock';
import { LEAVE_GAME } from 'Graphql/mutations/LeaveGame';
import { CLOSE_GAME } from 'Graphql/mutations/CloseGame';
import { RESET_GAME } from 'Graphql/mutations/ResetGame';
import { CREATE_GAME } from 'Graphql/mutations/CreateGame';
import { VOTE } from 'Graphql/mutations/Vote';
import GameCards from 'Components/GameCards.vue';

jest.mock('uuid', () => {
    return { v4: () => 'new uuid' };
});

jest.mock('../../../src/constants', () => {
    return {
        VOTING_SCALES_VALUES: {
            fibonacci: ['1', '2', '3', '5', '8', '13', '21'],
        },
        GRAPH_URL: 'GRAPH_URL',
    };
});

describe('GamePanel tests', () => {
    let wrapper: VueWrapper;

    const stubs = {
        GameRecap: true,
        GameTable: true,
        GameCards: true,
        GameIssue: true,
        PpContentBar: {
            template: '<div class="pp-content-bar-stub"><slot /></div>',
        },
        PpContentBarItem: {
            template: '<div class="pp-content-bar-item-stub"><slot /></div>',
        },
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
            template: '<div><slot /></div>',
        },
    };

    const user: UserInterface = {
        id: 'uid1',
        name: 'User 1',
    };

    const game: GameInterface = {
        id: 'id',
        ownerId: 'uid',
        name: 'game name',
        votingScale: VotingScaleEnum.fibonacci,
        users: [user],
        closed: false,
    };

    const successCloseGameMutationHandler = jest
        .fn()
        .mockResolvedValue({ data: { closeGame: { game: { ...game, closed: true } } } });

    const successVoteGameMutationHandler = jest.fn().mockResolvedValue({ data: { vote: game } });

    const successLeaveGameMutationHandler = jest
        .fn()
        .mockResolvedValue({ data: { leaveGame: game } });

    const successResetGameMutationHandler = jest
        .fn()
        .mockResolvedValue({ data: { resetGame: game } });

    const successCreateGameMutationHandler = jest
        .fn()
        .mockResolvedValue({ data: { createGame: game } });

    const writeText = jest.fn();

    beforeAll(() => {
        Object.defineProperty(window, 'location', {
            value: { origin: 'test_url' },
        });

        Object.assign(navigator, {
            clipboard: {
                writeText,
            },
        });
    });

    afterEach(() => {
        wrapper.unmount();
        jest.clearAllMocks();
    });

    it('should initialize properly', () => {
        expect.assertions(1);

        wrapper = mount(GamePanel, { props: { user, game }, shallow: true });

        expect(wrapper.findComponent(GamePanel).exists()).toBe(true);
    });

    it('should show with game in progress properly', () => {
        expect.assertions(7);

        wrapper = mount(GamePanel, { props: { user, game }, stubs });

        expect(wrapper.find('.game-cards').exists()).toBeTruthy();
        expect(wrapper.find('.game-recap').exists()).toBeFalsy();
        expect(wrapper.find('.game-table').exists()).toBeTruthy();
        expect(wrapper.find('.game-issue').isVisible()).toBeFalsy();
        expect(wrapper.findAll('.pp-content-bar-item')).toHaveLength(3);
        expect(wrapper.findAll('.pp-content-bar-item').at(1)?.text()).toContain('Invite player');
        expect(wrapper.findAll('.pp-content-bar-item').at(2)?.text()).toContain('Leave the game');
    });

    it('should show topbar with game open as owner properly', () => {
        expect.assertions(8);

        wrapper = mount(GamePanel, {
            props: {
                user,
                game: {
                    ...game,
                    ownerId: user.id,
                },
            },
            stubs,
        });

        expect(wrapper.find('.game-cards').exists()).toBeTruthy();
        expect(wrapper.find('.game-recap').exists()).toBeFalsy();
        expect(wrapper.find('.game-table').exists()).toBeTruthy();
        expect(wrapper.find('.game-issue').isVisible()).toBeTruthy();
        expect(wrapper.findAll('.pp-content-bar-item')).toHaveLength(4);
        expect(wrapper.findAll('.pp-content-bar-item').at(1)?.text()).toContain('Invite player');
        expect(wrapper.findAll('.pp-content-bar-item').at(2)?.text()).toContain('Leave the game');
        expect(wrapper.findAll('.pp-content-bar-item').at(3)?.text()).toContain('Reveal cards');
    });

    it('should show with game closed as owner properly', () => {
        expect.assertions(8);

        wrapper = mount(GamePanel, {
            props: {
                user,
                game: {
                    ...game,
                    ownerId: user.id,
                    closed: true,
                },
            },
            stubs,
        });

        expect(wrapper.find('.game-recap').exists()).toBeTruthy();
        expect(wrapper.find('.game-cards').exists()).toBeFalsy();
        expect(wrapper.find('.game-table').exists()).toBeTruthy();
        expect(wrapper.find('.game-issue').isVisible()).toBeTruthy();
        expect(wrapper.findAll('.pp-content-bar-item')).toHaveLength(4);
        expect(wrapper.findAll('.pp-content-bar-item').at(1)?.text()).toContain('Invite player');
        expect(wrapper.findAll('.pp-content-bar-item').at(2)?.text()).toContain('Leave the game');
        expect(wrapper.findAll('.pp-content-bar-item').at(3)?.text()).toContain('New game');
    });

    it('should show without game properly', () => {
        expect.assertions(4);

        wrapper = mount(GamePanel, { props: { user, game: null }, stubs });

        expect(wrapper.text()).toContain('Hello User 1');
        expect(wrapper.findAll('.pp-button').at(-1)?.text()).toContain('Start new game new uuid');
        expect(wrapper.findAll('.pp-content-bar-item')).toHaveLength(1);
        expect(wrapper.findAll('.pp-content-bar-item').at(0)?.text()).toContain('Planning Poker');
    });

    it('should copy the url of game when i click on Invite player', async () => {
        expect.assertions(1);

        wrapper = mount(GamePanel, { props: { user, game }, stubs });

        await wrapper.findAll('.pp-content-bar-item').at(1)?.find('button').trigger('click');

        expect(writeText).toHaveBeenCalledWith('test_url/id');
    });

    it('should leave the game properly', async () => {
        expect.assertions(3);

        createMockClient([[LEAVE_GAME, successLeaveGameMutationHandler]]);

        wrapper = mount(GamePanel, { props: { user, game }, stubs });

        expect(successLeaveGameMutationHandler).toHaveBeenCalledTimes(0);
        await wrapper.findAll('.pp-content-bar-item').at(2)?.find('button').trigger('click');
        expect(successLeaveGameMutationHandler).toHaveBeenCalledWith(
            expect.objectContaining({ input: { gameId: 'id', userId: 'uid1' } })
        );

        await flushPromises();

        const emit = wrapper.emitted('leaveGame');

        expect(emit).toHaveLength(1);
    });

    it('should close the game properly', async () => {
        expect.assertions(2);

        createMockClient([[CLOSE_GAME, successCloseGameMutationHandler]]);

        wrapper = mount(GamePanel, {
            props: {
                user,
                game: {
                    ...game,
                    ownerId: user.id,
                },
            },
            stubs,
        });

        expect(successCloseGameMutationHandler).toHaveBeenCalledTimes(0);
        await wrapper.findAll('.pp-content-bar-item').at(3)?.find('button').trigger('click');
        expect(successCloseGameMutationHandler).toHaveBeenCalledWith(
            expect.objectContaining({ input: { gameId: 'id', userId: 'uid1' } })
        );
    });

    it('should vote the game properly', async () => {
        expect.assertions(2);

        createMockClient([[VOTE, successVoteGameMutationHandler]]);

        wrapper = mount(GamePanel, {
            props: {
                user,
                game,
            },
            stubs,
        });

        expect(successVoteGameMutationHandler).toHaveBeenCalledTimes(0);
        await wrapper.findAll('.pp-content-bar-item').at(3)?.find('button').trigger('click');
        await wrapper.findComponent(GameCards).vm.$emit('voted', '13');

        expect(successVoteGameMutationHandler).toHaveBeenCalledWith({
            input: {
                gameId: 'id',
                userId: 'uid1',
                vote: '13',
            },
        });
    });

    it('should start the game properly', async () => {
        expect.assertions(3);

        createMockClient([[CREATE_GAME, successCreateGameMutationHandler]]);

        wrapper = mount(GamePanel, {
            props: {
                user,
                game: null,
            },
            stubs,
        });

        expect(successCreateGameMutationHandler).toHaveBeenCalledTimes(0);
        await wrapper.findAll('.pp-button').at(-1)?.trigger('click');
        expect(successCreateGameMutationHandler).toHaveBeenCalledWith(
            expect.objectContaining({
                input: {
                    id: 'new uuid',
                    name: 'test',
                    ownerId: 'uid1',
                    ownerName: 'User 1',
                    votingScale: VotingScaleEnum.fibonacci,
                },
            })
        );

        await flushPromises();

        const emit = wrapper.emitted('newGame');

        expect(emit).toHaveLength(1);
    });

    it('should restart the game properly', async () => {
        expect.assertions(2);

        createMockClient([[RESET_GAME, successResetGameMutationHandler]]);

        wrapper = mount(GamePanel, {
            props: {
                user,
                game: {
                    ...game,
                    ownerId: user.id,
                    closed: true,
                },
            },
            stubs,
        });

        expect(successResetGameMutationHandler).toHaveBeenCalledTimes(0);
        await wrapper.findAll('.pp-content-bar-item').at(3)?.find('button').trigger('click');
        expect(successResetGameMutationHandler).toHaveBeenCalledWith(
            expect.objectContaining({ input: { gameId: 'id', userId: 'uid1' } })
        );
    });
});
