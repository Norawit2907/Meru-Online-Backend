import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { WatuserController } from './watuser/watuser.controller';
import { WatuserService } from './watuser/watuser.service';
import { WatuserModule } from './watuser/watuser.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.development.env' }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    UsersModule,
    WatuserModule,
  ],
  controllers: [AppController, WatuserController],
  providers: [AppService, WatuserService],
})
export class AppModule {}
