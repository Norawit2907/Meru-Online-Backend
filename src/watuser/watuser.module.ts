import { Module } from '@nestjs/common';
import { WatuserService } from './watuser.service';
import { WatuserController } from './watuser.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  WatuserMongo,
  WatuserSchema,
} from '../server-adaptor-mongo/watuser.schema.mongo';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WatuserMongo.name, schema: WatuserSchema },
    ]),
  ],
  controllers: [WatuserController],
  providers: [WatuserService],
  exports: [WatuserService]
})
export class WatuserModule {}
