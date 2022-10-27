import { Module } from '@nestjs/common';
import { GamesService } from './Games.service';
import { GamesResolver } from './Games.resolver';

@Module({
  providers: [GamesService, GamesResolver],
})
export class GamesModule {}
