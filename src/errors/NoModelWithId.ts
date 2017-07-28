/* tslint:disable:no-class */
import NoModel from 'jscommons/dist/errors/NoModel';

export default class extends NoModel {
  constructor(modelName: string, public id: string) {
    super(modelName);
  }
}
