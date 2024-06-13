import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class TaskDto {
  @Min(1)
  @IsInt()
  user_id: number;
  @IsDateString()
  date: string;
  @IsString()
  change: string;
}

export class GetUsersDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  pageSize?: number;

  @IsOptional()
  @Min(1)
  @IsInt()
  user_id?: number;
}
