import gql from 'graphql-tag';

export const GAME_ISSUE_FRAGMENT = gql`
    fragment GameIssueFragment on JiraIssue {
        id
        key
        renderedFields {
            description
        }
        fields {
            summary
            description
        }
    }
`;
