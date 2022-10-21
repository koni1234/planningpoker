import { GameInterface } from '../../interfaces/Game.interface';

export class NewGameDto {
  readonly name: string;

  constructor(game: GameInterface) {
    this.name = game.name + ' dto';
  }
}
