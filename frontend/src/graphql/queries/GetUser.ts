import gql from 'graphql-tag';

export const GET_USER = gql`
    query getUser($input: ID!) {
        getUser(id: $input) {
            id
            name
            vote
            online
        }
    }
`;
