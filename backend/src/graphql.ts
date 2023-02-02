
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum VotingScaleType {
    fibonacci = "fibonacci",
    tshirt = "tshirt"
}

export interface CreateGameInput {
    id: string;
    ownerId: string;
    ownerName: string;
    name: string;
    votingScale: VotingScaleType;
}

export interface EnterGameInput {
    gameId: string;
    userId: string;
    userName: string;
}

export interface LeaveGameInput {
    gameId: string;
    userId: string;
}

export interface VoteInput {
    gameId: string;
    userId: string;
    vote: string;
}

export interface CloseGameInput {
    gameId: string;
    userId: string;
}

export interface ResetGameInput {
    gameId: string;
    userId: string;
}

export interface SetGameIssueInput {
    gameId: string;
    userId: string;
    issueId: string;
}

export interface SetJiraIssueStoryPointsInput {
    issueId: string;
    storyPoints: number;
}

export interface CreateUserInput {
    name: string;
}

export interface Game {
    id: string;
    ownerId: string;
    name: string;
    votingScale: VotingScaleType;
    closed: boolean;
    users?: Nullable<Nullable<User>[]>;
    issueId?: Nullable<string>;
}

export interface IQuery {
    getGame(id: string): Nullable<Game> | Promise<Nullable<Game>>;
    getIssue(id: string): Nullable<JiraIssue> | Promise<Nullable<JiraIssue>>;
    getUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createGame(createGameInput: CreateGameInput): Nullable<Game> | Promise<Nullable<Game>>;
    enterGame(enterGameInput: EnterGameInput): Nullable<Game> | Promise<Nullable<Game>>;
    leaveGame(leaveGameInput: LeaveGameInput): Nullable<Game> | Promise<Nullable<Game>>;
    vote(voteInput: VoteInput): Nullable<Game> | Promise<Nullable<Game>>;
    resetGame(resetGameInput: ResetGameInput): Nullable<Game> | Promise<Nullable<Game>>;
    closeGame(closeGameInput: CloseGameInput): Nullable<Game> | Promise<Nullable<Game>>;
    setGameIssue(setGameIssueInput: SetGameIssueInput): Nullable<Game> | Promise<Nullable<Game>>;
    setIssueStoryPoints(setIssueStoryPointsInput: SetJiraIssueStoryPointsInput): Nullable<string> | Promise<Nullable<string>>;
    createUser(createUserInput: CreateUserInput): Nullable<User> | Promise<Nullable<User>>;
}

export interface ISubscription {
    gameCreated(): Nullable<Game> | Promise<Nullable<Game>>;
    gameUpdated(gameId: string): Nullable<Game> | Promise<Nullable<Game>>;
}

export interface JiraIssueFields {
    summary?: Nullable<string>;
    description?: Nullable<string>;
}

export interface JiraIssue {
    id: string;
    key: string;
    renderedFields?: Nullable<JiraIssueFields>;
    fields?: Nullable<JiraIssueFields>;
}

export interface User {
    id: string;
    name: string;
    vote?: Nullable<string>;
    online?: Nullable<boolean>;
}

type Nullable<T> = T | null;
