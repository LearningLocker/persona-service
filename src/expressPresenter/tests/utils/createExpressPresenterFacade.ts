import config from '../../../config';
import logger from '../../../logger';
import Service from '../../../serviceFactory/Service';
import translatorFactory from '../../../translatorFactory';
import expressPresenterFacade from '../../index';

const createExpressPresenterFacade = (service: Service) => {
  const expressPresenter = expressPresenterFacade({
    bodyParserLimit: config.express.bodyParserLimit,
    customRoute: config.express.customRoute,
    customRouteText: config.express.customRouteText,
    logger,
    morganDirectory: config.express.morganDirectory,
    service,
    translator: translatorFactory(),
  });
  return expressPresenter;
};

export default createExpressPresenterFacade;
