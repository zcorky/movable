/**
 * Get element
 * @param {string | element} selector 
 */
export function $(selector) {
  return typeof selector === 'string' ? document.querySelector(selector) : selector;
}

/**
 * Set element style.
 * @param {element}  
 * @param {string} name 
 * @param {number | string} value 
 */
export function setStyle($node, name, value) {
  $node.style[name] = typeof value === 'number' ? `${value}px` : value; // eslint-disable-line
}
