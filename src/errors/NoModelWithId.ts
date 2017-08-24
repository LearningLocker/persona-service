/* tslint:disable:no-class */
import NoModel from 'jscommons/dist/errors/NoModel';

export default class extends NoModel {
  /* istanbul ignore next */
  constructor(modelName: string, public id: string) {
    super(modelName);
  }
}
