/* tslint:disable:no-magic-numbers */
import { Request, Response } from 'express';
import Config from './Config';
import alternateProfileRequest from './utils/alternateProfileRequest';
import catchErrors from './utils/catchErrors';
import getProfileWriteOpts from './utils/getProfileWriteOpts';

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
    const method = req.query.method;

    if (method !== undefined) {
      return alternateProfileRequest({ config, method, req, res });
    }

    const opts = await getProfileWriteOpts(config, req);
    await config.service.patchProfile(opts);
    res.status(204);
    res.setHeader('X-Experience-API-Version', '1.0.0');
    res.send();
  });
};
