import { Module } from '@nestjs/common';
import { GamesController } from './Games.controller';
import { GamesService } from './Games.service';

@Module({
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
