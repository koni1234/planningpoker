import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CreateRoomDto } from './dto/input/CreateRoom.dto';
import { Room } from '../../graphql';

@Injectable()
export class RoomsService {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}

  async getRoom(id: string): Promise<Room | undefined> {
    return await this.cacheService.get<Room>(id);
  }

  async createRoom(dto: CreateRoomDto): Promise<Room> {
    const room: Room = {
      name: dto.name,
      ownerId: dto.ownerId,
      id: dto.id,
      votingScale: dto.votingScale,
    };

    await this.cacheService.set(room.id, room, 999999);

    return room;
  }
}
