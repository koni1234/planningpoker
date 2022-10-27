import { GAME_FRAGMENT } from '../fragments/GameFragment';
import gql from 'graphql-tag';

export const RESET_GAME = gql`
    mutation resetGame($input: ResetGameInput!) {
        resetGame(resetGameInput: $input) {
            ...GameFragment
        }
    }
    ${GAME_FRAGMENT}
`;
