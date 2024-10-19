import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WatuserModule } from './watuser/watuser.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MinioClientModule } from './minio-client/minio-client.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { AuthModule } from './auth/auth.module';
import { WatsModule } from './wats/wats.module';
import { AddonsModule } from './addons/addons.module';
import { AddressesModule } from './address/addresses.module';
import { ReservesModule } from './reserves/reserves.module';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.development.env' }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    UsersModule,
    WatuserModule,
    MinioClientModule,
    FileUploadModule,
    AuthModule,
    WatsModule,
    AddonsModule,
    AddressesModule,
    ReservesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
