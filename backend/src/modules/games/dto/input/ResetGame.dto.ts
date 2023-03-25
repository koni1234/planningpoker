import { IsString } from 'class-validator';
import { ResetGameInput } from 'Graphql';

export class ResetGameDto implements ResetGameInput {
  @IsString()
  readonly gameId: string;

  @IsString()
  readonly userId: string;
}
