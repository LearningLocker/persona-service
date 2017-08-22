import { ObjectID } from 'mongodb';
import Ifi from '../../models/Ifi';
declare const _default: (ifi: Ifi, organisation: string) => {
    organisation: ObjectID;
    'ifi.value.homePage': string;
    'ifi.value.name': string;
    'ifi.key': "mbox" | "mbox_sha1sum" | "openid" | "account";
} | {
    organisation: ObjectID;
    'ifi.value': string;
    'ifi.key': "mbox" | "mbox_sha1sum" | "openid" | "account";
};
export default _default;
