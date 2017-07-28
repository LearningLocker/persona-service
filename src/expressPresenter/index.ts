import { Router } from 'express';
import commonExpressPresenter from 'jscommons/dist/expressPresenter';
import Config from './Config';
import deleteProfile from './deleteProfile';
import getDemoAuth from './getDemoAuth';
import getFullAgent from './getFullAgent';
import getProfiles from './getProfiles';
import mergePersona from './mergePersona';
import postProfile from './postProfile';
import putProfile from './putProfile';

export default (config: Config): Router => {
  const router = commonExpressPresenter(config);
  router.get('/auth', getDemoAuth(config));
  router.delete('/xAPI/agents/profile', deleteProfile(config));
  router.get('/xAPI/agents/profile', getProfiles(config));
  router.put('/xAPI/agents/profile', putProfile(config));
  router.post('/xAPI/agents/profile', postProfile(config));
  router.get('/xAPI/agents', getFullAgent(config));
  router.post('/mergePersona', mergePersona(config));
  return router;
};
