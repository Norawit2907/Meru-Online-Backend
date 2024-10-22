import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ReservesDto } from './dto/reserves.dto';
import { ReservesMongo } from 'src/server-adaptor-mongo/reserves.schema.mongo';
import { WatMongo } from 'src/server-adaptor-mongo/wat.schema.mongo';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class ReservesService {
  constructor(
    @InjectModel('ReservesMongo') private reservesModel: Model<ReservesMongo>,
    @InjectModel('WatMongo') private watModel: Model<WatMongo>,
    private readonly notificationService: NotificationService,
  ) { }


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
    const durationDays = Number(createReserveDto.duration);
    const endDate = new Date(reservationDate);
    const nowDate = new Date();
    const sender = createReserveDto.sender;
    let owner_noti_id = createReserveDto.user_id
    // const noti_describtion = {};
    if (reservationDate < nowDate) {
      throw new ConflictException("Reservation date cannot be in the past.");
    }

    if (sender === 'user') {
      owner_noti_id = createReserveDto.wat_id;
    }
    if (sender === 'wat') {
      owner_noti_id = createReserveDto.user_id;
    }
    endDate.setDate(reservationDate.getDate() + durationDays);

    const existingReservations = await this.reservesModel.find({
      wat_id: createReserveDto.wat_id,
      reservation_date: {
        $gte: reservationDate.toISOString().split('T')[0],
        $lt: endDate.toISOString().split('T')[0],
      },
    });

    // console.log(nowDate == reservationDate);

    const existingCremations = await this.reservesModel.find({
      wat_id: createReserveDto.wat_id,
      cremation_date: createReserveDto.cremation_date
    });

    const maxWorkload = await this.watModel.findOne({
      _id: new mongoose.Types.ObjectId(createReserveDto.wat_id),
    })

    // console.log(maxWorkload.max_workload);
    // console.log(existingCremations);
    // console.log(endDate.toISOString().split('T')[0] < cremationDate.toISOString().split('T')[0]);
    if (existingReservations.length > 0) {
      throw new ConflictException('A reservation with the same wat_id and overlapping dates already exists.');
    }
    if (existingCremations.length >= maxWorkload.max_workload) {
      throw new ConflictException('A Wat Meru is Full');
    }

    // Send a notification after saving the reservation
    await this.notificationService.createNotification({
      title: 'Reservation Incoming',
      description: `Addons : ${createReserveDto.addons} Price: ${createReserveDto.price}`,
      owner_id: owner_noti_id,
    });

    const newReserve = new this.reservesModel(createReserveDto);
    return newReserve.save();
  }


  async update(
    id: string,
    updateReserveDto: Partial<ReservesDto>,
  ): Promise<ReservesMongo> {
    const updatedReserve = await this.reservesModel
      .findByIdAndUpdate(id, updateReserveDto, { new: true })
      .exec();

    if (!updatedReserve) {
      throw new NotFoundException(`Reserve with ID ${id} not found`);
    }

    await this.notificationService.createNotification({
      title: `Reservation have been ${updateReserveDto.status}` ,
      description: `describtion`,
      owner_id: updateReserveDto.sender == "user" ? updatedReserve.wat_id : updatedReserve.user_id,
    });

    return updatedReserve;
  }


  async delete(id: string): Promise<{ message: string }> {
    const result = await this.reservesModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Reserve with ID ${id} not found`);
    }
    return { message: `Reserve with ID ${id} deleted successfully` };
  }
}
