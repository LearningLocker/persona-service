// import Persona from '../models/Persona';
import { findIndex } from 'lodash';
import NoModelWithId from '../errors/NoModelWithId';
import UpdatePersonaOptions from // tslint:disable-line:import-spacing
  '../repoFactory/options/UpdatePersonaOptions';
import UpdatePersonaResult from // tslint:disable-line:import-spacing
  '../repoFactory/results/UpdatePersonaResult';
// tslint:disable-next-line:no-unused
import _UpdatePersonaOptions from // tslint:disable-line:import-spacing
  '../serviceFactory/options/UpdatePersonaOptions';
// tslint:disable-next-line:no-unused
import _UpdatePersonaResult from // tslint:disable-line:import-spacing
  '../serviceFactory/results/UpdatePersonaResult';
import Config from './Config';

export default (config: Config) => {
  return async ({
    organisation,
    personaId,
    name,
  }: UpdatePersonaOptions): Promise<UpdatePersonaResult> => {

    const personaIndex = findIndex(config.state.personas, {
      id: personaId,
      organisation,
    });

    if (personaIndex < 0) {
      throw new NoModelWithId('persona', personaId);
    }

    const newPersona = {
      ...config.state.personas[personaIndex],
      name,
    };

    const newPersonas = [
      ...config.state.personas.slice(
        0,
        personaIndex,
      ),
      newPersona,
      ...config.state.personas.slice(personaIndex + 1),
    ];

    config.state.personas = newPersonas;

    return {
      persona: newPersona,
    };
  };
};
