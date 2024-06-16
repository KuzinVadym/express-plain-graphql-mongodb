import { Express } from 'express';
import { Logger } from 'pino';

export interface IDatabaseSettings {
  name: string;
  url: string;
}
  
export interface ISettings {
  port: string;
  database?: IDatabaseSettings;
}

export interface IRootService {
  init: () => Promise<void>;
  withDB?: () => Promise<void>;
  listen: () => void;
}

export type ILogger = Logger;
