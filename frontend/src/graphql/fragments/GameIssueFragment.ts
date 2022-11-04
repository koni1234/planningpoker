import gql from 'graphql-tag';

export const GAME_ISSUE_FRAGMENT = gql`
    fragment GameIssueFragment on JiraIssue {
        id
        key
        fields {
            summary
            description
        }
    }
`;
