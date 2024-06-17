import { config } from 'dotenv';
import { ISettings } from './interfaces';

config();
const env: any = process.env;

// here actually we need to define also config for dev and test db
const settings: ISettings = {
  port: env.PORT || 3333,
  database: {
    name: env.DB_NAME,
    url: env.DB_URL
  }
};

console.log('settings');
console.log(settings);

export { settings };
