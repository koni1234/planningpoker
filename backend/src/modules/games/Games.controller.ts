import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { GamesService } from './Games.service';
import { Response } from 'express';
import { ValidationPipe } from '../../pipes/Validation.pipe';
import { CreateGameDto } from './dto/input/CreateGame.dto';
import { GameInterface } from './interfaces/Game.interface';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  newGame(
    @Body(new ValidationPipe()) dto: CreateGameDto,
    @Res() res: Response<GameInterface>,
  ) {
    return res.status(HttpStatus.OK).json(this.gamesService.startNewGame(dto));
  }
}
