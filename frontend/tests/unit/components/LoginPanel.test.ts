import { flushPromises, mount, VueWrapper } from '@vue/test-utils';
import { BadUserInputExceptionInterface } from 'Exceptions/BadUserInputExceptionInterface';
import { CREATE_USER } from 'Graphql/mutations/CreateUser';
import { createMockClient } from 'Mocks/apolloClientMock';
import { CreateUserResponseInterface } from 'Types';
import LoginPanel from 'Components/LoginPanel.vue';
import PpInput from 'Components/common/PpInput.vue';

describe('LoginPanel tests', () => {
    let wrapper: VueWrapper;

    const stubs = {
        PpContentBar: true,
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

    const createUserResponseInterface: CreateUserResponseInterface = {
        createUser: {
            id: 'uuid',
            name: 'name',
        },
    };

    const errorResponseInterface: BadUserInputExceptionInterface = {
        code: 'BAD_USER_INPUT',
        response: {
            statusCode: 400,
            error: 'Bad Request',
            message: ['error message #1'],
        },
    };

    const successQueryHandler = jest.fn().mockResolvedValue({ data: createUserResponseInterface });

    const errorQueryHandler = jest.fn().mockResolvedValue({
        errors: [
            {
                extensions: errorResponseInterface,
            },
        ],
    });

    afterEach(() => {
        wrapper.unmount();
        jest.clearAllMocks();
    });

    it('should initialize properly', () => {
        expect.assertions(1);

        wrapper = mount(LoginPanel, { shallow: true });

        expect(wrapper.findComponent(LoginPanel).exists()).toBe(true);
    });

    it('should execute login properly', async () => {
        expect.assertions(5);

        createMockClient([[CREATE_USER, successQueryHandler]]);

        wrapper = mount(LoginPanel, { global: { stubs } });

        await wrapper.find('.pp-button').trigger('click');
        expect(successQueryHandler).toHaveBeenCalledTimes(0);

        await wrapper.findComponent(PpInput).vm.$emit('update:modelValue', '   ');
        expect(successQueryHandler).toHaveBeenCalledTimes(0);

        await wrapper.findComponent(PpInput).vm.$emit('update:modelValue', 'name');
        await wrapper.find('.pp-button').trigger('click');

        expect(successQueryHandler).toHaveBeenCalledWith(
            expect.objectContaining({ input: { name: 'name' } })
        );

        await flushPromises();

        const emit = wrapper.emitted('created');

        expect(emit).toHaveLength(1);
        expect(emit?.[0]).toStrictEqual([createUserResponseInterface.createUser]);
    });

    it('should show login errors properly', async () => {
        expect.assertions(3);

        createMockClient([[CREATE_USER, errorQueryHandler]]);

        wrapper = mount(LoginPanel, { global: { stubs } });

        await wrapper.findComponent(PpInput).vm.$emit('update:modelValue', 'new value');
        await wrapper.find('.pp-button').trigger('click');

        expect(errorQueryHandler).toHaveBeenCalledTimes(1);

        await flushPromises();

        const emit = wrapper.emitted('created');

        expect(emit).toBeUndefined();
        expect(wrapper.text()).toContain('error message #1');
    });
});
