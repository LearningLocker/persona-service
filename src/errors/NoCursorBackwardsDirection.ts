/* tslint:disable:no-class */
import BaseError from 'jscommons/dist/errors/BaseError';

// thrown if you try to paginate a undefined cursor backwards.
export default class extends BaseError {}
