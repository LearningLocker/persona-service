import BaseError from 'jscommons/dist/errors/BaseError';
export default class  extends BaseError {
    message: string;
    constructor(message: string);
}
