/* tslint:disable:no-magic-numbers */
import { Request, Response } from 'express';
import Config from './Config';
import catchErrors from './utils/catchErrors';
import getAgent from './utils/getAgent';
import getClient from './utils/getClient';

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
    const client = await getClient(config, req.header('Authorization'));
    const agent = getAgent(req.query.agent);
    const result = await config.service.getFullAgent({ client, agent });
    res.status(200);
    res.setHeader('X-Experience-API-Version', '1.0.0');
    res.json(result);
  });
};
