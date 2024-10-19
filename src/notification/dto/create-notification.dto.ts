import { IsEnum,  IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NotificationStatus } from 'src/server-adaptor-mongo/notification.schema.mongo';

export class CreateNotificationDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsEnum(NotificationStatus)
  @ApiProperty()
  status: NotificationStatus = NotificationStatus.PENDING;
}
