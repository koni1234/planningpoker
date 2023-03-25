import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './Users.service';
import { CreateUserDto } from './dto/input/CreateUser.dto';
import { User } from 'Graphql';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query('getUser')
  async getUser(@Args('id') id: string): Promise<User> {
    return await this.usersService.getUser(id);
  }

  @Mutation('createUser')
  async createUser(@Args('createUserInput') dto: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(dto);
  }
}
