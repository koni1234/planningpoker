import { GAME_FRAGMENT } from '../fragments/GameFragment';
import gql from 'graphql-tag';

export const VOTE = gql`
    mutation vote($input: VoteInput!) {
        vote(voteInput: $input) {
            ...GameFragment
        }
    }
    ${GAME_FRAGMENT}
`;
