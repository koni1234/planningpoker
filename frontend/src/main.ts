import './scss/style.scss';
import 'animate.css';

import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client/core';
import { createApp, h, provide } from 'vue';
import App from './App.vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const wsLink = new WebSocketLink({
    uri: `ws://localhost:3000/graphql`,
    options: {
        reconnect: true,
    },
});

const httpLink = new HttpLink({
    uri: 'http://localhost:3000/graphql',
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
