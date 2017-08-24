import * as sourceMapSupport from 'source-map-support';
// tslint:disable-next-line:no-unused
import Service from './serviceFactory/Service';

sourceMapSupport.install();

import serviceFactory from './serviceFactory';
const serviceFacade = serviceFactory();
export default serviceFacade;
