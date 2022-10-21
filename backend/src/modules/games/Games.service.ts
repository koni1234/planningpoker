import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/input/CreateGame.dto';
import { GameInterface } from './interfaces/Game.interface';
import { NewGameDto } from './dto/output/NewGame.dto';
import { v4 as uuidv4 } from 'uuid';
import { Cache } from 'cache-manager';

@Injectable()
export class GamesService {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}

  async getGame(id: string): Promise<GameInterface | undefined> {
    return await this.cacheService.get<GameInterface>(id);
  }

  async startNewGame(dto: CreateGameDto): Promise<NewGameDto> {
    const game: GameInterface = { name: dto.name, id: uuidv4() };

    await this.cacheService.set(game.id, game, 60000);

    return new NewGameDto(game);
  }
}
