const MOBILE_EVENTS = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];

/**
 * Get target clientX + clientY, support pc + mobile
 * @param {Event} event
 */
export default function getClientXY(event) {
  if (MOBILE_EVENTS.indexOf(event.type) === -1) {
    return {
      clientX: event.clientX,
      clientY: event.clientY,
    };
  }

  const target = event.targetTouches[0] || event.touches[0];
  return {
    clientX: target.clientX,
    clientY: target.clientY,
  };
}