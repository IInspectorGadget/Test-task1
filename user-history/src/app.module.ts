import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './userLogs/userLogs.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [TaskModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
