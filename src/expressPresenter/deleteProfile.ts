/* tslint:disable:no-magic-numbers */
import { Request, Response } from 'express';
import Config from './Config';
import catchErrors from './utils/catchErrors';
import getAgent from './utils/getAgent';
import getClient from './utils/getClient';
import getProfileId from './utils/getProfileId';

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
    const client = await getClient(config, req.header('Authorization'));
    const ifMatch = req.header('If-Match');
    const profileId = getProfileId(req.query.profileId);
    const agent = getAgent(req.query.agent);

    await config.service.deleteProfile({ agent, client, profileId, ifMatch });
    res.status(204).send();
  });
};
