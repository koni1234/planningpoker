import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { UsersService } from './Users.service';
import { CreateUserDto } from './dto/input/CreateUser.dto';
import { User } from '../../graphql';

const pubSub = new PubSub();

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query('getUser')
  async getUser(@Args('id') id: string): Promise<User> {
    return await this.usersService.getUser(id);
  }

  @Mutation('createUser')
  async createUser(@Args('createUserInput') dto: CreateUserDto): Promise<User> {
    const user = await this.usersService.createUser(dto);

    pubSub.publish('userCreated', { user });

    return user;
  }

  @Subscription('userCreated')
  roomCreated() {
    return pubSub.asyncIterator('userCreated');
  }
}
