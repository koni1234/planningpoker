import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CreateUserDto } from './dto/input/CreateUser.dto';
import { User } from '../../graphql';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}

  async getUser(id: string): Promise<User | undefined> {
    return await this.cacheService.get<User>(id);
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const user: User = {
      name: dto.name,
      id: uuidv4(),
    };

    console.log(user)

    await this.cacheService.set(user.id, user, 999999);

    return user;
  }
}
