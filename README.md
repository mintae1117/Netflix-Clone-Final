# link : [바로가기](https://mintae1117.github.io/Netflix-Clone-Final/)

## 0417 겪은 어려움과 해결방법.
<p>vite project 를 gh-pages로 배포할때 주의점!
<p>1. 원래 배포와는 다르다. "deploy": "gh-pages -d dist" 처럼 실행 시킬때 쓰는 명령어에 차이가 있다.
<p>2. vite.config.ts에 base 설정을 해줘야한다. 그렇지 않으면 깃헙에서 배포할때 파일을 읽지 못한다.
<p>3. base 설정해준 repository 이름과 router에 설정된 base 이름을 맞춰줘야한다. 즉 router에 path:"/"이런 식으로 된 애들
그리고 link 또는 navigate, usematch 등 모든 router 가 쓰인 부분에서 base 를 "/repository-name/"으로 맞춰줘야 한다.

## 0418 겪은 어려움과 해결방법.
<p>framer motion AnimatePresence 의 layoutid를 맞춰줘야 animation이 작동한다.
<p>이때 서로 다른 layoutid를 가지지 않으면 animation 에서 버그가 난다. 이미지들이 서로 엉키거나 겹쳐지면서 움직인다.
<p>이를 방지하기 위해선 서로 같은 ID를 가지고 있더라도 서로 다른 category에 존재한다는 점을 이용해 route를 바꿔준다.
<p>예를 들면 movies/id => movies/toprated/id 로 바꿔주고 layoutid를 설정 함으로써 animation이 해결된다.

## 0419 겪은 어려움과 해결방법.
<p>https://www.themoviedb.org/ 의 api 제공 방식이 바뀌었다.
<p>이제 특정 양식을 제출해야만 api key 를 받을수가 있다. 그리고 api키가 예전에 만들었던 것이라면 api가 정상적으로 호출이 안된다.
<p>새로운 프로젝트 양식을 제출하고 api key를 새로 받아서 코딩을 하였더니 정상적으로 api가 호출 되었다.