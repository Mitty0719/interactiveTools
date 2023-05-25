class HorizontalSlider {
  static init ({id, interval, timeout = 1000, leftButton = true, rightButton = true}) {
    const container = document.querySelector(`#${id}`);
    const items = [...container.children];
    const firstItem = items[0].cloneNode(true);
    const lastItem = items[items.length - 1].cloneNode(true);
    let index = -1;
    let isMoving = false;

    container.innerHTML = '';

    const sliderBox = document.createElement('div');
    const sliderList = document.createElement('ul');
    const sliderItems = [];

    sliderBox.className = 'horizontal-slider-box';
    sliderBox.style.position = 'relative';
    sliderBox.style.height = '100%';
    sliderBox.style.overflow = 'hidden';
    
    sliderList.className = 'horizontal-slider-list';
    sliderList.style.height = '100%';
    sliderList.style.display = 'flex';
    sliderList.style.position = 'absolute';
    sliderList.style.transitionDuration = '1s'

    sliderBox.appendChild(sliderList);
    container.appendChild(sliderBox);

    const boxRect = sliderBox.getBoundingClientRect();
    let itemWidth = boxRect.width;
    // sliderBox.style.width = itemWidth + 'px';

    const copyItems = [lastItem, ...items, firstItem];
    for(const item of copyItems) {
      const sliderItem = document.createElement('li');
      sliderItem.className = 'horizontal-slider-item';
      sliderItem.style.width = itemWidth + 'px';
      sliderItem.style.height = '100%';
      sliderItem.appendChild(item);
      sliderList.appendChild(sliderItem);
      sliderItems.push(sliderItem);
    }
    sliderList.style.left = itemWidth * index + 'px';

    // create buttons
    if(leftButton) {
      const leftButtonCon = document.createElement('div');
      const leftButton = document.createElement('span');

      leftButton.style.position = 'absolute';
      leftButton.style.top = '50%';
      leftButton.style.left = 0;
      leftButton.style.width = '50px';
      leftButton.style.height = '100px';
      leftButton.style.backgroundColor = 'green';
      leftButton.style.transform = 'translateY(-50%)';

      leftButtonCon.appendChild(leftButton);
      sliderBox.appendChild(leftButtonCon);
      
      leftButton.addEventListener('click', moveLeft)
    }

    if(rightButton) {
      if(isMoving) return;

      const rightButtonCon = document.createElement('div');
      const rightButton = document.createElement('span');

      rightButton.style.position = 'absolute';
      rightButton.style.top = '50%';
      rightButton.style.right = 0;
      rightButton.style.width = '50px';
      rightButton.style.height = '100px';
      rightButton.style.backgroundColor = 'green';
      rightButton.style.transform = 'translateY(-50%)';

      rightButtonCon.appendChild(rightButton);
      sliderBox.appendChild(rightButtonCon);

      rightButton.addEventListener('click', moveRight)
    }

    if(interval) {
      setInterval(() => {
        moveLeft();
      }, interval)
    }
    
    window.addEventListener('resize', resize)

    function moveLeft() {
      if(isMoving) return;
      isMoving = true;
      setTimeout(() => {
        isMoving = false;
      }, timeout);

      index--;
      if(Math.abs(index) > items.length) {
        index = 0;
        sliderList.style.left = itemWidth * index + 'px';
      } else {
        sliderList.style.transitionDuration = `${timeout / 1000}s`;
        sliderList.style.left = itemWidth * index + 'px';
        if(Math.abs(index) == items.length) {
          setTimeout(() => {
            index = 0;
            sliderList.style.transitionDuration = '0s';
            sliderList.style.left = itemWidth * index + 'px';
            isMoving = false;
          }, timeout)
        }
      }
    }

    function moveRight() {
      if(isMoving) return;
      isMoving = true;
      setTimeout(() => {
        isMoving = false;
      }, timeout);

      index++;
      if(index > 0) {
        index = -(items.length);
        sliderList.style.left = itemWidth * index + 'px';
      } else {
        sliderList.style.transitionDuration = `${timeout / 1000}s`;
        sliderList.style.left = itemWidth * index + 'px';
        if(index == 0) {
          setTimeout(() => {
            index = -(items.length);
            sliderList.style.transitionDuration = '0s';
            sliderList.style.left = itemWidth * index + 'px';
            isMoving = false;
          }, timeout)
        }
      }
    }

    function resize() {
      const rect = sliderBox.getBoundingClientRect();
      itemWidth = rect.width;
      for(const item of sliderItems) {
        item.style.width = itemWidth + 'px';
      } 
    }
  }
}
