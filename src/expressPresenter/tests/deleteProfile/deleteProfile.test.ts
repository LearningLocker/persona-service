import * as express from 'express';
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
  NO_CONTENT_204_HTTP_CODE,
  NOT_FOUND_404_HTTP_CODE,
} from '../../utils/httpCodes';
import createExpressPresenterFacade from '../utils/createExpressPresenterFacade';

const app = express();
const service = serviceFactory();
const expressPresenter = createExpressPresenterFacade(service);
app.use(expressPresenter);

describe('DELETE /xAPI/agents/profile', () => {
  it('should respond with 404 when profile not found', async () => {
    await supertest(app)
      .delete(`/xAPI/agents/profile`)
      .query({
        agent: JSON.stringify(TEST_MBOX_AGENT),
        profileId: 'missing_profile_id',
      })
      .expect(NOT_FOUND_404_HTTP_CODE);
  });

  it('should respond with 200 when profile exists', async () => {
    await service.overwriteProfile({
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      content: stringToStream(TEST_CONTENT),
      contentType: TEXT_CONTENT_TYPE,
      profileId: TEST_PROFILE_ID,
    });
    await supertest(app)
      .delete(`/xAPI/agents/profile`)
      .query({
        agent: JSON.stringify(TEST_MBOX_AGENT),
        profileId: TEST_PROFILE_ID,
      })
      .expect(NO_CONTENT_204_HTTP_CODE);
  });

  it('should respond with 400 when agent is invalid', async () => {
    await supertest(app)
      .delete(`/xAPI/agents/profile`)
      .query({
        agent: JSON.stringify(TEST_INVALID_AGENT),
        profileId: TEST_PROFILE_ID,
      })
      .expect(BAD_REQUEST_400_HTTP_CODE);
  });
});
