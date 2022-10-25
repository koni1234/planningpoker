import gql from 'graphql-tag';

export const GAME_CREATED = gql`
    subscription roomCreated {
        roomCreated {
            id
            ownerId
            votingScale
            name
        }
    }
`;
