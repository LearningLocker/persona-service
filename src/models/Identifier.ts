import Ifi from './Ifi';

interface Model {
  id: string;
  organisation: string;
  persona?: string;
  ifi: Ifi;
}

export default Model;
