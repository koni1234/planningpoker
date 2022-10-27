<script setup lang="ts">
import { CreateUserResponseInterface, UserInterface } from '../types';
import { CREATE_USER } from '../graphql/mutations/CreateUser';
import { FetchResult } from '@apollo/client/link/core/types';
import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';

const emit = defineEmits<{
    (e: 'created', user: UserInterface): void;
}>();

const text = ref<string>('');

const { mutate: createUser, onDone: onCreateUser } = useMutation(CREATE_USER, () => ({
    variables: {
        input: {
            name: text.value,
        },
    },
}));

onCreateUser((data: FetchResult<CreateUserResponseInterface>) => {
    if (data.data?.createUser) {
        emit('created', data.data.createUser);
    }
});
</script>

<template>
    <input v-model="text" placeholder="Enter your name" />
    <button type="button" @click="createUser">Enter</button>
</template>
