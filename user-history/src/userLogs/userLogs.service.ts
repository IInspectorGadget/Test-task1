import { Injectable } from '@nestjs/common';
import { TaskDto } from './userLogs.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TaskService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getUserLog(page: number, pageSize: number, user_id?: number) {
    const skip = (page - 1) * pageSize;
    const where = user_id ? { user_id } : undefined;

    return this.databaseService.userLog.findMany({
      skip,
      take: pageSize,
      where,
    });
  }

  async createUserLog(dto: TaskDto) {
    const date = new Date(dto.date).toISOString();
    return this.databaseService.userLog.create({
      data: {
        user_id: dto.user_id,
        change: dto.change,
        date: date,
      },
    });
  }
}
