import gql from 'graphql-tag';

export const USERS_FRAGMENT = gql`
    fragment UsersFragment on Game {
        users {
            id
            name
            vote
        }
    }
`;
