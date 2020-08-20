## nodejs - express passport로 회원가입, 로그인 구현
- session을 이용한 passport local, google 로그인 회원가입 구현 중

## 시행착오
1. passport 모듈과 연결이 계속안됐었음 
- 안되던 이유 추측 
    -> app.js에서 passport 모듈을 사용함
    -> new LocalStrategy 생성할 때 사용할 strategy 이름 적어주는 부분에 'local'이라고 적어줬었음 (callback함수 실행안됨)
- 해결 방법
    -> routes에서 passport 모듈 사용함
    -> new LocalStrategy 생성시 사용할 strategy 이름을 'local-login' 과 'local-join'이라고 적어줌