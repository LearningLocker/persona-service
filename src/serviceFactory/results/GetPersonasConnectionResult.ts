import Persona from '../../models/Persona';
import PaginationResult from '../utils/PaginationResult';

type GetPersonasConnectionResult = PaginationResult<Persona>;

export default GetPersonasConnectionResult;
