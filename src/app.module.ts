import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MinioClientModule } from './minio-client/minio-client.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { AuthModule } from './auth/auth.module';
import { WatsModule } from './wats/wats.module';
import { AddonsModule } from './addons/addons.module';
import { AddressesModule } from './address/addresses.module';
import { NotificationModule } from './notification/notification.module';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.development.env' }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    UsersModule,
    MinioClientModule,
    FileUploadModule,
    AuthModule,
    WatsModule,
    AddonsModule,
    AddressesModule,
    NotificationModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
