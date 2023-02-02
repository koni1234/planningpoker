export enum VotingScaleEnum {
    fibonacci = 'fibonacci',
    //tshirt = 'tshirt',
}

export interface UserInterface {
    id: string;
    name: string;
    vote?: string | null;
    online?: boolean;
}

export interface GameInterface {
    id: string;
    ownerId: string;
    name: string;
    votingScale: VotingScaleEnum;
    users?: UserInterface[];
    closed: boolean;
    issueId?: string | null;
}

export interface GameIssue {
    id: string;
    key: string;
    renderedFields: {
        description: string;
    };
    fields: {
        summary: string;
        description: string;
    };
}

export interface CreateUserResponseInterface {
    createUser: UserInterface;
}

export interface GetUserResponseInterface {
    getUser: UserInterface;
}

export interface CreateGameResponseInterface {
    createGame: GameInterface;
}

export interface GameUpdatedResponseInterface {
    gameUpdated: GameInterface;
}

export interface GetGameResponseInterface {
    getGame: GameInterface;
}

export interface GetGameIssueResponseInterface {
    getIssue: GameIssue;
}
