### scrollEvnet


<font size="2">
스크롤 비율에 따라 스타일, class를 적용할 수 있다.

<br/>

```javascript
window.onload = () => {
  const eventObj = new ScrollEvent();
  eventObj.addScrollEvent({id: 'item001', style: 'opacity', startRatio: 0.6, endRatio: 0.7, startValue: 0, endValue: 1});
}
```
<font size="1"><span style="color: #aaa">위 코드는 id가 item001인 요소의 opacity를 변경하는 코드</span></font>

<hr/>

#### HOW TO USE
1. scroll event를 적용할 section에 scroll-section 지정

```html
<section id="section001" class="scroll-section">...
</section>
<section id="section002" class="scroll-section">...</section>
```
<br>

2. Event Object 선언

```javascript
  const eventObj = new ScrollEvent();
```
<br>

 3. 사용 용도에 따라 이벤트 적용

  - addScrollEvent
    - id : HTML Node ID
    - style : 적용할 style name
    - startRatio : 스타일 적용을 시작할 스크롤 비율
    - endRatio : 스타일 적용을 끝낼 스크롤 비율
    - startValue : 시작 스타일 값
    - endValue : 종료 스타일 값
    - suffix : 단위 (필요시에만 입력, ex: 'px')
  ```javascript
    eventObj.addScrollEvent({id: 'item001', style: 'opacity', startRatio: 0.1, endRatio: 0.2, startValue: 0, endValue: 1})
  ```
  <br/>

  - addScrollEventTransform
    - id : HTML Node ID
    - transformStyle: {style, startValue, endValue, suffix} 형태의 transform 스타일 배열, suffix는 필요시에만 입력
    - startRatio : 스타일 적용을 시작할 스크롤 비율
    - endRatio : 스타일 적용을 끝낼 스크롤 비율
  ```javascript
    eventObj.addScrollEventTransform({id: 'item001', transformStyle: [
      {style: 'scale', startValue: 1, endValue: 2 },
      {style: 'translate', startValue: 0, endValue: 200, suffix: 'px' },
    ], startRatio: 0.5, endRatio: 0.6});
  ```
  <br/>

  - addScrollClass
    - id : HTML Node ID
    - classList: 추가하고 싶은 class 배열
    - startRatio : 클래스를 추가할 스크롤 비율
    - endRatio : 클래스를 제거할 스크롤 비율, 미지정시 계속 남아 있음
  ```javascript
    eventObj.addScrollClass({id: 'item001', classList: ['item-active'], startRatio: 0.5, endRatio: 1})
  ```