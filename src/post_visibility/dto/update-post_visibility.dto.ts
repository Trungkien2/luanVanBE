import { PartialType } from '@nestjs/swagger';
import { CreatePostVisibilityDto } from './create-post_visibility.dto';

export class UpdatePostVisibilityDto extends PartialType(CreatePostVisibilityDto) {}
