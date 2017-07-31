import * as assert from 'assert';
import setup from '../utils/setup';
import {
  TEST_CLIENT,
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
      profiles: {},
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
  });

  // It('should create new persona if no persona is found', () => {});

  // It('should add identifiers to existing persona if 1 persona is found', () => {

  // })

  // It('should error if more than 1 persona exists and singelPersona flag is set', () => {

  // });
});
