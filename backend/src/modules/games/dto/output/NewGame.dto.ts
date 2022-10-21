import { GameInterface } from '../../interfaces/Game.interface';

export class NewGameDto {
  readonly id: string;
  readonly name: string;

  constructor(game: GameInterface) {
    this.id = game.id;
    this.name = game.name + ' dto';
  }
}
