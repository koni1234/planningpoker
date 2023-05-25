import PpButton from 'Components/common/PpButton.vue';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import { BUTTON_SIZES, BUTTON_VARIANTS } from '../../../../src/ui.enums';

describe('ppButton tests', () => {
    let wrapper: VueWrapper;

    afterEach(() => {
        wrapper.unmount();
    });

    it('should initialize properly', () => {
        expect.assertions(1);

        wrapper = shallowMount(PpButton);

        expect(wrapper.findComponent(PpButton).exists()).toBe(true);
    });

    it('should show content with slot properly', () => {
        expect.assertions(1);

        wrapper = shallowMount(PpButton, {
            slots: {
                default: 'content',
            },
        });

        expect(wrapper.find('button.pp-button').html()).toContain('content');
    });

    it('should show as link using variant properly', () => {
        expect.assertions(2);

        wrapper = shallowMount(PpButton, {
            props: {
                variant: BUTTON_VARIANTS.LINK,
                href: 'http://localhost',
            },
        });

        expect(wrapper.find('a.pp-button').classes()).toContain('pp-button--link');
        expect(wrapper.find('a.pp-button').attributes().href).toContain('http://localhost');
    });

    it('should show as link using tag properly', () => {
        expect.assertions(2);

        wrapper = shallowMount(PpButton, {
            props: {
                tag: 'a',
                href: 'http://localhost',
            },
        });

        expect(wrapper.find('a.pp-button').classes()).not.toContain('pp-button--link');
        expect(wrapper.find('a.pp-button').attributes().href).toContain('http://localhost');
    });

    it('should apply all props properly', () => {
        expect.assertions(5);

        wrapper = shallowMount(PpButton, {
            props: {
                size: BUTTON_SIZES.X_SMALL,
                variant: BUTTON_VARIANTS.PRIMARY,
                inline: true,
                disabled: true,
                value: 'content',
            },
        });

        expect(wrapper.find('.pp-button').classes()).toContain('pp-button--size-xs');
        expect(wrapper.find('.pp-button').classes()).toContain('pp-button--primary');
        expect(wrapper.find('.pp-button').classes()).toContain('disabled');
        expect(wrapper.find('.pp-button').classes()).toContain('is-inline--f');
        expect(wrapper.find('.pp-button').html()).toContain('content');
    });
});
