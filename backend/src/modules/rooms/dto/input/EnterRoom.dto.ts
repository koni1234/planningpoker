import { IsString } from 'class-validator';
import { EnterRoomInput } from '../../../../graphql';

export class EnterRoomDto implements EnterRoomInput {
  @IsString()
  readonly roomId: string;

  @IsString()
  readonly userId: string;

  @IsString()
  readonly userName: string;
}
