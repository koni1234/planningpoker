import { Module } from '@nestjs/common';
import { RoomsService } from './Rooms.service';
import { RoomsResolver } from './Rooms.resolver';

@Module({
  providers: [RoomsService, RoomsResolver],
})
export class RoomsModule {}
