import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(16)
  username: string

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  password: string
}

export class UpdateUserDto {
  username: string
}
