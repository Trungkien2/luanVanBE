import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateFollowDto {
  @ApiProperty({}) // Swagger decorator
  @IsNotEmpty() // Ensures the field is not empty
  readonly following_user_id: string;

  @ApiProperty({}) // Swagger decorator
  @IsNotEmpty() // Ensures the field is not empty
  readonly followed_user_id: string;
}
