import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserDTO {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly gender: string;
  readonly bio: string;
}


export class SignUpUserDTO {
  @ApiProperty({ description: 'Name of the user' }) // Swagger decorator
  @IsString() // Validator for string type
  @IsNotEmpty() // Ensures the field is not empty
  readonly name: string;

  @ApiProperty({ description: 'Email of the user' }) // Swagger decorator
  @IsEmail() // Validator for email format
  @IsNotEmpty() // Ensures the field is not empty
  readonly email: string;

  @ApiProperty({ description: 'Password of the user', minLength: 6 }) // Swagger decorator with additional metadata
  @IsString() // Validator for string type
  @IsNotEmpty() // Ensures the field is not empty
  @MinLength(8) // Ensures password has at least 6 characters
  readonly password: string;
}
export class LoginUserDTO {
  @ApiProperty({ description: 'Email of the user' }) // Swagger decorator
  @IsEmail() // Validator for email format
  @IsNotEmpty() // Ensures the field is not empty
  readonly email : string;
  @ApiProperty({ description: 'Password of the user', minLength: 6 }) // Swagger decorator with additional metadata
  @IsString() // Validator for string type
  @IsNotEmpty() // Ensures the field is not empty
  @MinLength(8) // Ensures password has at least 6 characters
  readonly password : string;
}
