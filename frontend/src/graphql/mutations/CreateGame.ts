import { GAME_FRAGMENT } from '../fragments/GameFragment';
import gql from 'graphql-tag';

export const CREATE_GAME = gql`
    mutation createGame($input: CreateGameInput!) {
        createGame(createGameInput: $input) {
            ...GameFragment
        }
    }
    ${GAME_FRAGMENT}
`;
