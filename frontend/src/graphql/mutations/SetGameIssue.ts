import { GAME_FRAGMENT } from '../fragments/GameFragment';
import gql from 'graphql-tag';

export const SET_GAME_ISSUE = gql`
    mutation setGameIssue($input: SetGameIssueInput!) {
        setGameIssue(setGameIssueInput: $input) {
            ...GameFragment
        }
    }
    ${GAME_FRAGMENT}
`;
