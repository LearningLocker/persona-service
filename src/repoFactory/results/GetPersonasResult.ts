export interface SingleResult {
  readonly organisation: string;
  readonly id: string;
  readonly name?: string;
}

type Result = SingleResult[];

export default Result;
