import { defaultTo } from 'lodash';
import { ObjectId } from 'mongodb';
import NoModelWithId from '../../errors/NoModelWithId';
import type Persona from '../../models/Persona';
import type GetPersonaOptions from '../../repoFactory/options/GetPersonaOptions';
import type Config from '../Config';
import { PERSONAS_COLLECTION } from '../utils/constants/collections';

export interface Options {
  readonly organisation: string;
  readonly personaId: string;
}

export default (config: Config) => {
  return async ({ personaId, organisation }: GetPersonaOptions): Promise<Persona> => {
    const collection = (await config.db).collection(PERSONAS_COLLECTION);

    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOne
    const document = await collection.findOne({
      _id: new ObjectId(personaId),
      organisation: new ObjectId(organisation),
    });

    if (document === null || document === undefined) {
      /* istanbul ignore next */
      throw new NoModelWithId('Persona', personaId);
    }

    return {
      id: personaId,
      name: defaultTo<string | undefined>(document.name, undefined),
      organisation,
    };
  };
};
