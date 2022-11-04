import gql from 'graphql-tag';

export const SET_ISSUE_STORY_POINTS = gql`
    mutation setIssueStoryPoints($input: SetJiraIssueStoryPointsInput!) {
        setIssueStoryPoints(setIssueStoryPointsInput: $input)
    }
`;
