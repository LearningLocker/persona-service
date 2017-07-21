/* tslint:disable:no-magic-numbers */
import { Response } from 'express';
import ClientModel from '../../models/ClientModel';
import Config from '../Config';

interface Options {
  agent: any;
  client: ClientModel;
  config: Config;
  profileId: string;
  res: Response;
}

export default async ({ agent, client, config, profileId, res }: Options) => {
  const getProfileResult = await config.service.getProfile({ agent, client, profileId });
  res.status(200);
  res.setHeader('ETag', `"${getProfileResult.etag}"`);
  res.setHeader('Last-Modified', getProfileResult.updatedAt.toISOString());
  res.setHeader('X-Experience-API-Version', '1.0.0');
  res.setHeader('Content-Type', getProfileResult.contentType);
  getProfileResult.content.pipe(res);
  return;
};
