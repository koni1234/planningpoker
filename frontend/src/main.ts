import './scss/style.scss';
import 'animate.css';

import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client/core';
import { createApp, h, provide } from 'vue';
import App from './App.vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { GRAPH_URL } from './constants';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const wsLink = new WebSocketLink({
    uri: `ws://${GRAPH_URL}`,
    options: {
        reconnect: true,
    },
});

const httpLink = new HttpLink({
    uri: `http://${GRAPH_URL}`,
});

const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink
);
const cache = new InMemoryCache({ addTypename: false });

const apolloClient = new ApolloClient({
    link,
    cache,
});

const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient);
    },

    render: () => h(App),
});

app.mount('#app');
