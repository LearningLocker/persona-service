import * as assert from 'assert';
import * as express from 'express';
import * as supertest from 'supertest';
import serviceFactory from '../../../serviceFactory';
import { TEST_CLIENT_OUTSIDE_ORG } from '../../../tests/utils/values';
import { NOT_FOUND_404_HTTP_CODE } from '../../utils/httpCodes';
import createExpressPresenterFacade from '../utils/createExpressPresenterFacade';

const app = express();
const service = serviceFactory();
const expressPresenter = createExpressPresenterFacade(service);
app.use(expressPresenter);

describe('/persona get error', () => {
  it('should return 404 invalid route if no id provided', async () => {
    await supertest(app)
      .get('/persona')
      .expect(NOT_FOUND_404_HTTP_CODE)
      .expect((res: supertest.Response) => {
        assert.equal(!!res.body.errorId, true);
        assert.equal(res.body.message, 'Route not found');
      });
  });
  it('should return 404 invalid route if persona is outside the org', async () => {
    const { persona } = await service.createPersona({
      client: TEST_CLIENT_OUTSIDE_ORG,
      name: 'Dave 95',
    });

    await supertest(app)
      .get(`/persona/${persona.id}`)
      .expect(NOT_FOUND_404_HTTP_CODE)
      .expect((res: supertest.Response) => {
        assert.equal(!!res.body.errorId, true);
        assert.equal(res.body.message, `Could not find the Persona (${persona.id})`);
      });
  });
  it('should return 404 if the persona does not exist', async () => {
    await supertest(app)
      .get(`/persona/123456789a123456789abcdf`)
      .expect(NOT_FOUND_404_HTTP_CODE)
      .expect((res: supertest.Response) => {
        assert.equal(!!res.body.errorId, true);
        assert.equal(res.body.message, 'Could not find the Persona (123456789a123456789abcdf)');
      });
  });
});
