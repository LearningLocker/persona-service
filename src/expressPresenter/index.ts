import { Router } from 'express';
import commonExpressPresenter from 'jscommons/dist/expressPresenter';
import Config from './Config';
import getDemoAuth from './getDemoAuth';

export default (config: Config): Router => {
  const router = commonExpressPresenter(config);
  router.get('/auth', getDemoAuth(config));
  return router;
};
