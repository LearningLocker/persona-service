import BaseError from 'jscommons/dist/errors/BaseError';
export default class  extends BaseError {
    id: string;
    constructor(id: string);
}
