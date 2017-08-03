import { Request, Response } from 'express';
import UploadProfilesOptions from '../serviceFactory/options/UploadProfilesOptions';
import Config from './Config';
import catchErrors from './utils/catchErrors';
import getClient from './utils/getClient';
import { OK_200_HTTP_CODE } from './utils/httpCodes';

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
    const client = await getClient(config, req.header('Authorization'));

    const data = {
      ...req.body,
      client,
    } as UploadProfilesOptions;

    const {identifierIds} = await config.service.uploadProfiles(data);

    res.status(OK_200_HTTP_CODE).json(identifierIds);
  });
};
