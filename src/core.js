import {
  isSupportPassive,
  assert,
  $,
  setStyles,
  getClientXY,
  addEvents,
} from './utils/index';

const passiveOptions = isSupportPassive() ? {
  passive: true,
  capture: false,
} : false;

export default class Movable {
  static version = '1.0.0';

  /**
   * Constructor
   *   params:
   *     handler: handler document node selector.
   *     container: container document node selector.
   *     boundable: support have boundary, default false.
   */
  constructor(options = {}) {
    const {
      boundable = false,
      fixed = false,
    } = options;

    const handlerSelector = options.handler || '.handler';
    const containerSelector = options.container; // donot set default value

    this.$handler = $(handlerSelector);
    this.$container = containerSelector ? $(containerSelector) || this.$handler : this.$handler;

    assert(this.$handler, `${handlerSelector} element should be mounted first.`);
    assert(this.$container, `${containerSelector} element should be mounted first.`);

    const {
      x, y,
      width,
      height,
    } = this.$container.getBoundingClientRect();

    this.state = {
      fixed,
      boundable,
      movable: false,
      boundaried: false,
      originX: x,
      originY: y,
      width,
      height,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      currentX: 0,
      currentY: 0,
      deltaX: 0,
      deltaY: 0,
      mouseDeltaX: 0,
      mouseDeltaY: 0,
    };

    this.on();
  }

  /**
   * style memebers: handler + container
   *   1 make container position absolute
   *   2 make handler cursor as move
   */
  styledMembers() {
    // @1 make handler cusor move
    setStyles(this.$handler, {
      cursor: 'move',
      userSelect: 'none',
    });
  }

  on() {
    this.styledMembers();

    // @0 on resize
    addEvents(window, ['resize'], this.onResize);

    // @1 mouse down on handler
    addEvents(this.$handler, ['mousedown', 'touchstart'], this.onMouseDown, passiveOptions);

    // @2 mouse up on document
    addEvents(document, ['mouseup', 'touchend', 'touchcancel'], this.onMouseUp, passiveOptions);

    // @3 mouse move on documnent
    addEvents(document, ['mousemove', 'touchmove'], this.onMouseMove, passiveOptions);
  }

  onResize = () => {
    const { x, y, width, height } = this.$container.getBoundingClientRect();

    this.state.innerWidth = window.innerWidth;
    this.state.innerHeight = window.innerHeight;
    this.state.originX = x - this.state.deltaX;
    this.state.originY = y - this.state.deltaY;
    this.state.width = width;
    this.state.height = height;
    this.state.mouseDeltaX = 0;
    this.state.mouseDeltaY = 0;
  }

  onMouseDown = (event) => {
    const { clientX, clientY } = getClientXY(event);

    this.state.currentX = clientX;
    this.state.currentY = clientY;
    this.state.movable = true;
  };

  onMouseUp = () => {
    if (this.state.movable) {
      this.state.movable = false;
      this.state.deltaX += this.state.mouseDeltaX;
      this.state.deltaY += this.state.mouseDeltaY;

      // reset mouse delta
      this.state.mouseDeltaX = 0;
      this.state.mouseDeltaY = 0;
    }
  };

  onMouseMove = (event) => {
    if (!this.state.movable) return false;

    const { clientX, clientY } = getClientXY(event);

    const mouseDeltaX = clientX - this.state.currentX;
    const mouseDeltaY = clientY - this.state.currentY;
    
    this.state.mouseDeltaX = mouseDeltaX;
    this.state.mouseDeltaY = mouseDeltaY;

    let currentDeltaX = this.state.deltaX + mouseDeltaX;
    let currentDeltaY = this.state.deltaY + mouseDeltaY;

    if (this.state.boundable) {
      const { originX, originY, width, height, innerWidth, innerHeight } = this.state;

      if (originX + currentDeltaX < 0) {
        // left
        currentDeltaX = -originX;
        // found boundary
        this.boundaried = true;
        this.state.mouseDeltaX = - originX - this.state.deltaX;
      } else if (innerWidth < originX + width + currentDeltaX) {
        // right
        currentDeltaX = innerWidth - (originX + width);
        this.boundaried = true;
        this.state.mouseDeltaX = innerWidth - originX - width - this.state.deltaX;
      }

      if (originY + currentDeltaY < 0) {
        // top
        currentDeltaY = -originY;
        this.boundaried = true;
        this.state.mouseDeltaY = - originY - this.state.deltaY;
      } else if (innerHeight < originY + height + currentDeltaY) {
        // bottom
        currentDeltaY = innerHeight - (originY + height);
        this.boundaried = true;
        this.state.mouseDeltaY = innerHeight - originY - height - this.state.deltaY;
      }
    }
    
    setStyles(this.$container, {
      '-webkit-transform': `translate3d(${currentDeltaX}px, ${currentDeltaY}px, 0px)`,
      '-moz-transform': `translate3d(${currentDeltaX}px, ${currentDeltaY}px, 0px)`,
      '-o-transform': `translate3d(${currentDeltaX}px, ${currentDeltaY}px, 0px)`,
      'transform': `translate3d(${currentDeltaX}px, ${currentDeltaY}px, 0px)`,
    });
  };
}
