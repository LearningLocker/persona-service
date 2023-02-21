import * as sourceMapSupport from 'source-map-support';
import Service from './serviceFactory/Service';

import serviceFactory from './serviceFactory';

sourceMapSupport.install();
const serviceFacade = serviceFactory();
export default serviceFacade;
