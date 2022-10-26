import { USERS_FRAGMENT } from './fragments';
import gql from 'graphql-tag';

export const GAME_CREATED = gql`
    subscription roomCreated {
        roomCreated {
            id
            ownerId
            votingScale
            name
            ...UsersFragment
        }
    }
    ${USERS_FRAGMENT}
`;

export const GAME_UPDATED = gql`
    subscription roomUpdated {
        roomUpdated {
            id
            ownerId
            votingScale
            name
            ...UsersFragment
        }
    }
    ${USERS_FRAGMENT}
`;
