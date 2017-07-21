/* tslint:disable:no-magic-numbers */
import { Request, Response } from 'express';
import Config from './Config';
import catchErrors from './utils/catchErrors';
import getAgent from './utils/getAgent';
import getClient from './utils/getClient';
import getProfileFromService from './utils/getProfileFromService';
import getProfilesFromService from './utils/getProfilesFromService';

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
    const client = await getClient(config, req.header('Authorization'));
    const agent = getAgent(req.query.agent);

    if (req.query.profileId === undefined) {
      await getProfilesFromService({ config, res, agent, client });
      return;
    } else {
      const profileId = req.query.profileId;
      await getProfileFromService({ config, res, agent, client, profileId });
      return;
    }
  });
};
