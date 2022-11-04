import { USERS_FRAGMENT } from './UsersFragment';
import gql from 'graphql-tag';

export const GAME_FRAGMENT = gql`
    fragment GameFragment on Game {
        id
        name
        ownerId
        closed
        votingScale
        issueId
        ...UsersFragment
    }
    ${USERS_FRAGMENT}
`;
