import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { RoomsService } from './Rooms.service';
import { CreateRoomDto } from './dto/input/CreateRoom.dto';
import { Room } from '../../graphql';


const pubSub = new PubSub();

@Resolver('Room')
export class RoomsResolver {
  constructor(private readonly roomsService: RoomsService) {}

  @Query('getRoom')
  async getRoom(@Args('id') id: string): Promise<Room> {
    return await this.roomsService.getRoom(id);
  }

  @Mutation('createRoom')
  async createRoom(@Args('createRoomInput') dto: CreateRoomDto): Promise<Room> {
    const room = await this.roomsService.createRoom(dto);

    pubSub.publish('roomCreated', { room });

    return room;
  }

  @Subscription('roomCreated')
  roomCreated() {
    return pubSub.asyncIterator('roomCreated');
  }
}
