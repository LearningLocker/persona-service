import type Persona from '../../models/Persona';
import type PaginationResult from '../utils/PaginationResult';

type GetPersonasConnectionResult = PaginationResult<Persona>;

export default GetPersonasConnectionResult;
