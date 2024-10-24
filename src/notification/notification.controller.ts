import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    NotFoundException,
    HttpCode,
    Put,
    UseGuards,
    UseInterceptors,
    UploadedFile,
  } from '@nestjs/common';
  import { NotificationService } from './notification.service';
  import { CreateNotificationDto } from './dto/create-notification.dto';
  import { UpdateNotificationDto } from './dto/update-notification.dto';
  import { Notification } from 'src/model/notification.model';
  import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
  import { AuthGuard } from 'src/guard/auth.guard';
  import { FileInterceptor } from '@nestjs/platform-express';
  
  @ApiBearerAuth('bearer')
  @ApiTags('notification')
  @Controller('notification')
  export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}
  
    @Post()
    async createNotification(
      @Body() createNotificationDto: CreateNotificationDto,
    ): Promise<Notification> {
      return await this.notificationService.createNotification(createNotificationDto);
    }
  
    // @UseGuards(AuthGuard)
    @Get()
    async listNotification(): Promise<Notification[]> {
      return await this.notificationService.listNotification();
    }

    
  
    // @UseGuards(AuthGuard)
    @Get(':id')
    async getNotificationById(@Param('id') id: string): Promise<Notification> {
      const notification = await this.notificationService.getNotificationById(id);
      if (!notification) {
        throw new NotFoundException('Notification not found!');
      }
      return notification;
    }
  
    // @UseGuards(AuthGuard)
    @Put(':id')
    async updateNotificationById(
      @Param('id') id: string,
      @Body() updateNotificationDto: UpdateNotificationDto,
    ): Promise<Notification> {
      const notification = await this.notificationService.updateNotificationById(id, updateNotificationDto);
      if (!notification) {
        throw new NotFoundException('Notification not found!');
      }
      return notification;
    }
  
    @Delete(':id')
    @HttpCode(204)
    async deleteNotificationById(@Param('id') id: string) {
      const notification = await this.notificationService.getNotificationById(id);
      if (!notification) {
        throw new NotFoundException('Notification not found!');
      }
      await this.notificationService.deleteNotificationById(id);
  
      return { message: 'Notification Deleted Sucessfully' };
    }
  }
  