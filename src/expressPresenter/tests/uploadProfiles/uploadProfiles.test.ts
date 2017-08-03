import * as assert from 'assert';
import * as express from 'express';
import setupService from 'jscommons/dist/tests/utils/setupService';
import * as supertest from 'supertest';
import serviceFactory from '../../../serviceFactory';
import {
  TEST_CONTENT,
  TEST_MBOX_AGENT,
  TEST_OPENID_AGENT,
  TEST_PROFILE_ID,
} from '../../../tests/utils/values';
import { OK_200_HTTP_CODE } from '../../utils/httpCodes';
import createExpressPresenterFacade from '../utils/createExpressPresenterFacade';

describe('/uploadProfiles', () => {
  const app = express();

  const service = serviceFactory();
  const expressPresenter = createExpressPresenterFacade(service);

  app.use(expressPresenter);

  setupService(service)();

  it('should upload a profile', async () => {
    await supertest(app)
      .post('/uploadProfiles')
      .set('Content-Type', 'application/json')
      .send({
        primaryAgent: TEST_MBOX_AGENT,
        profiles: {
          [TEST_PROFILE_ID]: TEST_CONTENT,
        },
        secondaryAgents: [TEST_OPENID_AGENT],
      })
      .expect(OK_200_HTTP_CODE)
      .expect((res: supertest.Response) => {
        const identifierLength = 2;
        assert.equal(res.body.length, identifierLength);
      });
  });
});
