import PpText from 'Components/common/PpText.vue';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import {
    ALL_COLORS,
    FONT_WEIGHTS,
    TEXT_ALIGNMENTS,
    TEXT_SIZES,
    TEXT_VARIANTS,
} from '../../../../src/ui.enums';

describe('text component tests', () => {
    let wrapper: VueWrapper;

    afterEach(() => {
        wrapper.unmount();
    });

    it('should initialize properly', () => {
        expect.assertions(1);

        wrapper = shallowMount(PpText);

        expect(wrapper.findComponent(PpText).exists()).toBe(true);
    });

    it('should show content with slot properly', () => {
        expect.assertions(1);

        wrapper = shallowMount(PpText, {
            slots: {
                default: 'hello',
            },
        });

        expect(wrapper.find('p.pp-text').html()).toContain('hello');
    });

    it('should apply variant props properly', () => {
        expect.assertions(6);

        wrapper = shallowMount(PpText, {
            props: {
                variant: TEXT_VARIANTS.HEADER_3,
                color: ALL_COLORS.GREEN,
                align: TEXT_ALIGNMENTS.RIGHT,
                weight: FONT_WEIGHTS.REGULAR,
                size: TEXT_SIZES.SIZE_24,
                value: 'text to show',
                tag: 'h3',
            },
        });

        expect(wrapper.find('h3.pp-text').html()).toContain('text to show');
        expect(wrapper.find('h3.pp-text').classes()).toContain('color--green');
        expect(wrapper.find('h3.pp-text').classes()).toContain('tp-align--right');
        expect(wrapper.find('h3.pp-text').classes()).toContain('tp--header-3');
        expect(wrapper.find('h3.pp-text').classes()).toContain('tp-weight--regular');
        expect(wrapper.find('h3.pp-text').classes()).not.toContain('tp-size--24');
    });

    it('should apply input-label variant properly', () => {
        expect.assertions(4);

        wrapper = shallowMount(PpText, {
            props: {
                variant: TEXT_VARIANTS.INPUT_LABEL,
                value: 'text to show',
                tag: 'label',
            },
        });

        expect(wrapper.find('label.pp-text').html()).toContain('text to show');
        expect(wrapper.find('label.pp-text').classes()).toContain('tp--input-label');
        expect(wrapper.find('label.pp-text').classes()).toContain('margin-b--8');
        expect(wrapper.find('label.pp-text').classes()).toContain('is-inline--f');
    });

    it('should apply all other props properly', () => {
        expect.assertions(5);

        wrapper = shallowMount(PpText, {
            props: {
                color: ALL_COLORS.GREEN,
                align: TEXT_ALIGNMENTS.RIGHT,
                weight: FONT_WEIGHTS.REGULAR,
                size: TEXT_SIZES.SIZE_24,
                value: 'text to show',
                tag: 'h3',
            },
        });

        expect(wrapper.find('h3.pp-text').html()).toContain('text to show');
        expect(wrapper.find('h3.pp-text').classes()).toContain('color--green');
        expect(wrapper.find('h3.pp-text').classes()).toContain('tp-align--right');
        expect(wrapper.find('h3.pp-text').classes()).toContain('tp-weight--regular');
        expect(wrapper.find('h3.pp-text').classes()).toContain('tp-size--24');
    });
});
