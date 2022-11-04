import { GAME_ISSUE_FRAGMENT } from '../fragments/GameIssueFragment';
import gql from 'graphql-tag';

export const GET_GAME_ISSUE = gql`
    query getIssue($input: ID!) {
        getIssue(id: $input) {
            id
            key
            fields {
                summary
                description
            }
            ...GameIssueFragment
        }
    }
    ${GAME_ISSUE_FRAGMENT}
`;
