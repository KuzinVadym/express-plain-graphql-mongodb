import { Mongoose } from 'mongoose';

export interface IMongoClient {
  connect: () => Promise<void>;
}