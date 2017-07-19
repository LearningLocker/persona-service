import CommonRepo from 'jscommons/dist/repoFactory/Repo';
import DeleteProfileContentOptions from './options/DeleteProfileContentOptions';
import GetProfileContentOptions from './options/GetProfileContentOptions';
import StoreProfileContentOptions from './options/StoreProfileContentOptions';
import GetProfileContentResult from './results/GetProfileContentResult';

interface Repo extends CommonRepo {
  deleteProfileContent: (opts: DeleteProfileContentOptions) => Promise<void>;
  getProfileContent: (opts: GetProfileContentOptions) => Promise<GetProfileContentResult>;
  storeProfileContent: (opts: StoreProfileContentOptions) => Promise<void>;
}

export default Repo;
