## 자세한 설명 tistory 참고
https://yulme.tistory.com/83

## nodejs - express passport로 회원가입, 로그인 구현
- session을 이용한 passport local, google 로그인 회원가입 구현

## 현재 진행 사항
- passport의 local strategy를 이용해 로그인 후 session에 로그인 정보 저장후 메인 페이지에 로그인, 로그아웃 반영 완료
- passport flash 메세지 뜨게 하는 것 진행중 (한번만 뜨게하고 없애기)

## 해야할 것
- MongoDB 연결 후 로그인 구현
- passport로 local-join 구현
- passport로 google-login, join 구현

## 시행착오
1. passport 모듈과 연결이 계속안됐었음 
- 안되던 이유 추측 
    -> app.js에서 passport 모듈을 사용함
    -> new LocalStrategy 생성할 때 사용할 strategy 이름 적어주는 부분에 'local'이라고 적어줬었음 (callback함수 실행안됨)
- 해결 방법
    -> routes에서 passport 모듈 사용함
    -> new LocalStrategy 생성시 사용할 strategy 이름을 'local-login' 과 'local-join'이라고 적어줌