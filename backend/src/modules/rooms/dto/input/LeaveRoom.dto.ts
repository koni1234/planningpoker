import { IsString } from 'class-validator';
import {EnterRoomInput, LeaveRoomInput} from '../../../../graphql';

export class LeaveRoomDto implements LeaveRoomInput {
  @IsString()
  readonly roomId: string;

  @IsString()
  readonly userId: string;
}
