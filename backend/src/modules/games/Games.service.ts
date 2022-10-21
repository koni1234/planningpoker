import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/input/CreateGame.dto';
import { GameInterface } from './interfaces/Game.interface';
import { NewGameDto } from './dto/output/NewGame.dto';

@Injectable()
export class GamesService {
  private readonly games: GameInterface[] = [];

  startNewGame(dto: CreateGameDto): NewGameDto {
    return new NewGameDto(dto);
  }
}
