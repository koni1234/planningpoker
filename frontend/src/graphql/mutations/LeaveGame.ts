import gql from 'graphql-tag';

export const LEAVE_GAME = gql`
    mutation leaveGame($input: LeaveGameInput!) {
        leaveGame(leaveGameInput: $input) {
            id
        }
    }
`;
