import gql from 'graphql-tag';

export const GET_GAME = gql`
    query getRoom($input: ID!) {
        getRoom(id: $input) {
            id
            name
            ownerId
            votingScale
        }
    }
`;
