import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GeocodingService {

  async getCoordinates(address: string): Promise<{ lat: number; lng: number }> {
    try {
      // Ensure the address is properly URL-encoded for special characters like Thai text
      const encodedAddress = encodeURIComponent(address);
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyC_qm58mcKFbpx4Gv9vQyLdK9hSrnpLA2s`;

      const response = await axios.get(url);

      if (response.data.status !== 'OK') {
        throw new HttpException(
          `Error from Google API: ${response.data.status}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const location = response.data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to fetch coordinates',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
