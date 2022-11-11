import { GAME_USERS_FRAGMENT } from './GameUsersFragment';
import gql from 'graphql-tag';

export const GAME_FRAGMENT = gql`
    fragment GameFragment on Game {
        id
        name
        ownerId
        closed
        votingScale
        issueId
        ...GameUsersFragment
    }
    ${GAME_USERS_FRAGMENT}
`;
