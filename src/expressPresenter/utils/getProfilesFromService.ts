/* tslint:disable:no-magic-numbers */
import { Response } from 'express';
import ClientModel from '../../models/ClientModel';
import Config from '../Config';

interface Options {
  readonly agent: any;
  readonly client: ClientModel;
  readonly config: Config;
  readonly res: Response;
}

export default async ({ agent, client, config, res }: Options) => {
  const getProfilesResult = await config.service.getProfiles({ agent, client });
  res.status(200);
  res.setHeader('X-Experience-API-Version', '1.0.0');
  res.json(getProfilesResult.profileIds);
  return;
};
