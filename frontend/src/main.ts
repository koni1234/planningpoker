import './style.css';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import { createApp, h, provide } from 'vue';
import App from './App.vue';
import { DefaultApolloClient } from '@vue/apollo-composable';

// HTTP connection to the API
const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: 'http://localhost:3000/graphql',
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
});

const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient);
    },

    render: () => h(App),
});

app.mount('#app');
