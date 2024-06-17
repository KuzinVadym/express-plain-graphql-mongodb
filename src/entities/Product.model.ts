import { model, Schema, Types } from 'mongoose';
import { IProductDocument } from '../interfaces';

const ProductSchema: Schema<IProductDocument> = new Schema({
        vintage: { type: String, require: true },
        name: { type: String, require: true },
        producerId: Types.ObjectId,
    },
    {
        timestamps: true
    }
);

const ProductModel = model<IProductDocument>('products', ProductSchema);

export { ProductModel };