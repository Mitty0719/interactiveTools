class HorizontalSlider {
  static init ({id, itemWidth = '20vw', leftButton = true, rightButton = true}) {

    const container = document.querySelector(`#${id}`);
    const items = [...container.children];
    let index = 0;

    container.innerHTML = '';

    const sliderBox = document.createElement('div');
    const sliderList = document.createElement('ul');

    sliderBox.className = 'horizontal-slider-box';
    sliderBox.style.position = 'relative';
    sliderBox.style.height = '100%';
    sliderBox.style.overflow = 'hidden';
    
    sliderList.className = 'horizontal-slider-list';
    sliderList.style.height = '100%';
    sliderList.style.display = 'flex';
    sliderList.style.position = 'absolute';

    sliderBox.appendChild(sliderList);
    container.appendChild(sliderBox);

    const boxRect = sliderBox.getBoundingClientRect();
    sliderBox.style.width = boxRect.width + 'px';

    for(const item of items) {
      const sliderItem = document.createElement('li');
      sliderItem.className = 'horizontal-slider-item';
      sliderItem.style.width = boxRect.width + 'px';
      sliderItem.style.height = '100%';
      sliderItem.appendChild(item);
      sliderList.appendChild(sliderItem);
    }

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
      
      leftButton.addEventListener('click', () => {
        index--;
      })
    }

    if(rightButton) {
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

      rightButton.addEventListener('click', () => {
        index++;
      })
    }
  }
}