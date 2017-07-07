/* tslint:disable:no-magic-numbers */
import { Request, Response } from 'express';
import ClientModel from '../models/ClientModel';
import { ALL } from '../utils/scopes';
import Config from './Config';
import catchErrors from './utils/catchErrors';

export default (config: Config) => {
  return catchErrors(config, async (_req: Request, res: Response): Promise<void> => {
    const client: ClientModel = {
      _id: 'dummy_id',
      authority: {
        mbox: 'mailto:dummy@example.com',
        objectType: 'Agent',
      },
      isTrusted: true,
      lrs_id: 'dummy_lrs_id',
      organisation: 'dummy_organisation',
      scopes: [ALL],
      title: 'dummy_title',
    };
    res.status(200).json(client);
  });
};
