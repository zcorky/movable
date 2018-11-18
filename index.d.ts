export interface Options {
  handler: string;
  container?: string;
  boundable?: boolean;
  fixed?: boolean;
}

export class Movable {
  constructor(options: Options);
}

export default Movable;
