import { ApiProperty } from '@nestjs/swagger'

export class CreateRequestDto {
  @ApiProperty()
  request_type: string

  @ApiProperty()
  description: string

  @ApiProperty()
  author: string

  @ApiProperty()
  date: string
}
