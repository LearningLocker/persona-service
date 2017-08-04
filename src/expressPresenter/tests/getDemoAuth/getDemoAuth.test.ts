import * as express from 'express';
import * as supertest from 'supertest';
import serviceFactory from '../../../serviceFactory';
import { ALL } from '../../../utils/scopes';
import { OK_200_HTTP_CODE } from '../../utils/httpCodes';
import createExpressPresenterFacade from '../utils/createExpressPresenterFacade';

describe('/auth getDemoAuth', () => {
  const app = express();
  const service = serviceFactory();
  const expressPresenter = createExpressPresenterFacade(service);
  app.use(expressPresenter);
  it('should get the auth', async () => {
    await supertest(app)
      .get('/auth')
      .expect(OK_200_HTTP_CODE, {
      _id: 'dummy_id',
      authority: {
        mbox: 'mailto:dummy@example.com',
        objectType: 'Agent',
      },
      isTrusted: true,
      lrs_id: 'dummy_lrs_id',
      organisation: 'dummy_organisation',
      scopes: [ALL],
      title: 'dummy_title',
    });
  });
});
