import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    minLength: 3,
    maxLength: 16,
    example: 'John Doe',
  })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(16)
  username: string

  @ApiProperty({
    minLength: 8,
    maxLength: 32,
    example: 'thisIsASimPlePaswword1234',
  })
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  password: string
}

export class UpdateUserDto {
  @ApiProperty()
  username: string
}
