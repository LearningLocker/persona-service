import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import serviceFactory from './serviceFactory';
const serviceFacade = serviceFactory();
export default serviceFacade;
