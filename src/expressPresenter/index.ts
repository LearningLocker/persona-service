import { Request, Response, Router } from 'express';
import commonExpressPresenter from 'jscommons/dist/expressPresenter';
import sendMessage from 'jscommons/dist/expressPresenter/utils/sendMessage';
import { v4 as uuid } from 'uuid';
import Config from './Config';
import deleteProfile from './deleteProfile';
import getDemoAuth from './getDemoAuth';
import getFullAgent from './getFullAgent';
import getPersona from './getPersona';
import getProfiles from './getProfiles';
import mergePersona from './mergePersona';
import postProfile from './postProfile';
import putProfile from './putProfile';
import uploadProfiles from './uploadProfiles';
import { NOT_FOUND_404_HTTP_CODE } from './utils/httpCodes';

export default (config: Config): Router => {
  const router = commonExpressPresenter(config);

  router.get('/auth', getDemoAuth(config));
  router.delete('/xAPI/agents/profile', deleteProfile(config));
  router.get('/xAPI/agents/profile', getProfiles(config));
  router.put('/xAPI/agents/profile', putProfile(config));
  router.post('/xAPI/agents/profile', postProfile(config));
  router.get('/xAPI/agents', getFullAgent(config));
  router.post('/mergePersona', mergePersona(config));
  router.get('/persona/:id', getPersona(config));
  router.post('/uploadProfiles', uploadProfiles(config));

  router.use((_req: Request, res: Response) => {
    const errorId = uuid();
    config.logger.error(errorId, 'Not found');

    const code = NOT_FOUND_404_HTTP_CODE;
    const message = config.translator.routeNotFound();

    return sendMessage({ res, code, errorId, message });
  });
  return router;
};
