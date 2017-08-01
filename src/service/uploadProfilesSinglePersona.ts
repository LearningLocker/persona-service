import UploadProfilesOptions from '../serviceFactory/options/UploadProfilesOptions';
import UploadProfilesResult from '../serviceFactory/results/UploadProfilesResult';

export default (config: Config) => async({
  client,
  agents,
  profiles,
}: UploadProfileOptions): Promise<UploadProfileResult> => {

  const ifis = agents.map(getIfisFromAgent);

  // Is there 1 or 0 personas, or more than 1 persona.

  const matchingIdentifiers = getIdentifiersMatchingIfi({
    client,
    config,
    ifi,
  });

};
