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
    console.log('001', fromPersonaId);
    console.log('002', req.body);
    console.log('003', req.params);
    console.log('004', req.query);
    console.log('005', req.headers);
    // Console.log('006', req);

    const { identifierIds } = await config.service.mergePersona({
      client,
      fromPersonaId,
      toPersonaId,
    });

    res.status(OK_200_HTTP_CODE).json(identifierIds);
  });
};
