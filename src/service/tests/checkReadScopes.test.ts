import * as assert from 'assert';
import Forbidden from 'jscommons/dist/errors/Forbidden';
import { PROFILE_READ_SCOPES } from '../../utils/scopes';
import checkReadScopes from '../utils/checkReadScopes';

describe('checkReadScopes', () => {
  const assertForbidden = (scopes: string[]) => {
    try {
      checkReadScopes(scopes);
    } catch (err) {
      const actualConstructor = err.constructor;
      assert.equal(actualConstructor, Forbidden);
    }
  };

  it('should throw forbidden error when using no scopes', async () => {
    await assertForbidden([]);
  });

  it('should throw forbidden error when using invalid scope', async () => {
    await assertForbidden(['invalid_scope']);
  });

  it('should not throw error when using valid scopes', async () => {
    PROFILE_READ_SCOPES.map((scope) => {
      checkReadScopes([scope]);
    });
  });
});
