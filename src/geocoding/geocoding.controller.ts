import { Controller, Get, Query } from '@nestjs/common';
import { GeocodingService } from './geocoding.service';

@Controller('geocode')
export class GeocodingController {
  constructor(private readonly geocodingService: GeocodingService) {}

  @Get()
  async getCoordinates(@Query('address') address: string) {
    return this.geocodingService.getCoordinates(address);
  }
}
