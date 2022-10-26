
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

export interface EnterRoomInput {
    roomId: string;
    userId: string;
    userName: string;
}

export interface LeaveRoomInput {
    roomId: string;
    userId: string;
}

export interface CreateUserInput {
    name: string;
}

export interface Room {
    id: string;
    ownerId: string;
    name: string;
    votingScale: VotingScaleType;
    users?: Nullable<Nullable<User>[]>;
}

export interface IQuery {
    getRoom(id: string): Nullable<Room> | Promise<Nullable<Room>>;
    getUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createRoom(createRoomInput: CreateRoomInput): Nullable<Room> | Promise<Nullable<Room>>;
    enterRoom(enterRoomInput: EnterRoomInput): Nullable<Room> | Promise<Nullable<Room>>;
    leaveRoom(leaveRoomInput: LeaveRoomInput): Nullable<Room> | Promise<Nullable<Room>>;
    createUser(createUserInput: CreateUserInput): Nullable<User> | Promise<Nullable<User>>;
}

export interface ISubscription {
    roomCreated(): Nullable<Room> | Promise<Nullable<Room>>;
    roomUpdated(): Nullable<Room> | Promise<Nullable<Room>>;
}

export interface User {
    id: string;
    name: string;
}

type Nullable<T> = T | null;
