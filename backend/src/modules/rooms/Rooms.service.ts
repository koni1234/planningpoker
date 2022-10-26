import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CreateRoomDto } from './dto/input/CreateRoom.dto';
import { Room } from '../../graphql';
import { EnterRoomDto } from './dto/input/EnterRoom.dto';
import { LeaveRoomDto } from './dto/input/LeaveRoom.dto';

@Injectable()
export class RoomsService {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}

  async getRoom(id: string): Promise<Room | undefined> {
    return await this.cacheService.get<Room>('room-' + id);
  }

  async createRoom(dto: CreateRoomDto): Promise<Room> {
    const room: Room = {
      name: dto.name,
      ownerId: dto.ownerId,
      id: dto.id,
      votingScale: dto.votingScale,
      users: [],
    };

    await this.cacheService.set('room-' + room.id, room, 999999);

    return room;
  }

  async enterRoom(dto: EnterRoomDto): Promise<Room> {
    const room = await this.getRoom(dto.roomId);

    room.users.push({
      id: dto.userId,
      name: dto.userName,
    });

    await this.cacheService.set('room-' + room.id, room, 999999);

    return room;
  }

  async leaveRoom(dto: LeaveRoomDto): Promise<Room> {
    const room = await this.getRoom(dto.roomId);

    room.users = room.users.filter((user) => user.id !== dto.userId);

    await this.cacheService.set('room-' + room.id, room, 999999);

    return room;
  }
}
