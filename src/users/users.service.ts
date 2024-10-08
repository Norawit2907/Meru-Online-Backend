import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  UserMongo,
  UserDocument,
} from 'src/server-adaptor-mongo/user.schema.mongo';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/model/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('UserMongo') private userModel: Model<UserMongo>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    newUser.save();
    return this.toEntity(newUser);
  }

  async getUserById(id: string): Promise<User | null> {
    const existUser = await this.userModel.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    
    return existUser ? this.toEntity(existUser) : null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const existUser = await this.userModel.findOne({
      email: email,
    });

    return existUser ? this.toEntity(existUser) : null;
  }

  async listUsers(): Promise<User[]> {
    const allUser = await this.userModel.find({});
    return allUser.map((doc) => this.toEntity(doc));
  }

  async updateUserById(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(id),
      },
      updateUserDto,
      { new: true },
    );

    return updatedUser ? this.toEntity(updatedUser) : null;
  }

  async deleteUserById(id: string): Promise<null> {
    await this.userModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    return null;
  }

  toEntity(doc: UserDocument): User {
    return {
      id: doc._id.toHexString(),
      firstName: doc.firstname,
      lastName: doc.lastname,
      phoneNumber: doc.phoneNumber,
      location: doc.location,
      email: doc.email,
      password: doc.password,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
  }
}
