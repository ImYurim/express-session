## 자세한 설명 tistory 참고
https://yulme.tistory.com/83

## nodejs - express passport로 회원가입, 로그인 구현
- session을 이용한 passport local, google 로그인 회원가입 구현


## 현재 진행 사항(진행중)
- bcrypt이용한 join, login



## 현재 진행 사항(완료)
- passport의 local strategy를 이용해 로그인 후 session에 로그인 정보 저장후 메인 페이지에 로그인, 로그아웃 반영 완료
- passport flash 메세지 뜨게 하는 것 완료 (한번만 뜨게하고 없애기)
- mongodb 연결 완료
- user model 정의 완료
- join 후 바로 로그인 되게 하기 완료


## 해야할 것
- '' (비밀번호 암호화 bcrypt) 로그인 구현
- passport로 google-login, join 구현
- join 할 때 빈칸 입력 시 안된다고 알림 (js 공부필요!!)


## 시행착오
1. passport 모듈과 연결이 계속안됐었음 
- 안되던 이유 추측 
    -> app.js에서 passport 모듈을 사용함
    -> new LocalStrategy 생성할 때 사용할 strategy 이름 적어주는 부분에 'local'이라고 적어줬었음 (callback함수 실행안됨)

- 해결 방법
    -> routes에서 passport 모듈 사용함
    -> new LocalStrategy 생성시 사용할 strategy 이름을 'local-login' 과 'local-join'이라고 적어줌
    -> local-join은 따로 정의해줄 필요 없어 보임! 