# 무한스크롤 구현

## 구현사항

### fetch 비동기

async, await란?

- Promise를 통해 비동기 처리를 하는 방법도 있지만, Promist의 단점을 해결하기 위해 ES7(ES2017)에서 async, await 키워드가 추가되었다.
- callback 이나 promise와 같이 비동기 코드를 작성하는 새로운 방법이다.

### JSONplace holder

온라인에서 뼐도의 키값 없이도 연습용으로 REST API를 제공하는 사이트인 JSON placeholder를 사용해 데이터를 가져옴.

### IntersectionObserver

Scroll Event의 문제점
scroll event는 단시간에 수백번, 수천번 호출될 수 있고, 동기적으로 실행되기 때문에 메인 스레드에 영향을 준다고 한다. 또한 한 페이지 내에서 여러 scroll event( 무한스크롤, 광고배너, 애니메이션)가 등록되있을 경우, 각 엘리먼트마다 이벤트가 등록되어 있기 때문에 사용자가 스크롤할 때 마다 이를 감지하는 이벤트가 끊임없이 호출된다.

이러한 문제들을 IntersectionOberver API를 사용하면 위와 같은 문제를 해결할 수 있다. 결과적으로, 비동기적으로 실행되기 때문에 메인 스레드에 영향을 주지 않으면서 변경사항을 관찰할 수 있다.

- isIntersecting 프로퍼티는 target element가 교차영역에 있따면 true를 반환하고, 아니라면 false를 반환한다.
- threshold
  - default : 0
  - observer의 콜백이 실행될 대상 요소의 가시성 %를 나타내는 단일 숫자 혹은 숫자 배열이다. 만일 50%만큼 요소가 보여졌을 때를 탐지하고 싶다면, 값을 0.5로 설정하면 된다.
  - threshold : 1 은 pageEnd의 ref요소가 있는 div태그 전체가 보여야만 콜백함수를 실행시킨다는 말이다.

### useRef

- JavaScript를 사용할 때에는, 우리가 특정 DOM을 선태갷야 하는 상황에 getElementById,querySelector 같은 DOM Selector 함수를 사용해서 DOM을 선택한다.
- 리액트를 사용하는 프로젝트에서도 가끔씩 DOM을 직접 선택해야 하는 상황이 발생 할 때도 있다. 예를들어서 특정 엘리먼트의 크기를 가져와야한다던지, 스크롤의 위치를 가져오거나 설정해야된다던지, 또는 포커스를 설정해야된다던지 등등의 정말 다양한 상황이 있다.
  이럴 때 , Ref를 사용한다.
- 함수형 컴포넌트에서 Ref를 사용할 때에는 useRef라는 Hook 함수를 사용한다.
- useRef()를 사용하여 Ref 객체를 만들고, 선택하고 싶은 DOM에 ref 값으로 설정Ref 객체의 .current 값은 선택한 DOM을 가리킨다.

### setState 시 이전 state 값 사용

setState(prev => ({...prev, number:"1"}))
