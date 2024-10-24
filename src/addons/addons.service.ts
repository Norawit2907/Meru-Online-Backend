import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Addon } from 'src/model/addon.model';
import {  AddonDocument, AddonMongo } from 'src/server-adaptor-mongo/addons.schema.mongo';
import { CreateAddonDto } from './dto/create-addons.dto';
import { UpdateAddonDto } from './dto/update-addons.dto';

@Injectable()
export class AddonsService {
    constructor(@InjectModel('AddonMongo') private addonModel: Model<AddonDocument>) {}

    async createAddon(createaddonDto: CreateAddonDto): Promise<Addon> {
        const newAddon = new this.addonModel(createaddonDto);
        await newAddon.save(); 
        return this.toEntity(newAddon);
    }

    async getAddonById(id: string): Promise<Addon | null> {
        const existAddon = await this.addonModel.findOne({ _id: new mongoose.Types.ObjectId(id) });
        return existAddon ? this.toEntity(existAddon) : null;
    }

    async getAddonByWatId(wat_id: string): Promise<Addon[] | null> {
        const existAddons = await this.addonModel.find({ wat_id: new mongoose.Types.ObjectId(wat_id) });
        return existAddons.length > 0 ? existAddons.map(addon => this.toEntity(addon)) : null;
    }

    async updateAddonById(id: string, updateaddonDto: UpdateAddonDto): Promise<Addon | null> {
        const updatedAddon = await this.addonModel.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(id) },
            updateaddonDto,
            { new: true }
        );
        return updatedAddon ? this.toEntity(updatedAddon) : null;
    }

    async listAddons(): Promise<Addon[]> {
        const allAddons = await this.addonModel.find({});
        return allAddons.map((doc) => this.toEntity(doc));
    }

    async deleteAddonById(id: string): Promise<null> {
        await this.addonModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
        return null;
    }

    toEntity(doc: AddonDocument): Addon {
        return {
            id: doc._id.toHexString(), 
            name: doc.name,
            wat_id: doc.wat_id,
            image: doc.image,
            cost: doc.cost,
            catalog: doc.catalog,
            description: doc.description,
            createdAt: doc.createdAt.toISOString(),
            updatedAt: doc.updatedAt.toISOString(),
        };
    }
}
