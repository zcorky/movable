const NOOP = () => null;

/**
 * Compatible addEventListener
 * @param {element} $node
 * @param {array} names 
 * @param {function} handler 
 */
export function addEvents($node, names = [], handler = NOOP, options) {
  names.forEach(name => $node.addEventListener(name, handler, options));
}
