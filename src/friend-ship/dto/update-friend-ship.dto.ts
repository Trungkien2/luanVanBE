import { PartialType } from '@nestjs/swagger';
import { CreateFriendShipDto } from './create-friend-ship.dto';

export class UpdateFriendShipDto extends PartialType(CreateFriendShipDto) {}
