import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { NotificationStatus } from 'src/server-adaptor-mongo/notification.schema.mongo';

export class UpdateNotificationDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  desription: string;

  @IsEnum(NotificationStatus)
  @ApiProperty()
  status: NotificationStatus;
}
