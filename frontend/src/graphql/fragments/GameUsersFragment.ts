import gql from 'graphql-tag';

export const GAME_USERS_FRAGMENT = gql`
    fragment GameUsersFragment on Game {
        users {
            id
            name
            vote
            online
        }
    }
`;
