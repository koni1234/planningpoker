import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'graphql-subscriptions';
import { RoomsService } from './Rooms.service';
import { CreateRoomDto } from './dto/input/CreateRoom.dto';
import { Room } from '../../graphql';
import { Inject } from '@nestjs/common';
import { EnterRoomDto } from './dto/input/EnterRoom.dto';
import { LeaveRoomDto } from './dto/input/LeaveRoom.dto';

@Resolver('Room')
export class RoomsResolver {
  constructor(
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
    private readonly roomsService: RoomsService,
  ) {}

  @Query('getRoom')
  async getRoom(@Args('id') id: string): Promise<Room> {
    const room = await this.roomsService.getRoom(id);

    this.pubSub.publish('roomCreated', room);

    return room;
  }

  @Mutation('createRoom') //ping -> event in: createRoom - out: roomCreated
  async createRoom(@Args('createRoomInput') dto: CreateRoomDto): Promise<Room> {
    const room = await this.roomsService.createRoom(dto);

    this.pubSub.publish('roomCreated', room);

    return room;
  }

  @Subscription('roomCreated', {
    resolve: (value) => value,
  })
  roomCreated() {
    return this.pubSub.asyncIterator('roomCreated');
  }

  @Mutation('enterRoom')
  async enterRoom(@Args('enterRoomInput') dto: EnterRoomDto): Promise<Room> {
    const room = await this.roomsService.enterRoom(dto);

    this.pubSub.publish('roomUpdated', room);

    return room;
  }

  @Mutation('leaveRoom')
  async leaveRoom(@Args('leaveRoomInput') dto: LeaveRoomDto): Promise<Room> {
    const room = await this.roomsService.leaveRoom(dto);

    this.pubSub.publish('roomUpdated', room);

    return room;
  }

  @Subscription('roomUpdated', {
    resolve: (value) => value,
  })
  roomUpdated() {
    return this.pubSub.asyncIterator('roomUpdated');
  }
}
