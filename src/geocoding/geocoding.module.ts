import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GeocodingService } from './geocoding.service';
import { GeocodingController } from './geocoding.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [GeocodingService],
  controllers: [GeocodingController],
  exports: [GeocodingService],
})
export class GeocodingModule {}
