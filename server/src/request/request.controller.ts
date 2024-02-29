import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common'
import { RequestService } from './request.service'
import { CreateRequestDto } from './dto/create-request.dto'
import { UpdateRequestDto } from './dto/update-request.dto'
import { Request } from './entities/request.entity'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('requests')
@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new request' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Request })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  create(@Body() createRequestDto: CreateRequestDto) {
    return this.requestService.create(createRequestDto)
  }

  @Get()
  @ApiOperation({ summary: 'Returns all requests' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Request })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findAll() {
    return this.requestService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns a request with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Request identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Request })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findOne(@Param('id') id: string) {
    return this.requestService.findOne(+id)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Updates a request with specified id' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Request identifier',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Request })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto) {
    return this.requestService.update(+id, updateRequestDto)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a status of request with specified id' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Request identifier',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Request })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  updateStatus(
    @Param('id') id: string,
    @Body() updateRequestDto: UpdateRequestDto,
  ) {
    return this.requestService.updateStatus(+id, updateRequestDto.status)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a request with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Request identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  remove(@Param('id') id: string) {
    return this.requestService.remove(+id)
  }
}
