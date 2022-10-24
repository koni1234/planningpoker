
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

export interface CreateRoomInput {
    id: string;
    ownerId: string;
    name: string;
    votingScale: VotingScaleType;
}

export interface CreateUserInput {
    name: string;
}

export interface Room {
    id: string;
    ownerId: string;
    name: string;
    votingScale: VotingScaleType;
}

export interface IQuery {
    getRoom(id: string): Nullable<Room> | Promise<Nullable<Room>>;
    getUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createRoom(createRoomInput: CreateRoomInput): Nullable<Room> | Promise<Nullable<Room>>;
    createUser(createUserInput: CreateUserInput): Nullable<User> | Promise<Nullable<User>>;
}

export interface ISubscription {
    roomCreated(): Nullable<Room> | Promise<Nullable<Room>>;
    userCreated(): Nullable<User> | Promise<Nullable<User>>;
}

export interface User {
    id: string;
    name: string;
}

type Nullable<T> = T | null;
