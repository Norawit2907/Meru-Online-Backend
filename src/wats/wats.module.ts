import { Module } from '@nestjs/common';
import { WatsController } from './wats.controller';
import { WatsService } from './wats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WatMongo, WatSchema } from 'src/server-adaptor-mongo/wat.schema.mongo';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: WatMongo.name, schema: WatSchema }]),
  ],
  controllers: [WatsController],
  providers: [WatsService],
  exports: [WatsService]
})

export class WatsModule {}
