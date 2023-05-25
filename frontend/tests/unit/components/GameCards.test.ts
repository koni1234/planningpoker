import { VotingScaleEnum } from 'Types';
import { mount, VueWrapper } from '@vue/test-utils';
import GameCards from 'Components/GameCards.vue';

jest.mock('../../../src/constants', () => {
    return {
        VOTING_SCALES_VALUES: {
            fibonacci: ['1', '2', '3', '5', '8', '13', '21'],
        },
        GRAPH_URL: 'GRAPH_URL',
    };
});

describe('GameCards tests', () => {
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

    const votingScale: VotingScaleEnum = VotingScaleEnum.fibonacci;

    afterEach(() => {
        wrapper.unmount();
        jest.clearAllMocks();
    });

    it('should initialize properly', () => {
        expect.assertions(1);

        wrapper = mount(GameCards, { props: { votingScale }, shallow: true, stubs });

        expect(wrapper.findComponent(GameCards).exists()).toBe(true);
    });

    it('should show all cards properly', async () => {
        expect.assertions(9);

        wrapper = mount(GameCards, { props: { votingScale }, stubs });

        expect(wrapper.text()).toContain('Choose your card');

        ['1', '2', '3', '5', '8', '13', '21'].forEach((vote, index) => {
            expect(wrapper.findAll('.card').at(index)?.text()).toBe(vote);
        });

        expect(wrapper.findAll('.card').at(-1)?.text()).toBe('☕');
    });

    it('should emit and event and set selected status when I click on a card properly', async () => {
        expect.assertions(3);

        wrapper = mount(GameCards, { props: { votingScale }, stubs });

        await wrapper.find('.card').trigger('click');

        const emit = wrapper.emitted('voted');

        expect(emit).toHaveLength(1);
        expect(emit?.[0]).toStrictEqual(['1']);
        expect(wrapper.find('.card').classes()).toContain('selected');
    });
});
