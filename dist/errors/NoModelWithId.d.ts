import NoModel from 'jscommons/dist/errors/NoModel';
export default class  extends NoModel {
    id: string;
    constructor(modelName: string, id: string);
}
