import App from '../../src/App.vue';
import { mount, VueWrapper } from '@vue/test-utils';

jest.mock('../../src/constants', () => {
    return {
        GRAPH_URL: 'GRAPH_URL',
    };
});

describe('app component test', () => {
    let wrapper: VueWrapper;

    const stubs = {
        Page: {
            template: '<div class="page-stub"></div>',
        },
    };

    afterEach(() => {
        wrapper.unmount();
    });

    it('should initialize properly', () => {
        expect.assertions(1);

        wrapper = mount(App, { shallow: true, global: { stubs } });

        expect(wrapper.findComponent(App).exists()).toBe(true);
    });
});
