import { GAME_FRAGMENT } from '../fragments/GameFragment';
import gql from 'graphql-tag';

export const CLOSE_GAME = gql`
    mutation closeGame($input: CloseGameInput!) {
        closeGame(closeGameInput: $input) {
            ...GameFragment
        }
    }
    ${GAME_FRAGMENT}
`;
