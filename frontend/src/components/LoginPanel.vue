<script setup lang="ts">
import { CreateUserResponseInterface, UserInterface } from '../types';
import { CREATE_USER } from '../graphql/mutations/CreateUser';
import { FetchResult } from '@apollo/client/link/core/types';
import { GRID_GUTTERS } from '../ui.enums';
import PpButton from './common/PpButton.vue';
import PpGrid from './common/PpGrid.vue';
import PpGridItem from './common/PpGridItem.vue';
import PpInput from './common/PpInput.vue';
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
    <pp-grid :gutters="GRID_GUTTERS.SIZE_8">
        <pp-grid-item>
            <pp-input v-model="text" placeholder="Enter your name" />
        </pp-grid-item>
        <pp-grid-item>
            <pp-button value="Enter" @click="createUser" />
        </pp-grid-item>
    </pp-grid>
</template>
