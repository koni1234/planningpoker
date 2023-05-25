import PpGridItem from 'Components/common/PpGridItem.vue';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import { GRID_BEHAVIORS, SIDES, VERTICAL_ALIGNMENTS } from '../../../../src/ui.enums';

describe('ppGridItem tests', () => {
    let wrapper: VueWrapper;

    afterEach(() => {
        wrapper.unmount();
    });

    it('should initialize properly', () => {
        expect.assertions(1);

        wrapper = shallowMount(PpGridItem);

        expect(wrapper.findComponent(PpGridItem).exists()).toBe(true);
    });

    it('should show content with slot properly', () => {
        expect.assertions(1);

        wrapper = shallowMount(PpGridItem, {
            slots: {
                default: '<p>content</p>',
            },
        });

        expect(wrapper.find('div.pp-grid-item').html()).toContain('<p>content</p>');
    });

    it('should apply all props properly', () => {
        expect.assertions(4);

        wrapper = shallowMount(PpGridItem, {
            props: {
                cols: 10,
                align: VERTICAL_ALIGNMENTS.TOP,
                behavior: GRID_BEHAVIORS.FIXED,
                push: SIDES.RIGHT,
                tag: 'p',
            },
            slots: {
                default: '<p>content</p>',
            },
        });
        expect(wrapper.find('p.pp-grid-item').classes()).toContain('pp-grid-item--cols-10');
        expect(wrapper.find('p.pp-grid-item').classes()).toContain('pp-grid-item--align-top');
        expect(wrapper.find('p.pp-grid-item').classes()).toContain('pp-grid-item--push-right');
        expect(wrapper.find('p.pp-grid-item').classes()).toContain('pp-grid-item--behavior-fixed');
    });
});
