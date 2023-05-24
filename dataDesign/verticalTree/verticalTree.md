### verticalTree


<font size="2">
수직 방향의 Tree 여닫이 트리 구조
<hr/>

#### HOW TO USE
1. verticalTree를 생성할 부모 객체 생성

```html
<div id="tree-con"></div>
```
<br>

2. VerticalTree Class의 init 메서드 호출
    - id : HTML Node ID
    - data : 구성되는 data, Object 배열

```javascript
VerticalTree.init('tree-con', data);
```
<br>

#### Data 구조
  - VerticalTree를 구성할 data
    - id : item 고유 ID
    - title : item에 표시할 title
    - children : 내부 menu가 있는 경우 추가
~~~javascript
const data = [
  { id: 'menu_001', title: 'menu_001', children: [
    { id: 'menu_101', title: 'menu_101', children: [
      { id: 'menu_201', title: 'menu_201', children: [
        { id: 'menu_301', title: 'menu_301' },
        { id: 'menu_302', title: 'menu_302' },
        { id: 'menu_303', title: 'menu_303' },
      ] }
    ] },
    { id: 'menu_102', title: 'menu_102' },
    { id: 'menu_103', title: 'menu_103' },
  ] },
  { id: 'menu_002', title: 'menu_002' },
  { id: 'menu_003', title: 'menu_003' },
];
~~~