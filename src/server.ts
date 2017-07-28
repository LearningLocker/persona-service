import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import * as express from 'express';
import config from './config';
import presenter from './expressPresenter';
import logger from './logger';
import serviceFactory from './serviceFactory';
import translatorFactory from './translatorFactory';

const app = express();

const translator = translatorFactory();
const serviceFacade = serviceFactory();
const presenterFacade = presenter({
  bodyParserLimit: config.express.bodyParserLimit,
  customRoute: config.express.customRoute,
  customRouteText: config.express.customRouteText,
  logger,
  morganDirectory: config.express.morganDirectory,
  service: serviceFacade,
  translator,
});

const handleExit = (event: string) => {
  return (error?: any) => {
    if (error !== undefined) {
      logger.error(error.stack);
    }
    logger.info(event);
    process.exit();
  };
};

app.use(presenterFacade);

app.listen(config.express.port, () => {
  logger.info(`Listening on port ${config.express.port}`);
  if (process.send !== undefined) {
    logger.info('Process ready');
    process.send('ready');
  }
  process.on('exit', handleExit('exit'));
  process.on('SIGINT', handleExit('SIGINT'));
  process.on('SIGTERM', handleExit('SIGTERM'));
  process.on('uncaughtException', handleExit('uncaughtException'));
});
