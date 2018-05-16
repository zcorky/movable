const NOOP = () => null;

/**
 * Compatible addEventListener
 * @param {element} $node
 * @param {array} names 
 * @param {function} handler 
 */
export function addEvent($node, names = [], handler = NOOP) {
  names.forEach(name => $node.addEventListener(name, handler));
}
