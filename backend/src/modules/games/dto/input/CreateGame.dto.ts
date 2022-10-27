import { IsString } from 'class-validator';
import { CreateGameInput, VotingScaleType } from '../../../../graphql';

export class CreateGameDto implements CreateGameInput {
  @IsString()
  readonly name: string;

  @IsString()
  readonly id: string;

  @IsString()
  readonly ownerId: string;

  @IsString()
  readonly votingScale: VotingScaleType;
}
