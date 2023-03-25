import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CreateUserDto } from './dto/input/CreateUser.dto';
import { User } from 'Graphql';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}

  async getUser(id: string): Promise<User | undefined> {
    return await this.cacheService.get<User>('user-' + id);
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const user: User = {
      name: dto.name,
      id: uuidv4(),
    };

    await this.cacheService.set('user-' + user.id, user, {
      ttl: 12220,
    });

    return user;
  }
}
