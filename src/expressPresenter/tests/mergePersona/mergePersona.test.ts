import * as express from 'express';
import * as supertest from 'supertest';
import serviceFactory from '../../../serviceFactory';
import { TEST_CLIENT, TEST_IFI } from '../../../tests/utils/values';
import { OK_200_HTTP_CODE } from '../../utils/httpCodes';
import createExpressPresenterFacade from '../utils/createExpressPresenterFacade';

const app = express();

const service = serviceFactory();
const expressPresenter = createExpressPresenterFacade(service);

app.use(expressPresenter);

describe('/mergePersona', () => {
  it('should merge when two empty personas', async () => {
    const { persona: fromPersona } = await service.createPersona({
      client: TEST_CLIENT,
      name: 'Dave1',
    });
    const { persona: toPersona } = await service.createPersona({
      client: TEST_CLIENT,
      name: 'Dave2',
    });
    await supertest(app)
      .post('/mergePersona')
      .set('Content-Type', 'application/json')
      .send({
        fromPersonaId: fromPersona.id,
        toPersonaId: toPersona.id,
      })
      .expect(OK_200_HTTP_CODE, []);
  });

  it('should merge identy persoans returning the merged identity ids', async () => {
    const {persona: fromPersona } = await service.createPersona({
      client: TEST_CLIENT,
      name: 'Dave Source',
    });
    const {identifier: fromIdentifier} = await service.createIdentifier({
      client: TEST_CLIENT,
      ifi: TEST_IFI,
      persona: fromPersona.id,
    });

    const {persona: toPersona} = await service.createPersona({
      client: TEST_CLIENT,
      name: 'Dave Target',
    });
    await service.createIdentifier({
      client: TEST_CLIENT,
      ifi: TEST_IFI,
      persona: toPersona.id,
    });

    await supertest(app)
      .post('/mergePersona')
      .set('Content-Type', 'application/json')
      .send({
        fromPersonaId: fromPersona.id,
        toPersonaId: toPersona.id,
      })
      .expect(OK_200_HTTP_CODE, [fromIdentifier.id]);
  });
});
