import PpContentBar from 'Components/common/PpContentBar.vue';
import PpContentBarItem from 'Components/common/PpContentBarItem.vue';
import { mount, VueWrapper } from '@vue/test-utils';

describe('bottomBar tests', () => {
    const WrappedContentBarItems = {
        components: { PpContentBar, PpContentBarItem },
        props: {
            sticky: {
                type: Boolean,
                default: false,
            },
        },
        template: `<pp-content-bar :sticky="sticky">
          <pp-content-bar-item><button>item 1</button></pp-content-bar-item>
          <pp-content-bar-item><button>item 2</button></pp-content-bar-item>
        </pp-content-bar>`,
    };

    let wrapper: VueWrapper<InstanceType<typeof PpContentBar>>;

    afterEach(() => {
        wrapper.unmount();
        jest.clearAllMocks();
    });

    it('should initialize properly', () => {
        expect.assertions(2);

        wrapper = mount(WrappedContentBarItems);

        expect(wrapper.findComponent(PpContentBar).exists()).toBe(true);
        expect(wrapper.findAllComponents(PpContentBarItem)).toHaveLength(3);
    });

    it('should show title properly', () => {
        expect.assertions(1);

        wrapper = mount(WrappedContentBarItems);

        expect(wrapper.findAll('.pp-content-bar-item').at(0)?.text()).toBe('Planning Poker');
    });

    it('should show content with slot properly', () => {
        expect.assertions(2);

        wrapper = mount(WrappedContentBarItems);

        expect(wrapper.find('.pp-content-bar').html()).toContain('<button>item 1</button>');

        expect(wrapper.find('.pp-content-bar').html()).toContain('<button>item 2</button>');
    });

    it('should apply all props properly', () => {
        expect.assertions(1);

        wrapper = mount(WrappedContentBarItems, { props: { sticky: true } });

        expect(wrapper.find('.pp-content-bar').classes()).toContain('pp-content-bar--sticky');
    });
});
