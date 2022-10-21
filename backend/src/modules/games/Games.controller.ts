import {
  CacheInterceptor,
  UseInterceptors,
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  Get,
  Param,
} from '@nestjs/common';
import { GamesService } from './Games.service';
import { Response } from 'express';
import { ValidationPipe } from '../../pipes/Validation.pipe';
import { CreateGameDto } from './dto/input/CreateGame.dto';
import { GameInterface } from './interfaces/Game.interface';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @UseInterceptors(CacheInterceptor)
  @Get('/:id')
  async getGame(@Param('id') id: string, @Res() res: Response<GameInterface>) {
    const game = await this.gamesService.getGame(id);

    return res.json(game);
  }

  @Post()
  async newGame(
    @Body(new ValidationPipe()) dto: CreateGameDto,
    @Res() res: Response<GameInterface>,
  ) {
    const game = await this.gamesService.startNewGame(dto);

    return res.status(HttpStatus.CREATED).json(game);
  }
}
