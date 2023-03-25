import { IsString } from 'class-validator';
import { CreateGameInput, VotingScaleType } from 'Graphql';

export class CreateGameDto implements CreateGameInput {
  @IsString()
  readonly name: string;

  @IsString()
  readonly id: string;

  @IsString()
  readonly ownerId: string;

  @IsString()
  readonly ownerName: string;

  @IsString()
  readonly votingScale: VotingScaleType;
}
