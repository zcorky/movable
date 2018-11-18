import {
  isSupportPassive,
  assert,
  $,
  setStyle,
  getClientXY,
  addEvent,
} from './utils/index';

const passiveOptions = isSupportPassive() ? {
  passive: true,
  capture: false,
} : false;

export default class Movable {
  static version = '0.0.9';

  /**
   * Constructor
   *   params:
   *     handler: handler document node selector.
   *     container: container document node selector.
   *     boundable: support have boundary, default false.
   */
  constructor(options = {}) {
    const {
      handler = '.handler',
      container = '.container',
      boundable = false,
      fixed = false,
    } = options;

    this.$handler = $(handler);
    this.$container = $(container) || this.$handler;

    assert(this.$handler, `${handler} element should be mounted first.`);
    assert(this.$container, `${container} element should be mounted first.`);

    this.state = {
      fixed,
      boundable,
      movable: false,
      currentX: 0,
      currentY: 0,
      top: 0,
      left: 0,
      maxLeft: 0,
      maxTop: 0,
    };

    this.on();
  }

  /**
   * style memebers: handler + container
   *   1 make container position absolute
   *   2 make handler cursor as move
   */
  styledMembers() {
    // @1 make container absolute
    setStyle(this.$container, 'position', !this.state.fixed ? 'absolute' : 'fixed');
    // @2 make handler cusor move
    setStyle(this.$handler, 'cursor', 'move');
    // @3 box-sizing for width/height
    setStyle(this.$container, 'box-sizing', 'border-box');
  }

  on() {
    this.styledMembers();

    // @1 mouse down on handler
    addEvent(this.$handler, ['mousedown', 'touchstart'], this.onMouseDown, passiveOptions);

    // @2 mouse up on document
    addEvent(document, ['mouseup', 'touchend', 'touchcancel'], this.onMouseUp, passiveOptions);

    // @3 mouse move on documnent
    addEvent(document, ['mousemove', 'touchmove'], this.onMouseMove, passiveOptions);
  }

  onMouseDown = (event) => {
    const {
      top,
      left,
      width,
      height,
    } = this.$container.getBoundingClientRect();

    const { clientX, clientY } = getClientXY(event);

    this.state.top = top;
    this.state.left = left;
    this.state.width = width;
    this.state.height = height;
    this.state.maxLeft = window.innerWidth - width;
    this.state.maxTop = window.innerHeight - height;
    this.state.currentX = clientX;
    this.state.currentY = clientY;
    this.state.movable = true;
    
    setStyle(this.$container, 'width', width);
    setStyle(this.$container, 'height', height);
  };

  onMouseUp = () => {
    if (this.state.movable) {
      this.state.movable = false;
    }
  };

  onMouseMove = (event) => {
    if (!this.state.movable) return false;

    const { clientX, clientY } = getClientXY(event);

    const deltaX = clientX - this.state.currentX;
    const deltaY = clientY - this.state.currentY;
    let left = this.state.left + deltaX;
    let top = this.state.top + deltaY;

    if (this.state.boundable) {
      if (left < 0) { // on left side
        left = 0;
      } else if (left > this.state.maxLeft) { // on right side
        left = this.state.maxLeft;
      }

      if (top < 0) {
        top = 0;
      } else if (top > this.state.maxTop) {
        top = this.state.maxTop;
      }
    }

    setStyle(this.$container, 'top', top);
    setStyle(this.$container, 'left', left);
  };
}
