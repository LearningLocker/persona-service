import OverwritePersonaAttributeOptions from // tslint:disable-line:import-spacing
  '../repoFactory/options/OverwritePersonaAttributeOptions';
import OverwritePersonaAttributeResult from // tslint:disable-line:import-spacing
  '../repoFactory/results/OverwritePersonaAttributeResult';
// tslint:disable-next-line:no-unused
import _OverwritePersonaAttributeOptions from // tslint:disable-line:import-spacing
  '../serviceFactory/options/OverwritePersonaAttributeOptions';
// tslint:disable-next-line:no-unused
import _OverwritePersonaAttributeResult from // tslint:disable-line:import-spacing
  '../serviceFactory/results/OverwritePersonaAttributeResult';
import Config from './Config';

export default (config: Config) => {
  return async ({
    organisation,
    personaId,
    key,
    value,
  }: OverwritePersonaAttributeOptions): Promise<OverwritePersonaAttributeResult> => {
    const collection = (await config.db).collection('personaAttributes');

    const result = await collection.findOneAndUpdate({
      key,
      organisation,
      personaId,
    }, {
      key,
      organisation,
      personaId,
      value,
    }, {
      returnOriginal: false,
      upsert: true,
    });

    const attribute = {
      ...result.value,
      _id: result.value._id.toString(),
    };

    return {
      attribute,
    };
  };
};
