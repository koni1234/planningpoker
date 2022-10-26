import { USERS_FRAGMENT } from './fragments';
import gql from 'graphql-tag';

export const CREATE_USER = gql`
    mutation createUser($input: CreateUserInput!) {
        createUser(createUserInput: $input) {
            id
            name
        }
    }
`;

export const CREATE_GAME = gql`
    mutation createRoom($input: CreateRoomInput!) {
        createRoom(createRoomInput: $input) {
            id
            name
            ownerId
            votingScale
            ...UsersFragment
        }
    }
    ${USERS_FRAGMENT}
`;

export const ENTER_GAME = gql`
    mutation enterRoom($input: EnterRoomInput!) {
        enterRoom(enterRoomInput: $input) {
            id
            name
            ownerId
            votingScale
            ...UsersFragment
        }
    }
    ${USERS_FRAGMENT}
`;

export const LEAVE_GAME = gql`
    mutation leaveRoom($input: LeaveRoomInput!) {
        leaveRoom(leaveRoomInput: $input) {
            id
        }
    }
`;
