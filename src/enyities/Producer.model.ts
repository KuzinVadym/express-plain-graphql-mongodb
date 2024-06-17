import { model, Schema, Types } from 'mongoose';
import { IProducerDocument } from '../interfaces';

const ProducerSchema: Schema<IProducerDocument> = new Schema({
        _id: { type: Types.ObjectId, require: true },
        name: { type: String, require: true },
        country: { type: String, require: true },
        region: { type: String, require: true },
    },
    {
        timestamps: true
    }
);

const ProducerModel = model<IProducerDocument>('producers', ProducerSchema);

export { ProducerModel };