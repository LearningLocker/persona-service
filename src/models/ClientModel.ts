import Actor from './Actor';

interface Model {
  _id: string;
  title: string;
  organisation: string;
  lrs_id: string;
  authority: Actor;
  isTrusted: boolean;
  scopes: string[];
}

export default Model;
