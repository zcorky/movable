export interface Options {
  handler: string;
  container?: string;
  boundable?: boolean;
  fixed?: boolean;
}

class Movable {
  constructor(options: Options);

  static version: string;
}

export default Movable;
