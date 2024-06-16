import express, { Express } from 'express';

import { IGraphQlHandlers, ILogger, IMongoClient, IRootService, ISettings } from './interfaces';
import { MongoClient } from './clients';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema } from 'graphql';

export class RootService implements IRootService {
  app: Express;
  mongoClient: IMongoClient;

  constructor(
    private readonly logger: ILogger,
    private readonly settings: ISettings,
  ) {
    this.app = express();
  }

  public async withDB(): Promise<void> {
    try {
      if (this.settings.database && this.settings.database.url) {
        this.mongoClient = new MongoClient(this.settings.database);
        await this.mongoClient.connect();
        this.logger.info('Connection with DB established');
      } else {
        this.logger.error('Connection setting not provided');
        process.exit(1)
      }
    } catch (error) {
      this.logger.error(error.message);
      process.exit(1)
    }
  }

  async init(schema: GraphQLSchema, root: IGraphQlHandlers): Promise<void> {
    this.logger.info('Init express service');
    this.app = express();

    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(express.urlencoded({ limit: '50mb', extended: true }));

    this.app.use(
      "/graphql",
      graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
      })
    );
  }

  listen(): void {
    this.app.listen(this.settings.port, () => {
      this.logger.info(
        `==> 🌎 Listening on port %s. Open up http://127.0.0.1:${this.settings.port} in your browser.`
      );
    });
  }
}
