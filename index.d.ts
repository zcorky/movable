export interface Options {
  handler: string;
  container?: string;
  boundable?: boolean;
  fixed?: boolean;
}

export class Movable {
  constructor(options: Options);

  static version: string;
}

export default Movable;
