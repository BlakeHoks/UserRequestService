import { ApiProperty } from '@nestjs/swagger'

export class Request {
  @ApiProperty({ description: 'Request identifier', nullable: false })
  id: number

  @ApiProperty({ description: 'Request type', nullable: false })
  request_type: string

  @ApiProperty({ description: 'Request description', nullable: true })
  description: string

  @ApiProperty({ description: 'Request author name', nullable: false })
  author: string

  @ApiProperty({ description: 'Date of creation a request', nullable: false })
  date: string

  @ApiProperty({ description: 'Request status', nullable: false })
  status: string
}
