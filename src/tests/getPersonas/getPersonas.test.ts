import * as assert from 'assert';
import setup from '../utils/setup';
import { TEST_ORGANISATION, TEST_ORGANISATION_2 } from '../utils/values';

describe('getPersonas', () => {
  const service = setup();
  const personaData1 = {
    name: 'Dave 1',
    organisation: TEST_ORGANISATION,
  };
  const personaData2 = {
    name: 'Dave 2',
    organisation: TEST_ORGANISATION,
  };
  const personaData3 = {
    name: 'Dave 3',
    organisation: TEST_ORGANISATION_2,
  };
  const personaData4 = {
    name: 'Dave 4',
    organisation: TEST_ORGANISATION_2,
  };

  it('should get all personas with default options', async () => {
    const { persona: persona1 } = await service.createPersona(personaData1);
    const { persona: persona2 } = await service.createPersona(personaData2);
    await service.createPersona(personaData3);
    await service.createPersona(personaData4);

    const result = await service.getPersonas({
      organisation: TEST_ORGANISATION,
    });

    assert.equal(result.personas.length, 2);
    assert.deepEqual(result.personas[0], persona1);
    assert.deepEqual(result.personas[1], persona2);
  });

  it('should get all personas matching a filter', async () => {
    const { persona: persona1 } = await service.createPersona(personaData1);
    await service.createPersona(personaData2);
    await service.createPersona(personaData3);
    await service.createPersona(personaData4);

    const result = await service.getPersonas({
      filter: { name: 'Dave 1' },
      organisation: TEST_ORGANISATION,
    });

    assert.equal(result.personas.length, 1);
    assert.deepEqual(result.personas[0], persona1);
  });

  it('should get all personas following the sort order', async () => {
    const { persona: persona1 } = await service.createPersona(personaData1);
    const { persona: persona2 } = await service.createPersona(personaData2);
    await service.createPersona(personaData3);
    await service.createPersona(personaData4);

    const result = await service.getPersonas({
      organisation: TEST_ORGANISATION,
      sort: { name: -1 },
    });

    assert.equal(result.personas.length, 2);
    assert.deepEqual(result.personas[0], persona2);
    assert.deepEqual(result.personas[1], persona1);
  });

  it('should get all personas with a limit', async () => {
    await service.createPersona(personaData1);
    await service.createPersona(personaData2);
    await service.createPersona(personaData3);
    await service.createPersona(personaData4);

    const result = await service.getPersonas({
      limit: 1,
      organisation: TEST_ORGANISATION,
    });

    assert.equal(result.personas.length, 1);
  });

  it('should get all personas with a skip', async () => {
    await service.createPersona(personaData1);
    const { persona: persona2 } = await service.createPersona(personaData2);
    await service.createPersona(personaData3);
    await service.createPersona(personaData4);

    const result = await service.getPersonas({
      organisation: TEST_ORGANISATION,
      skip: 1,
    });

    assert.equal(result.personas.length, 1);
    assert.deepEqual(result.personas[0], persona2);
  });
});
