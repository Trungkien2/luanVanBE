import { PartialType } from '@nestjs/swagger';
import { CreatePostHashtagDto } from './create-post_hashtag.dto';

export class UpdatePostHashtagDto extends PartialType(CreatePostHashtagDto) {}
