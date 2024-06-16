import { model, Schema, Types } from 'mongoose';
import { IProductDocument } from '../../interfaces';

const ProductSchema: Schema<IProductDocument> = new Schema({
        _id: { type: Types.ObjectId, require: true },
        vintage: { type: String, require: true },
        name: { type: String, require: true },
        producerId: Types.ObjectId,
        producer: { type: String, require: true }
    },
    {
        timestamps: true
    }
);

const Product = model<IProductDocument>('products', ProductSchema);

export { Product };