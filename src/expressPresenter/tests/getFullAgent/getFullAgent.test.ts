import * as express from 'express';
import setupService from 'jscommons/dist/tests/utils/setupService';
import * as stringToStream from 'string-to-stream';
import * as supertest from 'supertest';
import serviceFactory from '../../../serviceFactory';
import {
  TEST_CLIENT,
  TEST_CONTENT,
  TEST_INVALID_AGENT,
  TEST_MBOX_AGENT,
  TEST_PROFILE_ID,
  TEXT_CONTENT_TYPE,
} from '../../../tests/utils/values';
import {
  BAD_REQUEST_400_HTTP_CODE,
  OK_200_HTTP_CODE,
} from '../../utils/httpCodes';
import createExpressPresenterFacade from '../utils/createExpressPresenterFacade';

describe('GET /xAPI/agents', () => {
  const app = express();
  const service = serviceFactory();
  setupService(service)();
  const expressPresenter = createExpressPresenterFacade(service);
  app.use(expressPresenter);

  it('should respond with 200 when full agent not found', async () => {
    await supertest(app)
      .get(`/xAPI/agents`)
      .query({
        agent: JSON.stringify(TEST_MBOX_AGENT),
      })
      .expect(OK_200_HTTP_CODE);
  });

  it('should respond with 200 when full agent exists', async () => {
    await service.overwriteProfile({
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      content: stringToStream(TEST_CONTENT),
      contentType: TEXT_CONTENT_TYPE,
      profileId: TEST_PROFILE_ID,
    });
    await supertest(app)
      .get(`/xAPI/agents`)
      .query({
        agent: JSON.stringify(TEST_MBOX_AGENT),
      })
      .expect(OK_200_HTTP_CODE);
  });

  it('should respond with 400 when agent is not valid', async () => {
    await supertest(app)
      .get(`/xAPI/agents`)
      .query({
        agent: JSON.stringify(TEST_INVALID_AGENT),
      })
      .expect(BAD_REQUEST_400_HTTP_CODE);
  });

  it('should throw warning warning if agent is not set', async () => {
    await supertest(app)
      .get('/xAPI/agents')
      .set('Authorization', '12345')
      .query({

      })
      .expect(BAD_REQUEST_400_HTTP_CODE);
  });
});
