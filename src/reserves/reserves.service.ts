import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReservesDto } from './dto/reserves.dto';
import { ReservesMongo } from 'src/server-adaptor-mongo/reserves.schema.mongo';

@Injectable()
export class ReservesService {
  constructor(
    @InjectModel('ReservesMongo') private reservesModel: Model<ReservesMongo>,
  ) {}

  
  async findAll(): Promise<ReservesMongo[]> {
    return this.reservesModel.find().exec(); // Use .exec() to return a Promise
  }

  
  async findOne(id: string): Promise<ReservesMongo> {
    const reserve = await this.reservesModel.findById(id).exec();
    if (!reserve) {
      throw new NotFoundException(`Reserve with ID ${id} not found`);
    }
    return reserve;
  }

  
  async create(createReserveDto: ReservesDto): Promise<ReservesMongo> {
        const reservationDate = new Date(createReserveDto.reservation_date);
        const cremationDate = new Date(createReserveDto.cremation_date);
        const durationDays = Number(createReserveDto.duration);

        
        const endDate = new Date(reservationDate);
        endDate.setDate(reservationDate.getDate() + durationDays);

       
        const existingReservations = await this.reservesModel.find({
            wat_id: createReserveDto.wat_id,
            reservation_date: { 
                $gte: reservationDate.toISOString().split('T')[0],
                $lt: endDate.toISOString().split('T')[0],
            },
        });
        // console.log(endDate.toISOString().split('T')[0] < cremationDate.toISOString().split('T')[0]);
        if (existingReservations.length > 0) {
            throw new ConflictException('A reservation with the same wat_id and overlapping dates already exists.');
        }
        if(endDate.toISOString().split('T')[0] < cremationDate.toISOString().split('T')[0]){
            throw new ConflictException('A cremationDate is beyond endDate.');
        }
    const newReserve = new this.reservesModel(createReserveDto);
    return newReserve.save(); 
  }

  
//   async update(
//     id: string,
//     updateReserveDto: Partial<ReservesDto>,
//   ): Promise<ReservesMongo> {
//     const updatedReserve = await this.reservesModel
//       .findByIdAndUpdate(id, updateReserveDto, { new: true })
//       .exec();

//     if (!updatedReserve) {
//       throw new NotFoundException(`Reserve with ID ${id} not found`);
//     }
//     return updatedReserve;
//   }

  
  async delete(id: string): Promise<{ message: string }> {
    const result = await this.reservesModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Reserve with ID ${id} not found`);
    }
    return { message: `Reserve with ID ${id} deleted successfully` };
  }
}
