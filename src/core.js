import {
  isSupportPassive,
  assert,
  $,
  setStyle,
  setStyles,
  getClientXY,
  addEvents,
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
      // top: 0,
      // left: 0,
      // maxLeft: 0,
      // maxTop: 0,
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
    // setStyle(this.$container, 'position', !this.state.fixed ? 'absolute' : 'fixed');
    // @2 make handler cusor move
    setStyle(this.$handler, 'cursor', 'move');
    // @3 box-sizing for width/height
    // setStyle(this.$container, 'box-sizing', 'border-box');
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
    console.log('resize');
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
    // const {
    //   top,
    //   left,
    //   width,
    //   height,
    // } = this.$container.getBoundingClientRect();

    const { clientX, clientY } = getClientXY(event);

    // this.state.top = top;
    // this.state.left = left;
    // this.state.width = width;
    // this.state.height = height;
    // this.state.maxLeft = window.innerWidth - width;
    // this.state.maxTop = window.innerHeight - height;
    this.state.currentX = clientX;
    this.state.currentY = clientY;
    this.state.movable = true;
    // console.log('mouse down in');
    // console.log('mouse down: ', this.state);
    
    // setStyle(this.$container, 'width', width);
    // setStyle(this.$container, 'height', height);
  };

  onMouseUp = () => {
    if (this.state.movable) {
      // console.log('mouse up in');
      // console.log('mouse up: ', this.state);
      this.state.movable = false;
      this.state.deltaX += this.state.mouseDeltaX;
      this.state.deltaY += this.state.mouseDeltaY;

      console.log('reset mouse delta');
      // reset mouse delta
      this.state.mouseDeltaX = 0;
      this.state.mouseDeltaY = 0;
    }
  };

  onMouseMove = (event) => {
    if (!this.state.movable) return false;
    // console.log('mouse move in');
    // console.log('mouse move: ', this.state);

    const { clientX, clientY } = getClientXY(event);

    const mouseDeltaX = clientX - this.state.currentX;
    const mouseDeltaY = clientY - this.state.currentY;
    
    this.state.mouseDeltaX = mouseDeltaX;
    this.state.mouseDeltaY = mouseDeltaY;
    // let left = this.state.left + mouseDeltaX;
    // let top = this.state.top + mouseDeltaY;

    // if (this.state.boundable) {
    //   if (left < 0) { // on left side
    //     left = 0;
    //   } else if (left > this.state.maxLeft) { // on right side
    //     left = this.state.maxLeft;
    //   }

    //   if (top < 0) {
    //     top = 0;
    //   } else if (top > this.state.maxTop) {
    //     top = this.state.maxTop;
    //   }
    // }

    // setStyle(this.$container, 'top', top);
    // setStyle(this.$container, 'left', left);

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
        // this.state.mouseDeltaX = 0;
        // this.state.mouseDeltaY = 0;
        this.boundaried = true;
        this.state.mouseDeltaX = innerWidth - originX - width - this.state.deltaX;
      }

      if (originY + currentDeltaY < 0) {
        // top
        currentDeltaY = -originY;
        this.boundaried = true;
        this.state.mouseDeltaY = - originY - this.state.deltaY;
        // this.state.mouseDeltaX = 0;
        // this.state.mouseDeltaY = 0;
      } else if (innerHeight < originY + height + currentDeltaY) {
        // bottom
        currentDeltaY = innerHeight - (originY + height);
        this.boundaried = true;
        this.state.mouseDeltaY = innerHeight - originY - height - this.state.deltaY;
        // this.state.mouseDeltaX = 0;
        // this.state.mouseDeltaY = 0;
      }
    }
    
    
    // console.log('pos: ', mouseDeltaX, this.state.deltaX, currentDeltaX);
    // console.log('delta: ', this.state.deltaX, this.state.deltaY);
    // console.log('current: ', currentDeltaX, currentDeltaY);
    setStyles(this.$container, {
      '-webkit-transform': `translate3d(${currentDeltaX}px, ${currentDeltaY}px, 0px)`,
      '-moz-transform': `translate3d(${currentDeltaX}px, ${currentDeltaY}px, 0px)`,
      '-o-transform': `translate3d(${currentDeltaX}px, ${currentDeltaY}px, 0px)`,
      'transform': `translate3d(${currentDeltaX}px, ${currentDeltaY}px, 0px)`,
    });
    // setStyle(this.$container, 'transform', `translate3d(${currentDeltaX}px, ${currentDeltaY}px, 0px)`);
  };
}
