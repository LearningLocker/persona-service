import * as rulr from 'rulr';
import * as xapi from 'xapi-validation/dist/factory';
import IfiCountWarning from 'xapi-validation/dist/warnings/IfiCountWarning';
import NoIfiWarning from 'xapi-validation/dist/warnings/NoIfiWarning';

export default rulr.maybe(rulr.composeRules([
  rulr.restrictToSchema({
    account: rulr.optional(xapi.account),
    mbox: rulr.optional(xapi.mailto),
    mbox_sha1sum: rulr.optional(xapi.sha1),
    openid: rulr.optional(xapi.iri),
  }),
  (data, path) => {
    const keys = Object.keys(data);
    if (keys.length > 1) {
      return [new IfiCountWarning(data, path, keys)];
    }
    if (keys.length === 0) {
      return [new NoIfiWarning(data, path)];
    }
    return [];
  },
]));
