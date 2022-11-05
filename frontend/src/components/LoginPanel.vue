<script setup lang="ts">
import { CreateUserResponseInterface, UserInterface } from '../types';
import { ALL_COLORS } from '../ui.enums';
import { ApolloError } from '@apollo/client/core';
import { BadUserInputExceptionInterface } from '../exceptions/BadUserInputExceptionInterface';
import { CREATE_USER } from '../graphql/mutations/CreateUser';
import { FetchResult } from '@apollo/client/link/core/types';
import PpButton from './common/PpButton.vue';
import PpContentBar from './common/PpContentBar.vue';
import PpGrid from './common/PpGrid.vue';
import PpGridItem from './common/PpGridItem.vue';
import PpInput from './common/PpInput.vue';
import PpText from './common/PpText.vue';
import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';

const emit = defineEmits<{
    (e: 'created', user: UserInterface): void;
}>();

const text = ref<string>('');
const errors = ref<string[]>([]);

const {
    mutate: createUser,
    onDone: onCreateUser,
    onError: onError,
} = useMutation(CREATE_USER, () => ({
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

onError((error: ApolloError) => {
    const errorResponse = error.graphQLErrors.at(0)?.extensions;
    let res: string[] = [];

    if (errorResponse?.code === 'BAD_USER_INPUT') {
        res = (errorResponse as BadUserInputExceptionInterface).response.message || [];
    }

    errors.value = res;
});
</script>

<template>
    <pp-content-bar />
    <pp-grid class="margin-v--64">
        <pp-grid-item :cols="12">
            <pp-text variant="header-1" class="margin-b--24" tag="h1"> Login </pp-text>
        </pp-grid-item>
        <pp-grid-item v-if="errors.length" :cols="12" class="margin-b--24">
            <pp-text tag="span" :color="ALL_COLORS.DANGER">{{ errors.join('\n') }}</pp-text>
        </pp-grid-item>
        <pp-grid-item :cols="12" class="login-form">
            <pp-input
                v-model.trim="text"
                inline
                placeholder="Enter your name"
                class="margin-r--12"
            />
            <pp-button variant="primary" inline value="Enter" @click="createUser" />
        </pp-grid-item>
    </pp-grid>
</template>
<style lang="scss">
.login-form {
    white-space: nowrap;
}
</style>
