import NoModel from 'jscommons/dist/errors/NoModel';
import { ObjectID } from 'mongodb';
import DeletePersonaOptions from '../repoFactory/options/DeletePersonaOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: DeletePersonaOptions): Promise<void> => {

    const collection = (await config.db).collection('personas');

    const result = await collection.remove({
      _id: new ObjectID(opts.personaId),
    });

    if (!result.result) {
      throw new NoModel('Persona');
    }
  };
};
