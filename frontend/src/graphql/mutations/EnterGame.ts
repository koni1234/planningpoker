import { GAME_FRAGMENT } from '../fragments/GameFragment';
import gql from 'graphql-tag';

export const ENTER_GAME = gql`
    mutation enterGame($input: EnterGameInput!) {
        enterGame(enterGameInput: $input) {
            ...GameFragment
        }
    }
    ${GAME_FRAGMENT}
`;
