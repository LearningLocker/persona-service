import * as assert from 'assert';
import * as streamToString from 'stream-to-string';
import Agent from '../../models/Agent';
import Ifi from '../../models/Ifi';
import setup from '../utils/setup';
import {
  JSON_CONTENT_TYPE,
  TEST_CLIENT,
  TEST_CONTENT,
  TEST_MBOX_AGENT,
  TEST_OPENID_AGENT,
  TEST_PROFILE_ID,
} from '../utils/values';

describe('upload profile', () => {
  const service = setup();

  const assertIdentifier = async (identifierId: string, expectedIfi: Ifi) => {
    const {identifier: identifierResult} = await service.getIdentifier({
      client: TEST_CLIENT,
      id: identifierId,
    });
    assert.deepEqual(identifierResult.ifi, expectedIfi);
    return identifierResult;
  };

  const assertPersona = async (personaId: string) => {
    const {persona} = await service.getPersona({
      client: TEST_CLIENT,
      personaId,
    });
    assert.equal(persona.id, personaId);
  };

  const assertProfile = async (agent: Agent) => {
    const {
      content: profileContent,
      contentType: profileContentType,
    } = await service.getProfile({
      agent,
      client: TEST_CLIENT,
      profileId: TEST_PROFILE_ID,
    });

    const profileData = await streamToString(profileContent);

    assert.equal(profileData, `"${TEST_CONTENT}"`);
    assert.equal(profileContentType, JSON_CONTENT_TYPE);
  };

  it('should correctly upload profiles without secondary agents', async () => {
    const result = await service.uploadProfiles({
      client: TEST_CLIENT,
      primaryAgent: TEST_MBOX_AGENT,
      profiles: {
        [TEST_PROFILE_ID]: TEST_CONTENT,
      },
      secondaryAgents: [],
    });
    assert.equal(result.identifierIds.length, 1);

    const identifierResult = await assertIdentifier(result.identifierIds[0], {
      key: 'mbox',
      value: TEST_MBOX_AGENT.mbox as string,
    });
    if (identifierResult.persona === undefined) {
      throw new Error('Expected persona to be defined in identifierResult.');
    }

    await assertPersona(identifierResult.persona);
    await assertProfile(TEST_MBOX_AGENT);
  });

  it('should correctly upload profiles with secondary agents', async () => {
    const result = await service.uploadProfiles({
      client: TEST_CLIENT,
      primaryAgent: TEST_MBOX_AGENT,
      profiles: {
        [TEST_PROFILE_ID]: TEST_CONTENT,
      },
      secondaryAgents: [TEST_OPENID_AGENT],
    });
    const expectedIdentifiers = 2;
    assert.equal(result.identifierIds.length, expectedIdentifiers);

    const primaryIdentifier = await assertIdentifier(result.identifierIds[0], {
      key: 'mbox',
      value: TEST_MBOX_AGENT.mbox as string,
    });
    if (primaryIdentifier.persona === undefined) {
      throw new Error('Expected persona to be defined in primaryIdentifier.');
    }

    const secondaryIdentifier = await assertIdentifier(result.identifierIds[1], {
      key: 'openid',
      value: TEST_OPENID_AGENT.openid as string,
    });

    if (secondaryIdentifier.persona === undefined) {
      throw new Error('Expected persona to be defined in secondaryIdentifier.');
    }

    assert.equal(secondaryIdentifier.persona, primaryIdentifier.persona);
    await assertPersona(primaryIdentifier.persona);
    await assertProfile(TEST_MBOX_AGENT);
    await assertProfile(TEST_OPENID_AGENT);
  });

  it('should use primary persona on all secondary agents when they have a persona', async () => {
    // Creates persona and identifier for secondary agent.
    const { persona } = await service.createPersona({
      client: TEST_CLIENT,
      name: 'Dave',
    });
    const { identifier: createdSecondaryIdentifier } = await service.createIdentifier({
      client: TEST_CLIENT,
      ifi: {
        key: 'openid',
        value: TEST_OPENID_AGENT.openid as string,
      },
      persona: persona.id,
    });

    // Uploads profiles with the secondary agent.
    const result = await service.uploadProfiles({
      client: TEST_CLIENT,
      primaryAgent: TEST_MBOX_AGENT,
      profiles: {
        [TEST_PROFILE_ID]: TEST_CONTENT,
      },
      secondaryAgents: [TEST_OPENID_AGENT],
    });
    const expectedIdentifiers = 2;
    assert.equal(result.identifierIds.length, expectedIdentifiers);

    // Checks that an identifier was created for the primary agent.
    const primaryIdentifier = await assertIdentifier(result.identifierIds[0], {
      key: 'mbox',
      value: TEST_MBOX_AGENT.mbox as string,
    });
    if (primaryIdentifier.persona === undefined) {
      throw new Error('Expected persona to be defined in primaryIdentifier.');
    }

    // Checks that the identifier was reused for the secondary agent.
    const secondaryIdentifier = await assertIdentifier(result.identifierIds[1], {
      key: 'openid',
      value: TEST_OPENID_AGENT.openid as string,
    });
    assert.equal(secondaryIdentifier.id, createdSecondaryIdentifier.id);
    if (secondaryIdentifier.persona === undefined) {
      throw new Error('Expected persona to be defined in secondaryIdentifier.');
    }

    // Checks that the new primary persona was used in the secondary identifier.
    assert.notEqual(secondaryIdentifier.persona, createdSecondaryIdentifier.persona);
    assert.equal(secondaryIdentifier.persona, primaryIdentifier.persona);

    // Checks that a persona was created for the primary identifier.
    await assertPersona(primaryIdentifier.persona);

    // Checks that the profiles are correct for the two identifiers.
    await assertProfile(TEST_MBOX_AGENT);
    await assertProfile(TEST_OPENID_AGENT);
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
