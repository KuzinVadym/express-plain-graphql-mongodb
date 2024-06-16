import { connect } from 'mongoose';
import { IMongoClient, IDatabaseSettings } from '../interfaces';

export class MongoClient implements IMongoClient {

  constructor(
    private readonly settings: IDatabaseSettings
  ) { }

  async connect(): Promise<void> {
    await connect(this.settings!.url, {
      dbName: this.settings!.name
    });
  }
}