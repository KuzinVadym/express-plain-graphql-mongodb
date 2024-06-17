import pino from 'pino';
import { settings } from './settings';
import { IRootService } from './interfaces';
import { RootService } from './rootService';
import plainSchema from './api/schemas';

const logger = pino();

(async () => {
  try {
    const rootService: IRootService = new RootService(logger, settings);

    await rootService.withDB();

    await rootService.init(plainSchema);

    rootService.listen();
  } catch (e) {
    let message = 'An error occurred while initializing application.';

    logger.error(e, message);
  }
})();
