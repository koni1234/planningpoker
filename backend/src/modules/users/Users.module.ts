import { Module } from '@nestjs/common';
import { UsersService } from './Users.service';
import { UsersResolver } from './Users.resolver';

@Module({
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
