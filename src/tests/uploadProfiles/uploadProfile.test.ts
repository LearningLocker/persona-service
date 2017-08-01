import * as assert from 'assert';
import * as streamToString from 'stream-to-string';
import overwriteProfile from '../overwriteProfile/utils/overwriteProfile';
import setup from '../utils/setup';
import {
  TEST_CLIENT,
  TEST_CONTENT,
  TEST_MBOX_AGENT,
} from '../utils/values';

describe('upload profile', () => {
  const service = setup();

  it('should create an identifier for the agents if identifier does not exsit', async () => {
    const result = await service.uploadProfiles({
      agents: [
        TEST_MBOX_AGENT,
      ],
      client: TEST_CLIENT,
      profiles: {
        'eye colour': 'green',
      },
    });

    assert.equal(result.identifierIds.length, 1);

    const {identifier: identifierResult} = await service.getIdentifier({
      client: TEST_CLIENT,
      id: result.identifierIds[0],
    });
    if (identifierResult.persona === undefined) {
      throw new Error('Expected persona to be defined in identifierResult.');
    }
    const {persona} = await service.getPersona({
      client: TEST_CLIENT,
      personaId: identifierResult.persona,
    });

    assert.deepEqual(identifierResult.ifi, {
      key: 'mbox',
      value: TEST_MBOX_AGENT.mbox,
    });

    assert.equal(persona.id, identifierResult.persona);

    const {
      content: profileContent,
      contentType: profileContentType,
    } = await service.getProfile({
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      profileId: 'eye colour',
    });

    const profileData = await streamToString(profileContent);

    assert.equal(profileData, '"green"');
    assert.equal(profileContentType, 'application/json');
  });

  it('should delete any existing profiles before adding new ones', async () => {
    await overwriteProfile(TEST_MBOX_AGENT, TEST_CONTENT);

    await service.uploadProfiles({
      agents: [
        TEST_MBOX_AGENT,
      ],
      client: TEST_CLIENT,
      profiles: {
        'eye colour': 'green',
      },
    });

    const profiles = await service.getProfiles({
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
    });

    assert.equal(profiles.profileIds.length, 1);

    const profile = await service.getProfile({
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      profileId: profiles.profileIds[0],
    });
    const stringContent = await streamToString(profile.content);

    assert.equal(stringContent, '"green"');
  });

  // It('should create new persona if no persona is found', () => {

  // });

  // It(
  //   'should add identies to existing persona if 1 persona ' +
  //   'is found and singlePersona flag is set'
  // , () => {
  //   Console.log('001');
  // });

  // It('should error if more than 1 persona exists and singelPersona flag is set', () => {

  // });
});
