import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { RequestModule } from './request/request.module'
import { ConfigModule } from '@nestjs/config'
import { DbModule } from './db/db.module'

@Module({
  imports: [RequestModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
