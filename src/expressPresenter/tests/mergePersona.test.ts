import * as express from 'express';
import * as supertest from 'supertest';
import config from '../../config';
import logger from '../../logger';
import serviceFactory from '../../serviceFactory';
import createTestPersona from '../../tests/utils/createTestPersona';
import translatorFactory from '../../translatorFactory';
import expressPresenterFacade from '../index';
import { OK_200_HTTP_CODE } from '../utils/httpCodes';

const app = express();

const service = serviceFactory();
const expressPresenter = expressPresenterFacade({
  bodyParserLimit: config.express.bodyParserLimit,
  customRoute: config.express.customRoute,
  customRouteText: config.express.customRouteText,
  logger,
  morganDirectory: config.express.morganDirectory,
  service,
  translator: translatorFactory(),
});

app.use(expressPresenter);

describe('/mergePersona', () => {
  it('should merge when using different existing personas', async () => {
    const fromPersona = await createTestPersona();
    const toPersona = await createTestPersona();
    await supertest(app)
      .post('/mergePersona')
      .set('Content-Type', 'application/json')
      .send({
        fromPersonaId: fromPersona.id,
        toPersonaId: toPersona.id,
      })
      .expect(OK_200_HTTP_CODE, []);
  });
});
