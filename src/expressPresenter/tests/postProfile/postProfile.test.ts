import * as express from 'express';
import setupService from 'jscommons/dist/tests/utils/setupService';
import * as stringToStream from 'string-to-stream';
import * as supertest from 'supertest';
import serviceFactory from '../../../serviceFactory';
import {
  JSON_CONTENT_TYPE,
  TEST_CLIENT,
  TEST_CONTENT,
  TEST_MBOX_AGENT,
  TEST_OBJECT_CONTENT,
  TEST_PROFILE_ID,
  TEXT_CONTENT_TYPE,
} from '../../../tests/utils/values';
import {
  BAD_REQUEST_400_HTTP_CODE,
  NO_CONTENT_204_HTTP_CODE,
  OK_200_HTTP_CODE,
} from '../../utils/httpCodes';
import createExpressPresenterFacade from '../utils/createExpressPresenterFacade';

describe('POST /xAPI/agents/profile to post', () => {

  const app = express();
  const service = serviceFactory();
  setupService(service)();
  const expressPresenter = createExpressPresenterFacade(service);
  app.use(expressPresenter);

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

  it('should error 204 when profile is created with no body', async () => {
    await supertest(app)
      .post(`/xAPI/agents/profile`)
      .query({
        agent: JSON.stringify(TEST_MBOX_AGENT),
        profileId: TEST_PROFILE_ID,
      })
      .set('Content-Type', JSON_CONTENT_TYPE)
      .send()
      .expect(NO_CONTENT_204_HTTP_CODE);
  });

  it('should error 400 if content type not json', async () => {
    await supertest(app)
      .post(`/xAPI/agents/profile`)
      .query({
        agent: JSON.stringify(TEST_MBOX_AGENT),
        profileId: TEST_PROFILE_ID,
      })
      .set('Content-Type', 'plain/text')
      .send('plain content')
      .expect(BAD_REQUEST_400_HTTP_CODE);
  });

  it('should respond with 204 when called with method = PUT', async () => {
    await supertest(app)
      .post('/xAPI/agents/profile')
      .query({
        method: 'PUT',
      })
      .set('Content-Type', JSON_CONTENT_TYPE)
      .send({
        'Content-Type': JSON_CONTENT_TYPE,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        content: TEST_OBJECT_CONTENT,
        profileId: TEST_PROFILE_ID,
      })
      .expect(NO_CONTENT_204_HTTP_CODE);
  });

  it('should respond with 204 when called with method = POST', async () => {
    await supertest(app)
      .post('/xAPI/agents/profile')
      .query({
        method: 'POST',
      })
      .set('Content-Type', JSON_CONTENT_TYPE)
      .send({
        'Content-Type': JSON_CONTENT_TYPE,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        content: TEST_OBJECT_CONTENT,
        profileId: TEST_PROFILE_ID,
      })
      .expect(NO_CONTENT_204_HTTP_CODE);
  });

  it('should respond with 200 when called with method = GET', async () => {
    await service.overwriteProfile({
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      content: stringToStream(TEST_CONTENT),
      contentType: TEXT_CONTENT_TYPE,
      profileId: TEST_PROFILE_ID,
    });

    // Const result =
    await supertest(app)
      .post('/xAPI/agents/profile')
      .query({
        method: 'GET',
      })
      .set('Content-Type', JSON_CONTENT_TYPE)
      .send({
        'Content-Type': JSON_CONTENT_TYPE,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        profileId: TEST_PROFILE_ID,
      })
      .expect(OK_200_HTTP_CODE);
  });
  it('should respond with 200 when called with method = GET and profileId is not set', async () => {

    await service.overwriteProfile({
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      content: stringToStream(TEST_CONTENT),
      contentType: TEXT_CONTENT_TYPE,
      profileId: TEST_PROFILE_ID,
    });

    await supertest(app)
      .post('/xAPI/agents/profile')
      .query({
        method: 'GET',
      })
      .set('Content-Type', JSON_CONTENT_TYPE)
      .send({
        'Content-Type': JSON_CONTENT_TYPE,
        agent: JSON.stringify(TEST_MBOX_AGENT),
      })
      .expect(OK_200_HTTP_CODE);
  });
  it('should responde with 204 when called with method = DELETE', async() => {
    await service.overwriteProfile({
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      content: stringToStream(TEST_CONTENT),
      contentType: TEXT_CONTENT_TYPE,
      profileId: TEST_PROFILE_ID,
    });

    const { etag } = await service.getProfile({
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      profileId: TEST_PROFILE_ID,
    });

    await supertest(app)
      .post('/xAPI/agents/profile')
      .query({
        method: 'DELETE',
      })
      .set('Content-Type', JSON_CONTENT_TYPE)
      .send({
        'Content-Type': JSON_CONTENT_TYPE,
        'If-Match': etag,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        profileId: TEST_PROFILE_ID,
      })
      .expect(NO_CONTENT_204_HTTP_CODE);
  });
  it('should error if method = INVALID', async () => {
    await supertest(app)
      .post('/xAPI/agents/profile')
      .query({
        method: 'INVALID',
      })
      .expect(BAD_REQUEST_400_HTTP_CODE);
  });
  it('should error if content-type is not set', async () => {
    await supertest(app)
      .post('/xAPI/agents/profile')
      .query({
        method: 'POST',
      })
      .set('Content-Type', JSON_CONTENT_TYPE)
      .send({
        'If-Match': TEST_CONTENT,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        content: TEST_OBJECT_CONTENT,
        profileId: TEST_PROFILE_ID,
      })
      .expect(BAD_REQUEST_400_HTTP_CODE);
  });

  it('should error if profileId is not set', async () => {
    await supertest(app)
      .post('/xAPI/agents/profile')
      .query({
        method: 'POST',
      })
      .set('Content-Type', JSON_CONTENT_TYPE)
      .send({
        'If-Match': TEST_CONTENT,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        content: TEST_OBJECT_CONTENT,
      })
      .expect(BAD_REQUEST_400_HTTP_CODE);
  });
}); // tslint:disable-line max-file-line-count
