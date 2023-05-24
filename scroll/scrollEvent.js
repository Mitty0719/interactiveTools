class ScrollEvent {
  constructor() {
    this.sectionNodeList = document.querySelectorAll('.scroll-section');
    this.scrollSectionList = [];
    this.scrollIndex = 0;
    
    this.init();
  }

  init() {
    this.createScrollSection(this.sectionNodeList);
    window.addEventListener('scroll', this.scrollLoop.bind(this));
  }

  createScrollSection(nodeList) {
    let prevHeight = 0;
    for(const node of nodeList) {
      this.scrollSectionList.push(new ScrollSection(node, prevHeight));
      prevHeight += node.offsetHeight;
    }
  }

  scrollLoop() {
    this.scrollSectionList[this.scrollIndex].scrollLoop(scrollY, this.addScrollIndex.bind(this));
    // for(const section of this.scrollSectionList) {
    //   section.scrollLoop(scrollY, this.addScrollIndex.bind(this));
    // }
  }

  addScrollIndex(value) {
    this.scrollIndex += value;
  }

  addScrollEvent(options) {
    const {id} = options;
    for(const section of this.scrollSectionList) {
      if(section.haveNode(id)) {
        section.addScrollEvent(options);
        break;
      } else {
        console.error('지정한 id를 가진 node가 없습니다.');
      }
    }
  }
  addScrollEventTransform(options) {
    const {id} = options;
    for(const section of this.scrollSectionList) {
      if(section.haveNode(id)) {
        section.addScrollEventTransform(options);
        break;
      } else {
        console.error('지정한 id를 가진 node가 없습니다.');
      }
    }
  }
  addScrollClass(options) {
    const {id} = options;
    for(const section of this.scrollSectionList) {
      if(section.haveNode(id)) {
        section.addScrollClass(options);
        break;
      } else {
        console.error('지정한 id를 가진 node가 없습니다.');
      }
    }
  }
}

class ScrollSection {
  constructor(node, prevHeight) {
    this.node = node;
    this.width = this.node.offsetWidth;
    this.height = this.node.offsetHeight;
    this.startY = prevHeight;
    this.endY = this.startY + this.node.offsetHeight;
    this.ratio = 0;
    this.events = [];
  }

  scrollLoop(scrollY, addScrollIndex) {
    // calcHeight
    const targetY = scrollY - this.startY;
    let ratio = targetY / this.height;

    if(ratio < 0) {
      ratio = 0;
      addScrollIndex(-1);
    } else if(ratio > 1) {
      ratio = 1;
      addScrollIndex(1);
    }
    this.ratio = ratio;

    // callEvents
    for(const event of this.events) {
      event();
    }
  }

  addScrollEvent({id, style, startRatio, endRatio, startValue, endValue, suffix = ''}) {
    const element = this.node.querySelector(`#${id}`);
    const event = function() {
      if(this.ratio < startRatio) {
        element.style[style] = `${startValue}${suffix}`;
      } else if(this.ratio >= startRatio && this.ratio <= endRatio) {
        const value = (endValue - startValue) * ((this.ratio - startRatio) / (endRatio - startRatio)) + startValue;
        element.style[style] = `${value}${suffix}`;
      } else if(this.ratio > endRatio) {
        element.style[style] = `${endValue}${suffix}`;
      }
    }
    this.events.push(event.bind(this));
  }
  addScrollEventTransform({id, transformStyle, startRatio, endRatio }) {
    const element = this.node.querySelector(`#${id}`);
    const event = function() {
      if(this.ratio < startRatio) {
        let valueStr = ``;
        for(const styleItem of transformStyle) {
          const {style, startValue, suffix} = styleItem;
          const value = startValue;
          valueStr += ` ${style}(${value}${suffix || ''})`;
        }
        element.style.transform = valueStr;
      } else if(this.ratio >= startRatio && this.ratio <= endRatio) {
        const ratioPercent = (this.ratio - startRatio) / (endRatio - startRatio);
        let valueStr = ``;
        for(const styleItem of transformStyle) {
          const {style, startValue, endValue, suffix} = styleItem;
          const value = (endValue - startValue) * ratioPercent + startValue;
          valueStr += ` ${style}(${value}${suffix || ''})`;
        }
        element.style.transform = valueStr;
      } else if(this.ratio > endRatio) {
        let valueStr = ``;
        for(const styleItem of transformStyle) {
          const {style, endValue, suffix} = styleItem;
          const value = endValue;
          valueStr += ` ${style}(${value}${suffix || ''})`;
        }
        element.style.transform = valueStr;
      }
    }
    this.events.push(event.bind(this));
  }

  addScrollClass({id, classList, startRatio, endRatio = 1}) {
    const element = this.node.querySelector(`#${id}`);
    const event = function() {
      if(this.ratio >= startRatio && this.ratio <= endRatio) {
        for(const className of classList) {
          element.classList.add(className);
        }
      } else {
        for(const className of classList) {
          element.classList.remove(className);
        }
      }
    }
    this.events.push(event.bind(this));
  }

  haveNode(selector) {
    if(this.node.querySelectorAll(`.${selector}, #${selector}`).length) {
      return true;
    }
    return false;
  }
}
