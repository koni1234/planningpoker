<script setup lang="ts">
import { CREATE_USER } from '../graphql/mutations';
import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';

const text = ref('');
const response = ref('load..');
const { mutate: createUser } = useMutation(CREATE_USER, () => ({
    variables: {
        input: {
            name: text.value,
        },
    },
}));

fetch('http://localhost:3000', {
    method: 'GET',
})
    .then((response) => response.json())
    .then((data) => {
        response.value = data;
    });
</script>

<template>
    <input v-model="text" placeholder="Enter a message" />
    <button type="button" @click="createUser">Create user</button>
</template>
