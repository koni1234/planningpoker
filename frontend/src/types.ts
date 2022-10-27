export enum VotingScaleEnum {
    fibonacci = 'fibonacci',
    tshirt = 'tshirt',
}

export interface UserInterface {
    id: string;
    name: string;
    vote?: string | null;
}

export interface GameInterface {
    id: string;
    ownerId: string;
    name: string;
    votingScale: VotingScaleEnum;
    users?: UserInterface[];
    closed: boolean;
}

export interface CreateUserResponseInterface {
    createUser: UserInterface;
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
