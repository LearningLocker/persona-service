import * as express from 'express';
import * as supertest from 'supertest';
import serviceFactory from '../../../serviceFactory';
import { TEST_CLIENT } from '../../../tests/utils/values';
import { OK_200_HTTP_CODE } from '../../utils/httpCodes';
import createExpressPresenterFacade from '../utils/createExpressPresenterFacade';

const app = express();
const service = serviceFactory();
const expressPresenter = createExpressPresenterFacade(service);
app.use(expressPresenter);

describe('/persona', () => {
  it('should get the persona', async () => {
    const { persona } = await service.createPersona({
      client: TEST_CLIENT,
      name: 'Dave 1',
    });

    await supertest(app)
      .get(`/persona/${persona.id}`)
      .expect(OK_200_HTTP_CODE, {
        id: persona.id,
        name: 'Dave 1',
        organisation: TEST_CLIENT.organisation,
      });
  });
});
