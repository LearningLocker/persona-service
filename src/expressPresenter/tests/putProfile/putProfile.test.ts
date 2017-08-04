import * as express from 'express';
import * as supertest from 'supertest';
import serviceFactory from '../../../serviceFactory';
import {
  JSON_CONTENT_TYPE,
  TEST_MBOX_AGENT,
  TEST_OBJECT_CONTENT,
  TEST_PROFILE_ID,
} from '../../../tests/utils/values';
import {
  NO_CONTENT_204_HTTP_CODE,
} from '../../utils/httpCodes';
import createExpressPresenterFacade from '../utils/createExpressPresenterFacade';

const app = express();
const service = serviceFactory();
const expressPresenter = createExpressPresenterFacade(service);
app.use(expressPresenter);

describe('PUT /xAPI/agents/profile to put', () => {
  it('should respond with 204 when profile is created', async () => {
    await supertest(app)
      .put(`/xAPI/agents/profile`)
      .query({
        agent: JSON.stringify(TEST_MBOX_AGENT),
        profileId: TEST_PROFILE_ID,
      })
      .set('Content-Type', JSON_CONTENT_TYPE)
      .send(TEST_OBJECT_CONTENT)
      .expect(NO_CONTENT_204_HTTP_CODE);
  });
});
