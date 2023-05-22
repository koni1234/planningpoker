import PpInput from 'Components/common/PpInput.vue';
import { mount, VueWrapper } from '@vue/test-utils';

describe('ppInput component tests', () => {
    let wrapper: VueWrapper;

    afterEach(() => {
        wrapper.unmount();
    });

    it('should initialize properly', () => {
        expect.assertions(2);

        wrapper = mount(PpInput);

        expect(wrapper.findComponent(PpInput).exists()).toBe(true);
        expect(wrapper.findComponent(PpInput).find('input').exists()).toBe(true);
    });

    it('should apply variant props properly', () => {
        expect.assertions(6);

        wrapper = mount(PpInput, {
            props: {
                modelValue: 'text value',
                fullWidth: true,
                inline: true,
                type: 'search',
                id: 'id',
            },
        });

        expect(wrapper.find('input').classes()).toHaveLength(3);
        expect(wrapper.find('input').classes()).toContain('pp-input');
        expect(wrapper.find('input').classes()).toContain('width--100');
        expect(wrapper.find('input').classes()).toContain('is-inline--f');
        expect(wrapper.find('input').attributes('id')).toBe('id');
        expect(wrapper.find('input').element.value).toBe('text value');
    });

    it('should apply other html native input props properly', () => {
        expect.assertions(5);

        wrapper = mount(PpInput, {
            props: {
                title: 'tag title',
                disabled: true,
                placeholder: 'placeholder',
                required: true,
            },
        });

        expect(wrapper.find('input').attributes('disabled')).toBe('');
        expect(wrapper.find('input').attributes('required')).toBe('');
        expect(wrapper.find('input').attributes('readonly')).toBeUndefined();
        expect(wrapper.find('input').attributes('title')).toBe('tag title');
        expect(wrapper.find('input').attributes('placeholder')).toBe('placeholder');
    });

    it('should emit an event on input properly', () => {
        expect.assertions(2);

        wrapper = mount(PpInput, {
            props: {},
        });

        wrapper.find('input').element.value = 'test';
        wrapper.find('input').trigger('input');
        const emit = wrapper.emitted('update:modelValue');

        expect(emit).toHaveLength(1);
        expect(emit?.[0]).toStrictEqual(['test']);
    });
});
