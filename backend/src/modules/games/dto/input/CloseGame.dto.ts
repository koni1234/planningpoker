import { IsString } from 'class-validator';
import { CloseGameInput } from '../../../../graphql';

export class CloseGameDto implements CloseGameInput {
  @IsString()
  readonly gameId: string;

  @IsString()
  readonly userId: string;
}
