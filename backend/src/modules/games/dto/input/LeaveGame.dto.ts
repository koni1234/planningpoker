import { IsString } from 'class-validator';
import { LeaveGameInput } from '../../../../graphql';

export class LeaveGameDto implements LeaveGameInput {
  @IsString()
  readonly gameId: string;

  @IsString()
  readonly userId: string;
}
