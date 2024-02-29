import { PartialType } from '@nestjs/mapped-types'
import { CreateRequestDto } from './create-request.dto'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateRequestDto {
  @ApiProperty()
  request_type?: string

  @ApiProperty()
  description?: string

  @ApiProperty()
  author?: string

  @ApiProperty()
  date?: string

  @ApiProperty()
  status?: string
}
