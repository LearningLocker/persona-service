import ModelsRepo from './ModelsRepo';
import StorageRepo from './StorageRepo';

interface Repo extends ModelsRepo, StorageRepo {}

export default Repo;
