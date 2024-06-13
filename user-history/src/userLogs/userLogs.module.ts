import { Module } from '@nestjs/common';
import { TaskService } from './userLogs.service';
import { TaskController } from './userLogs.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
