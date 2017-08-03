import * as assert from 'assert';
import * as express from 'express';
import * as supertest from 'supertest';
import serviceFactory from '../../../serviceFactory';
import { TEST_CLIENT } from '../../../tests/utils/values';
import { BAD_REQUEST_400_HTTP_CODE } from '../../utils/httpCodes';
import createExpressPresenterFacade from '../utils/createExpressPresenterFacade';

const app = express();
const service = serviceFactory();
const expressPresenter = createExpressPresenterFacade(service);
app.use(expressPresenter);

describe('/mergePersona errors', () => {
  it('should display MissingMergeFromPersona error if no fromPersonaId set', async () => {
    const { persona: toPersona } = await service.createPersona({
      client: TEST_CLIENT,
      name: 'Dave2',
    });
    await supertest(app)
      .post('/mergePersona')
      .set('Content-Type', 'application/json')
      .send({
        toPersonaId: toPersona.id,
      })
      .expect(
        BAD_REQUEST_400_HTTP_CODE,
      )
      .expect((res: supertest.Response) => {
        assert.equal(res.body.message, 'Could not find the source persona (undefined)');
        assert.equal(!!res.body.errorId, true);
      });
  });
  it('should display MissingMergeFromPersona error if missing id', async () => {
    const { persona: toPersona } = await service.createPersona({
      client: TEST_CLIENT,
      name: 'Dave2',
    });
    await supertest(app)
      .post('/mergePersona')
      .set('Content-Type', 'application/json')
      .send({
        fromPersonaId: '123456789a123456789abcdf',
        toPersonaId: toPersona.id,
      })
      .expect(
        BAD_REQUEST_400_HTTP_CODE,
      )
      .expect((res: supertest.Response) => {
        assert.equal(
          res.body.message,
          'Could not find the source persona (123456789a123456789abcdf)',
        );
        assert.equal(!!res.body.errorId, true);
      });
  });
  it('should display MissingMergeToPersona error if no fromPersonaId set', async () => {
    const { persona: fromPersona } = await service.createPersona({
      client: TEST_CLIENT,
      name: 'Dave2',
    });
    await supertest(app)
      .post('/mergePersona')
      .set('Content-Type', 'application/json')
      .send({
        fromPersonaId: fromPersona.id,
      })
      .expect(
        BAD_REQUEST_400_HTTP_CODE,
      )
      .expect((res: supertest.Response) => {
        assert.equal(res.body.message, 'Could not find the target persona (undefined)');
        assert.equal(!!res.body.errorId, true);
      });
  });
  it('should display MissingMergeFromPersona error if missing id', async () => {
    const { persona: fromPersona } = await service.createPersona({
      client: TEST_CLIENT,
      name: 'Dave3',
    });
    await supertest(app)
      .post('/mergePersona')
      .set('Content-Type', 'application/json')
      .send({
        fromPersonaId: fromPersona.id,
        toPersonaId: '123456789a123456789abcdf',
      })
      .expect(
        BAD_REQUEST_400_HTTP_CODE,
      )
      .expect((res: supertest.Response) => {
        assert.equal(
          res.body.message,
          'Could not find the target persona (123456789a123456789abcdf)',
        );
        assert.equal(!!res.body.errorId, true);
      });
  });
});
