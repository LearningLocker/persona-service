import Profile from '../../models/Profile';

export default (profile: Profile, personaIdentifier: string, profileId: string) => {
  return (
    profile.personaIdentifier === personaIdentifier &&
    profile.profileId === profileId
  );
};
