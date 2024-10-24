import { Module } from '@nestjs/common';
import { AddonsController } from './addons.controller';
import { AddonsService } from './addons.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AddonMongo, AddonSchema } from 'src/server-adaptor-mongo/addons.schema.mongo';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AddonMongo.name, schema: AddonSchema }]),

  ],
  controllers: [AddonsController],
  providers: [AddonsService]
})

export class AddonsModule {}
