import { Request } from 'express';
import * as stringToStream from 'string-to-stream';
import Config from '../Config';
import getAgent from './getAgent';
import getClient from './getClient';
import getContentType from './getContentType';
import getEtag from './getEtag';
import getProfileId from './getProfileId';

const getContent = (req: Request, contentType: string) => {
  if (req.body === undefined) {
    return req;
  }
  if (contentType === 'application/json') {
    return stringToStream(JSON.stringify(req.body));
  }
  return stringToStream(req.body);
};

export default async (config: Config, req: Request) => {
  const client = await getClient(config, req.header('Authorization'));
  const ifMatch = getEtag(req.header('If-Match'));
  const ifNoneMatch = getEtag(req.header('If-None-Match'));
  const profileId = getProfileId(req.query.profileId);
  const agent = getAgent(req.query.agent);
  const contentType = getContentType(req.header('Content-Type'));
  const content = getContent(req, contentType);

  return { agent, client, content, contentType, ifMatch, ifNoneMatch, profileId };
};
