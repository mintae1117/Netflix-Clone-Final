# Netflix Clone Coding. <br> Link : [바로가기](https://minflix-master.vercel.app)

<h3>Netflix clone coding challenge in nomadcoder.<br>
리액트 마스터 클래스 챌린지 결과물 입니다.</h3>

## 📷 각 페이지별 화면 사진.
![](https://velog.velcdn.com/images/mintae1117/post/a830f6b2-56e6-43b0-8b8d-d0bb1c9d1e12/image.png)
![](https://velog.velcdn.com/images/mintae1117/post/301f30a8-7f6c-4f14-a62b-7e958448f207/image.png)
![](https://velog.velcdn.com/images/mintae1117/post/dc5048d9-34f5-4f8d-aaf9-d1e24ea39a2d/image.png)
![](https://velog.velcdn.com/images/mintae1117/post/3349b6f5-e341-456c-a7d0-ef8620612ea8/image.png)

<br>

## 💻 사용 기술.

- `React.js`, `Typescript`, `Javascript`
- `React-Router-Dom`, `React-hook-form`, `React-query`, `Recoil`, `Styled-components`
- `framer-motion`, `react-type-animation`, `Vite`, `Themoviedb`
- Deploy : `Github-gh-pages`
- Later Edit Deploy : `Vercel`

<br>

## 😄 사용 가능한 기능, 디자인 설명.
<p>1. 디자인 : 디자인은 제가 넷플릭스를 안봐서 최대한 넷플릭스 느낌이 나되 중간중간 제가 넣고싶은 디자인대로 했습니다. 이 프로젝트에서는 다른것 보다 framer-motion 과 다양한 react-hook 들로 animation을 만들어 보는 좋은 경험이 되었던 것 같습니다. slider, banner, text-animation까지 모두 개인적으로 디자인 했습니다.</p>
<p>2. 헤더(navbar or header) : 헤더는 간단한 framer-motion을 이용한 animation을 보여주는 netflix 로고와 framer-motion을 이용한 router위치를 알려주는 animation menu를 만들었습니다. 그리고 클릭에 반응하여 펼쳐지고 접히는 search-bar 도 만들었고 검색을 하게되면 keyword 검색결과에 해당하는 /search 페이지로 이동하게 됩니다.</p>
<p>3. 홈(movie) 페이지 : 홈페이지는 movie들을 보여주는 페이지 입니다. 모두 now playing, top rated, up comming 카테고리에 해당하는 영화들을 배너와 슬라이더로 보여주고 다양한 framer-motion을 이용한 animation도 들어가 있습니다. 영화 slider 또는 banner 를 누르면 각 영화의 상세 페이지를 modal 형태로 보여주며 다양한 상세 정보들을 보여줍니다.</p>
<p>4. 티비(tv shows) 페이지 : 티비 페이지는 홈(movie) 페이지와 별반 다르지 않습니다. 다만 홈페이지에 있던 영화들이 tv show로 바뀌었습니다. 각각 popular, toprated, airing today의 카테고리에 해당하는 티비쇼 정보들을 보여줍니다. react-query를 이용하여 themoviedb-api를 공부할 수 있었던 좋은 경험 이었습니다.</p>
<p>5. 검색결과(search) 페이지 : 검색결과 페이지 에서는 일단 검색한 keyword를 react-type-animation을 이용해 이쁘게 보여줍니다. 그리고 아래에는 각각 검색 결과에 해당하는 movie, tv shows 들을 slider로 보여줍니다. 각 slider 들은 검색된 결과 양에 해당하는 만큼의 index page를 갖게되며 그만큼만 페이지를 넘길 수 있고 다넘기게 되면 처음으로 돌아옵니다. 이 slider 또한 framer-motion을 사용하여 animation을 넣었습니다. 그리고 마지막으로 검색 결과가 있다면 검색결과의 수를 title 옆에 보여주도록 하였습니다.</p>
<p>6. Footer and etc : 간단한 footer를 만들었습니다. 제 이름을 클릭하게 되면 제 github-repository로 이동합니다. utils.ts에서 검색되지 않는 img들에 대한 path는 저장된 "없는 이미지입니다".png로 대체됩니다. 그리고 그외에 movie-api, vite, 여러가지 react-hook들을 경험하며 재밌는 기능들을 많이 사용해 봤던 프로젝트인 것 같습니다.</p>

## 2024.04.16 ~ 2024.04.22 요약
<details>
<summary>내용 펼치기</summary>

## 2024 / 04 / 16 겪은 어려움과 해결방법.
<p>vite project 를 gh-pages로 배포할때 주의점!
<p>1. 원래 배포와는 다르다. "deploy": "gh-pages -d dist" 처럼 실행 시킬때 쓰는 명령어에 차이가 있다.
<p>2. vite.config.ts에 base 설정을 해줘야한다. 그렇지 않으면 깃헙에서 배포할때 파일을 읽지 못한다.
<p>3. base 설정해준 repository 이름과 router에 설정된 base 이름을 맞춰줘야한다. 즉 router에 path:"/"이런 식으로 된 애들
그리고 link 또는 navigate, usematch 등 모든 router 가 쓰인 부분에서 base 를 "/repository-name/"으로 맞춰줘야 한다.

## 2024 / 04 / 17 겪은 어려움과 해결방법.
<p>framer motion AnimatePresence 의 layoutid를 맞춰줘야 animation이 작동한다.
<p>이때 서로 다른 layoutid를 가지지 않으면 animation 에서 버그가 난다. 이미지들이 서로 엉키거나 겹쳐지면서 움직인다.
<p>이를 방지하기 위해선 서로 같은 ID를 가지고 있더라도 서로 다른 category에 존재한다는 점을 이용해 route를 바꿔준다.
<p>예를 들면 movies/id => movies/toprated/id 로 바꿔주고 layoutid를 설정 함으로써 animation이 해결된다.

## 2024 / 04 / 19 겪은 어려움과 해결방법.
<p>https://www.themoviedb.org/ 의 api 제공 방식이 바뀌었다.
<p>이제 특정 양식을 제출해야만 api key 를 받을수가 있다. 그리고 api키가 예전에 만들었던 것이라면 api가 정상적으로 호출이 안된다.
<p>새로운 프로젝트 양식을 제출하고 api key를 새로 받아서 코딩을 하였더니 정상적으로 api가 호출 되었다.
check

## 2024 / 04 / 20 겪은 어려움과 해결방법.
<p>gh-pages로 즉 github로 배포를 하게되면 hashrouter를 쓰지 않는 이상 404 페이지가 뜨도록 돼있다.
<p>이것은 추후에 배포 수단을 깃헙이 아닌 다른것으로 바꾸면 되기 때문에 크게 신경쓰지 않아도 될듯 하다.
<p>그리고 search 에서 movie 와 tv 결과들을 보여줄때 서로 다른 animatepresence를 써주는것이 좋다.
<p>괜히 같이 써보려다가 error만 더 나게된다.
<p>마지막으로 router에 관련된 값들을 정확하게 맞춰줘야 api를 불러올때도 error가 안난다. 조심하자.

## 2024 / 04 / 22 마무리.
<p>배포를 gh-pages에서 vercel deploy로 변경했습니다. 변경하는 과정에서 새로고침 했을때 404 error 가 뜨는 문제점을 고치기 위해 vercel.json 파일을 추가해서 rewrite destination을 지정해줌으로써 404 error 버그를 고쳤습니다.
<p>약간의 css 수정과 react-type-animation 추가, 그리고 react-query 충돌 버그 수정 등 찾아낸 error,bug등을 고치고 디자인 조금 바꾸면서 마무리 했습니다.
test.

## 2024 / 05~ (취업 준비로 인해 부진)
<p>UI 닦으면서 여러가지 버그들 에러들 ui적으로 불편한 부분들 수정 및 기능 추가.(ex. text animation, search modal auto close, drag bar delete, etc...)

</details>

## 2024 / 07 / 19 (리액트 스터디 진행중 TA 정훈님 조언 참고해서 리팩토링 시작.)
<p>api가 갑자기 연동이 안되길래 봤더니 내가 해놓은 짓거리들을 다시 확인할 수 있어서 다행이었다. 짧은 시간이었지만 많은 공부들을 하면서 확실히 내가 많이 성장했구나를 느꼈다... 민플릭스... 이게 사람이 짠 코드란 말인가... 진짜 엉망 그자체다... api 불러오는 것만 봐도 그렇다 경로 설정 하나 제대로 해놓지 않았는데 api 가 불러 와졌던게 기적이다. 일단 수정은 했지만 주말동안 리팩토링 하자. 쫌 멋진 코드로 섹시한 프로젝트로 바꿔보자.

## 2024 / 07 / 20 ~ 21
<p>1. api 가 불러오지 못하는 내용들(특히 detail data)들에 관한 예외처리 해주기.
<p>2. 불필요한 api 요청 코드 부분 로직 수정하기 및 기타 버그들 수정하기(frammer motion animation).
<p>3. 컴포넌트 난잡한데 최대한 가독성 있게 재활용성 있게 바꾸기.
<p>4. Trailers page 추가하기 video 요청시 가져오는 20개 가량의 배열에 있는 key 값들중 하나만 써서 보여주던 trailer를 모두 보여주는 화면을 구현해보자.
<p>5. Trailers css gird 에 반응형 추가해보기 => width 별로 grid 조절해서 구현.
<p>6. 그외 로고 변경, trailer title css 변경 등등 여러가지 추가 refactor 진행.
trailer 불러오는 로딩속도 개선 미흠, trailers 애도 framer motion 추가했음 좋았을듯 함, 반응형 css 구현 못했다.