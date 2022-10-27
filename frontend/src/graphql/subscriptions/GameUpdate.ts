import { GAME_FRAGMENT } from '../fragments/GameFragment';
import gql from 'graphql-tag';

export const GAME_UPDATED = gql`
    subscription gameUpdated($gameId: ID!) {
        gameUpdated(gameId: $gameId) {
            ...GameFragment
        }
    }
    ${GAME_FRAGMENT}
`;
