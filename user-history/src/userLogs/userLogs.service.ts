import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserLogsDto } from './userLogs.dto';
import { DatabaseService } from '../database/database.service';
import { UserLog } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getUserLog(
    page: number,
    pageSize: number,
    user_id?: number,
  ): Promise<UserLog[]> {
    try {
      const skip = (page - 1) * pageSize;
      const where = user_id ? { user_id } : undefined;

      return this.databaseService.userLog.findMany({
        skip,
        take: pageSize,
        where,
      });
    } catch (error) {
      console.error('Error fetching user logs:', error);
      throw new InternalServerErrorException('Error fetching user logs');
    }
  }

  async createUserLog(dto: UserLogsDto): Promise<UserLog> {
    try {
      const date = new Date(dto.date).toISOString();
      return this.databaseService.userLog.create({
        data: {
          user_id: dto.user_id,
          change: dto.change,
          date: date,
        },
      });
    } catch (error) {
      console.error('Error creating user log:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error creating user log');
    }
  }
}
