import { Express } from 'express';
import { GraphQLSchema } from 'graphql';
import { Logger } from 'pino';
import { IGraphQlHandlers } from './api';

export interface IDatabaseSettings {
  name: string;
  url: string;
}
  
export interface ISettings {
  port: string;
  database?: IDatabaseSettings;
}

export interface IRootService {
  init: (
    schema: GraphQLSchema,
    root: IGraphQlHandlers
  ) => Promise<void>;
  withDB?: () => Promise<void>;
  listen: () => void;
}

export type ILogger = Logger;
