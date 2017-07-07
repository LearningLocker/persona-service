import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import logger from './logger';
import repoFactory from './repoFactory';

const repoFacade = repoFactory();

repoFacade.rollback().then(() => {
  logger.info('Completed rollback');
  process.exit();
}).catch((err) => {
  logger.error(err);
  process.exit();
});
