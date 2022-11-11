import { GAME_FRAGMENT } from '../fragments/GameFragment';
import gql from 'graphql-tag';

export const GET_GAME = gql`
    query getGame($input: ID!) {
        getGame(id: $input) {
            id
            name
            ownerId
            votingScale
            closed
            issueId
            users {
                id
                name
                vote
                online
            }
            ...GameFragment
        }
    }
    ${GAME_FRAGMENT}
`;
