import PpGrid from 'Components/common/PpGrid.vue';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import {
    FLEX_ALIGN,
    FLEX_CONTENT,
    FLEX_DIRECTION,
    FLEX_JUSTIFY,
    FLEX_WRAP,
    GRID_GUTTERS,
    SIDES,
} from '../../../../src/ui.enums';

describe('ppGrid tests', () => {
    let wrapper: VueWrapper;

    afterEach(() => {
        wrapper.unmount();
    });

    it('should initialize properly', () => {
        expect.assertions(1);

        wrapper = shallowMount(PpGrid);

        expect(wrapper.findComponent(PpGrid).exists()).toBe(true);
    });

    it('should show content with slot properly', () => {
        expect.assertions(1);

        wrapper = shallowMount(PpGrid, {
            slots: {
                default: '<div class="pp-grid-item">content</div>',
            },
        });

        expect(wrapper.find('div.pp-grid').html()).toContain(
            '<div class="pp-grid-item">content</div>'
        );
    });

    it('should apply all props properly', () => {
        expect.assertions(11);

        wrapper = shallowMount(PpGrid, {
            props: {
                gutters: GRID_GUTTERS.SIZE_8,
                wrap: FLEX_WRAP.NOWRAP,
                justify: FLEX_JUSTIFY.FLEX_END,
                align: FLEX_ALIGN.CENTER,
                content: FLEX_CONTENT.SPACE_BETWEEN,
                direction: FLEX_DIRECTION.COLUMN,
                equalHeight: true,
                fullWidth: true,
                halfWidth: true,
                reverse: true,
                push: SIDES.LEFT,
            },
            slots: {
                default: '<p>content</p>',
            },
        });

        expect(wrapper.find('.pp-grid').classes()).toContain('pp-grid--gutters-8');
        expect(wrapper.find('.pp-grid').classes()).toContain('pp-grid--nowrap');
        expect(wrapper.find('.pp-grid').classes()).toContain('pp-grid--justify-flex-end');
        expect(wrapper.find('.pp-grid').classes()).toContain('pp-grid--align-center');
        expect(wrapper.find('.pp-grid').classes()).toContain('pp-grid--content-space-between');
        expect(wrapper.find('.pp-grid').classes()).toContain('pp-grid--direction-column');
        expect(wrapper.find('.pp-grid').classes()).toContain('pp-grid--push-left');
        expect(wrapper.find('.pp-grid').classes()).toContain('pp-grid--equal-height');
        expect(wrapper.find('.pp-grid').classes()).toContain('pp-grid--full-width');
        expect(wrapper.find('.pp-grid').classes()).toContain('pp-grid--half-width');
        expect(wrapper.find('.pp-grid').classes()).toContain('pp-grid--reverse');
    });
});
