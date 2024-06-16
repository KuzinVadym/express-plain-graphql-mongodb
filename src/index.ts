import pino from 'pino';
import { settings } from './settings';
import { IRootService } from './interfaces';
import { RootService } from './rootService';



const logger = pino();

(async () => {
  let isTask = process.env.RUN_TASK === "true";
  try {
    const rootService: IRootService = new RootService(logger, settings);

    await rootService.withDB();

    await rootService.init();

    rootService.listen();
  } catch (e) {
    let message = 'An error occurred while initializing rewards application.';

    if (process.env.RUN_TASK) {
      message = 'An error occurred while initializing rewards task service.';
    }

    logger.error(e, message);
  }
})();
