import * as sourceMapSupport from 'source-map-support';
import Service from './serviceFactory/Service';

sourceMapSupport.install();

import serviceFactory from './serviceFactory';
const serviceFacade = serviceFactory();
export default serviceFacade;
