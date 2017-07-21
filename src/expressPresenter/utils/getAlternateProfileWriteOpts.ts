import { Request } from 'express';
import * as stringToStream from 'string-to-stream';
import Config from '../Config';
import getAgent from './getAgent';
import getClient from './getClient';
import getContentType from './getContentType';
import getEtag from './getEtag';
import getProfileId from './getProfileId';

export default async (config: Config, req: Request) => {
  const client = await getClient(config, req.body.Authorization);
  const ifMatch = getEtag(req.body['If-Match']);
  const ifNoneMatch = getEtag(req.body['If-None-Match']);
  const profileId = getProfileId(req.body.profileId);
  const agent = getAgent(req.body.agent);
  const contentType = getContentType(req.body['Content-Type']);
  const content = stringToStream(req.body.content);

  return { agent, client, content, contentType, ifMatch, ifNoneMatch, profileId };
};
