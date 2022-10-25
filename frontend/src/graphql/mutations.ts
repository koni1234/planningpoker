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
        }
    }
`;
