import { IsString } from 'class-validator';
import { CloseGameInput } from 'Graphql';

export class CloseGameDto implements CloseGameInput {
  @IsString()
  readonly gameId: string;

  @IsString()
  readonly userId: string;
}
