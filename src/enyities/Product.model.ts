import { model, Schema, Types } from 'mongoose';
import { IProductDocument } from '../interfaces';

const ProductSchema: Schema<IProductDocument> = new Schema({
        _id: Types.ObjectId,
        vintage: { type: String, require: true },
        name: { type: String, require: true },
        producerId: Types.ObjectId,
        producer: { type: String, require: true }
    },
    {
        timestamps: true
    }
);

const ProductModel = model<IProductDocument>('products', ProductSchema);

export { ProductModel };