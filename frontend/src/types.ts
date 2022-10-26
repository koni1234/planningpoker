export interface UserInterface {
    id: string;
    name: string;
}

export interface GameInterface {
    id: string;
    ownerId: string;
    name: string;
    votingScale: 'fibonacci' | 'tshirt';
    users?: UserInterface[];
}

export interface CreateUserResponseInterface {
    createUser: UserInterface;
}

export interface CreateGameResponseInterface {
    createRoom: GameInterface;
}

export interface GameUpdatedResponseInterface {
    roomUpdated: GameInterface;
}

export interface GetGameResponseInterface {
    getRoom: GameInterface;
}
