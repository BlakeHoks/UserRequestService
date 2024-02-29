import { Module } from '@nestjs/common'
import { RequestService } from './request.service'
import { RequestController } from './request.controller'
import { DbModule } from '../db/db.module'

@Module({
  imports: [DbModule],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
