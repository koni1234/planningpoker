import { IsString } from 'class-validator';
import { VoteInput } from 'Graphql';

export class VoteDto implements VoteInput {
  @IsString()
  readonly gameId: string;

  @IsString()
  readonly userId: string;

  @IsString()
  readonly vote: string;
}
