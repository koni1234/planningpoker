import PpContentBarItem from 'Components/common/PpContentBarItem.vue';
import { mount, VueWrapper } from '@vue/test-utils';

describe('ppContentBarItem tests', () => {
    let wrapper: VueWrapper;

    const props = {
        title: 'title',
        id: 'id',
    };

    afterEach(() => {
        wrapper.unmount();
    });

    it('should initialize properly', () => {
        expect.assertions(1);

        wrapper = mount(PpContentBarItem, {
            shallow: true,
            props,
        });

        expect(wrapper.findComponent(PpContentBarItem).exists()).toBe(true);
    });

    it('should show content with slot properly', () => {
        expect.assertions(1);

        wrapper = mount(PpContentBarItem, {
            shallow: true,
            props,
            global: {
                stubs: {
                    PpGridItem: {
                        template: '<div class="pp-grid-item-stub"><slot/></div>',
                    },
                },
            },
            slots: {
                default: '<b>content</b>',
            },
        });

        expect(wrapper.find('.pp-content-bar-item').html()).toContain('<b>content</b>');
    });
});
