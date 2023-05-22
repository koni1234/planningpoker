import { GameInterface, UserInterface, VotingScaleEnum } from 'Types';
import { mount, VueWrapper } from '@vue/test-utils';
import GameRecap from 'Components/GameRecap.vue';

describe('GameRacap tests', () => {
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

    const votes = ['8', '5'];

    const users: UserInterface[] = [
        {
            id: 'uid1',
            name: 'User 1',
            vote: votes[1],
        },
        {
            id: 'uid2',
            name: 'User 2',
            vote: votes[0],
        },
        {
            id: 'uid3',
            name: 'User 3',
            vote: votes[1],
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

        wrapper = mount(GameRecap, { props: { game }, shallow: true, stubs });

        expect(wrapper.findComponent(GameRecap).exists()).toBe(true);
    });

    it('should show all data properly', async () => {
        expect.assertions(5);

        wrapper = mount(GameRecap, { props: { game }, stubs });

        votes.forEach((vote, index) => {
            expect(wrapper.findAll('.recap-card').at(index)?.text()).toContain(vote);
            expect(wrapper.findAll('.game-recap-item').at(index)?.text()).toContain(
                `${users.filter((user) => user.vote === vote).length} votes`
            );
        });

        expect(wrapper.text()).toContain('Average: 6');
    });
});
