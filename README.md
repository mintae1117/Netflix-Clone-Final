# Netflix Clone Coding <br> Link : [바로가기](https://mintae1117.github.io/Netflix-Clone-Final/)

<h3>Netflix clone coding challenge in nomadcoder.<br>
리액트 마스터 클래스 챌린지 결과물 입니다.</h3>

<br>

## 📷 각 페이지별 화면 사진.
![](https://velog.velcdn.com/images/mintae1117/post/a830f6b2-56e6-43b0-8b8d-d0bb1c9d1e12/image.png)
![](https://velog.velcdn.com/images/mintae1117/post/301f30a8-7f6c-4f14-a62b-7e958448f207/image.png)
![](https://velog.velcdn.com/images/mintae1117/post/dc5048d9-34f5-4f8d-aaf9-d1e24ea39a2d/image.png)
![](https://velog.velcdn.com/images/mintae1117/post/3349b6f5-e341-456c-a7d0-ef8620612ea8/image.png)

<br>

## 💻 사용 기술.

- `React.js`, `Typescript`, `Javascript`
- `React-Router-Dom`, `React-hook-form`, `framer-motion`, `Recoil`, `Styled-components`
- `React-query`, `framer-motion`, `Styled-components`, `react-type-animation`, `Vite`, `themoviedb`
- Deploy : `gh-pages`

<br>

## 😄 사용 가능한 기능, 디자인 설명.
<p>1. aaa</p>
<p>2. bbb</p>
<p>react type animation.</p>


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
check

## 0420 겪은 어려움과 해결방법.
<p>gh-pages로 즉 github로 배포를 하게되면 hashrouter를 쓰지 않는 이상 404 페이지가 뜨도록 돼있다.
<p>이것은 추후에 배포 수단을 깃헙이 아닌 다른것으로 바꾸면 되기 때문에 크게 신경쓰지 않아도 될듯 하다.
<p>그리고 search 에서 movie 와 tv 결과들을 보여줄때 서로 다른 animatepresence를 써주는것이 좋다.
<p>괜히 같이 써보려다가 error만 더 나게된다.
<p>마지막으로 router에 관련된 값들을 정확하게 맞춰줘야 api를 불러올때도 error가 안난다. 조심하자.
