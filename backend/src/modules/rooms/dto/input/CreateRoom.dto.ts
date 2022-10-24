import { IsString } from 'class-validator';
import { CreateRoomInput, VotingScaleType } from '../../../../graphql';

export class CreateRoomDto implements CreateRoomInput {
  @IsString()
  readonly name: string;

  @IsString()
  readonly id: string;

  @IsString()
  readonly ownerId: string;

  @IsString()
  readonly votingScale: VotingScaleType;
}
