import { Request, Response } from 'express';
import Config from './Config';
import catchErrors from './utils/catchErrors';
import getClient from './utils/getClient';
import { OK_200_HTTP_CODE } from './utils/httpCodes';

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
    const client = await getClient(config, req.header('Authorization'));
    const fromPersonaId = req.body.fromPersonaId as string;
    const toPersonaId = req.body.toPersonaId as string;

    const { identifierIds } = await config.service.mergePersona({
      client,
      fromPersonaId,
      toPersonaId,
    });

    res.status(OK_200_HTTP_CODE).json(identifierIds);
  });
};
