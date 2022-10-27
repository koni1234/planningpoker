import { IsString } from 'class-validator';
import { EnterGameInput } from '../../../../graphql';

export class EnterGameDto implements EnterGameInput {
  @IsString()
  readonly gameId: string;

  @IsString()
  readonly userId: string;

  @IsString()
  readonly userName: string;
}
