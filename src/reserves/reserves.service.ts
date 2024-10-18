import { Injectable, NotFoundException } from '@nestjs/common';
import { ReservesDto } from './dto/reserves.dto';

@Injectable()
export class ReservesService {
  private reserves: ReservesDto[] = [];

  findAll(): ReservesDto[] {
    return this.reserves;
  }

  findOne(id: number): ReservesDto {
    const reserve = this.reserves.find((r) => r.id === id.toString());
    if (!reserve) {
      throw new NotFoundException(`Reserve with ID ${id} not found`);
    }
    return reserve;
  }

  create(createReserveDto: ReservesDto): ReservesDto {
    this.reserves.push(createReserveDto);
    return createReserveDto;
  }

  update(id: number, updateReserveDto: Partial<ReservesDto>): ReservesDto {
    const reserve = this.findOne(id);
    Object.assign(reserve, updateReserveDto);
    return reserve;
  }

  delete(id: number): { message: string } {
    const index = this.reserves.findIndex((r) => r.id === id.toString());
    if (index === -1) {
      throw new NotFoundException(`Reserve with ID ${id} not found`);
    }
    this.reserves.splice(index, 1);
    return { message: `Reserve with ID ${id} deleted successfully` };
  }
}
