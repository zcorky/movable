/**
 * Detect the device is support passive
 */
export default function isSupportPassive() {
  let isSupport = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        isSupport = true;
      },
    });
    window.addEventListener('test', null, opts);
  } catch (e) {
    //
  }
  return isSupport;
}