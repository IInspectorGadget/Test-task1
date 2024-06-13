import {
  Controller,
  Get,
  UsePipes,
  Post,
  ValidationPipe,
  Body,
  Query,
} from '@nestjs/common';
import { TaskService } from './userLogs.service';
import { GetUsersDto, UserLogsDto } from './userLogs.dto';
import { UserLog } from '@prisma/client';

@Controller('userLogs')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getUserLog(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    dto: GetUsersDto,
  ): Promise<UserLog[]> {
    return this.taskService.getUserLog(
      dto.page || 1,
      dto.pageSize || 10,
      dto.user_id,
    );
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createUserLog(
    @Body(new ValidationPipe()) dto: UserLogsDto,
  ): Promise<UserLog> {
    const res = await this.taskService.createUserLog(dto);
    return res;
  }
}
