import * as express from 'express';
import * as stringToStream from 'string-to-stream';
import * as supertest from 'supertest';
import serviceFactory from '../../../serviceFactory';
import {
  JSON_CONTENT_TYPE,
  TEST_CLIENT,
  TEST_CONTENT,
  TEST_INVALID_AGENT,
  TEST_MBOX_AGENT,
  TEST_OBJECT_CONTENT,
  TEST_PROFILE_ID,
  TEXT_CONTENT_TYPE,
} from '../../../tests/utils/values';
import {
  BAD_REQUEST_400_HTTP_CODE,
  NO_CONTENT_204_HTTP_CODE,
  NOT_FOUND_404_HTTP_CODE,
} from '../../utils/httpCodes';
import createExpressPresenterFacade from '../utils/createExpressPresenterFacade';

const app = express();
const service = serviceFactory();
const expressPresenter = createExpressPresenterFacade(service);
app.use(expressPresenter);

describe('POST /xAPI/agents/profile to patch', () => {
  it('should respond with 204 when profile is created', async () => {
    await supertest(app)
      .post(`/xAPI/agents/profile`)
      .query({
        agent: JSON.stringify(TEST_MBOX_AGENT),
        profileId: TEST_PROFILE_ID,
      })
      .set('Content-Type', JSON_CONTENT_TYPE)
      .send(TEST_OBJECT_CONTENT)
      .expect(NO_CONTENT_204_HTTP_CODE);
  });

  it('should respond with 204 when profile is patched', async () => {
    await service.overwriteProfile({
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      content: stringToStream(TEST_OBJECT_CONTENT),
      contentType: JSON_CONTENT_TYPE,
      profileId: TEST_PROFILE_ID,
    });
    await supertest(app)
      .post(`/xAPI/agents/profile`)
      .query({
        agent: JSON.stringify(TEST_MBOX_AGENT),
        profileId: TEST_PROFILE_ID,
      })
      .set('Content-Type', JSON_CONTENT_TYPE)
      .send(TEST_OBJECT_CONTENT)
      .expect(NO_CONTENT_204_HTTP_CODE);
  });
});
