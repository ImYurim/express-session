module.exports = function (app){

    var authData={
        email:'yurim@naver.com',
        password:'1111',
        nickname:'yurim'
    }
      



    //passport - 무조건 session 밑에 작성해야함!
    var passport = require('passport')
    var LocalStrategy = require('passport-local').Strategy;
    app.use(passport.initialize());
    app.use(passport.session());

    //local-login 에서 받은 정보를 session store에 저장해줌
    passport.serializeUser(function(user, done) {
        console.log('this is serialize : ',user);
        done(null, user.email);
    });
    
    //각 페이지 들어갈때마다 보여지는 session
    passport.deserializeUser(function(id, done) {
        console.log('this is deserialize :',id);
        done(null, id);
    });
    
    
    
    passport.use('local-login',new LocalStrategy({
        usernameField:'email',
        passwordField:'password',
    }, function(email, password, done) {
        console.log(email);
        if(email===authData.email){
        if(password===authData.password){
            console.log('login success');
            return done(null,authData);
        }else{
            console.log('password error');
            return done(null, false,{
            message:'Incorrect password'
            });
        }
        }else{
        console.log('id error');
        return done(null,false,{message:'Incorrect username.'})
        }
    }
    ));

}

