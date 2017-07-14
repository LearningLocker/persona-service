import { v4 as uuid } from 'uuid';
import Persona from '../models/Persona';
import CreatePersonaOptions from '../repoFactory/options/CreatePersonaOptions';
import CreatePersonaResult from '../repoFactory/results/CreatePersonaResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: CreatePersonaOptions): Promise<CreatePersonaResult> => {
    const persona: Persona = {
      id: uuid(),
      name: opts.name,
      organisation: '',
    };
    config.state.personas = [
      ...config.state.personas,
      persona,
    ];
    return { persona };
  };
};
