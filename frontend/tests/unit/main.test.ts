// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const mockCreateApp = jest.fn();
const mockProvide = jest.fn();
const mockH = jest.fn();
const mockApolloClient = jest.fn();
const mockHttpLink = jest.fn();
const mockInMemoryCache = jest.fn();
const mockSplit = jest.fn();
const mockWebSocketLink = jest.fn();

jest.mock('animate.css', () => '');

jest.mock('vue', () => {
    return {
        createApp: mockCreateApp,
        provide: mockProvide,
        h: mockH,
    };
});
jest.mock('../../src/App.vue', () => {
    return 'App';
});

jest.mock('../../src/constants', () => {
    return {
        GRAPH_URL: 'GRAPH_URL',
    };
});

jest.mock('@apollo/client/link/ws', () => {
    return {
        WebSocketLink: mockWebSocketLink,
    };
});

jest.mock('@apollo/client/core', () => {
    return {
        ApolloClient: mockApolloClient,
        HttpLink: mockHttpLink,
        InMemoryCache: mockInMemoryCache,
        split: mockSplit,
    };
});

describe('main index page tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize vue properly', async () => {
        expect.assertions(7);

        const link = 'link';
        const apolloClient = 'apolloClient';
        const app = {
            mount: jest.fn(),
        };

        mockSplit.mockReturnValueOnce(link);
        mockApolloClient.mockReturnValueOnce(apolloClient);
        mockCreateApp.mockReturnValueOnce(app);

        await import('../../src/main');

        expect(mockWebSocketLink).toHaveBeenCalledTimes(1);
        expect(mockHttpLink).toHaveBeenCalledTimes(1);
        expect(mockSplit).toHaveBeenCalledTimes(1);
        expect(mockInMemoryCache).toHaveBeenCalledTimes(1);
        expect(mockApolloClient).toHaveBeenCalledWith({
            link,
            cache: new mockInMemoryCache(),
        });

        expect(mockCreateApp).toHaveBeenCalledTimes(1);

        expect(app.mount).toHaveBeenCalledWith('#app');
    });
});
