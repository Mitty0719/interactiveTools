### horizontalSlider


<font size="2">
수평방향 무한 슬라이드
<hr/>

#### HOW TO USE
1. horizontal Slider를 사용하기 위한 HTML 구조 생성
  - id, class 명과 style은 자유로움
  - 최상단 요소(아래 코드의 '#horizontal-slider')는 크기를 가지고 있을 것

```html
<div id="horizontal-slider" style="flex: 1 1 0; height: 100%">
  <div class="slider-item" style="height: 100%; opacity: 0.1; background-color: red"></div>
  <div class="slider-item" style="height: 100%; opacity: 0.1; background-color: green"></div>
  <div class="slider-item" style="height: 100%; opacity: 0.1; background-color: yellow"></div>
</div>
```
<br>

2. Horizontal Slider init 함수 호출
    - id : HTML Node ID
    - interval : 자동 넘김 필요시 지정, millisecond
    - timeout : 버튼 클릭시 넘김 소요 시간, millisecond
    - leftButton : 왼쪽 넘김 버튼 여부
    - rightButton : 오른쪽 넘김 버튼 여부

```javascript
HorizontalSlider.init({id: 'horizontal-slider'});
```
```javascript
HorizontalSlider.init({id: 'horizontal-slider', interval: 1000, timeout: 1000, leftButton: false, rightButton: false});
```