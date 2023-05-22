import { GameInterface, UserInterface, VotingScaleEnum } from 'Types';
import { mount, VueWrapper } from '@vue/test-utils';
import GameTable from 'Components/GameTable.vue';

describe('GameTable tests', () => {
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
    };

    const users: UserInterface[] = [
        {
            id: 'uid1',
            name: 'User 1',
            vote: '1',
        },
        {
            id: 'uid2',
            name: 'User 2',
            vote: '5',
        },
        {
            id: 'uid3',
            name: 'User 3',
            vote: null,
        },
    ];

    const game: GameInterface = {
        id: 'id',
        ownerId: 'uid',
        name: 'game name',
        votingScale: VotingScaleEnum.fibonacci,
        users,
        closed: true,
    };

    afterEach(() => {
        wrapper.unmount();
        jest.clearAllMocks();
    });

    it('should initialize properly', () => {
        expect.assertions(1);

        wrapper = mount(GameTable, { props: { game }, shallow: true, stubs });

        expect(wrapper.findComponent(GameTable).exists()).toBe(true);
    });

    it('should show all players without votes properly when game is open', async () => {
        expect.assertions(6);

        wrapper = mount(GameTable, { props: { game: { ...game, closed: false } }, stubs });

        users.forEach((user, index) => {
            expect(wrapper.findAll('.vote-wrapper').at(index)?.text()).toContain(user.name);
            expect(wrapper.findAll('.vote').at(index)?.text()).toContain('');
        });
    });

    it('should show all players votes properly when game is closed', async () => {
        expect.assertions(6);

        wrapper = mount(GameTable, { props: { game }, stubs });

        users.forEach((user, index) => {
            expect(wrapper.findAll('.vote-wrapper').at(index)?.text()).toContain(user.name);
            expect(wrapper.findAll('.vote').at(index)?.text()).toContain(user.vote ?? '??');
        });
    });
});
