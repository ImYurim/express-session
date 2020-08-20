var express = require('express');
var router = express.Router();
var session = require('express-session');
const { request } = require('../app');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

var authData={
  email:'yurim@naver.com',
  password:'1111',
  nickname:'yurim'
}

function authIsOwner(req,res){
  if(req.user){
    return true;
  }else{
    return false;
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('this is home: ', req.user);
  //req에 deserializeUser가 보낸 user 들어있음!
  // console.log(req.user);

  var isOwner = authIsOwner(req,res);
  var nickname = req.user;
  var userStatus = '로그인하기';
  if(isOwner){
    userStatus = '로그아웃하기';
    res.render('index', { title: 'To do list', userStatus:userStatus ,isOwner:isOwner, nickname:nickname});
  }else{
    nickname='로그인을 해주세요.'
    res.render('index', { title: 'To do list', userStatus:userStatus ,isOwner:isOwner,nickname:nickname});
  }


    
});





router.get('/loginform',function(req,res,next){
  var isOwner = authIsOwner(req,res);
  if(!isOwner){
    res.render('join/loginform');
  }else{
    req.session.destroy(function(err){
      res.redirect('/');
    })

  }

});

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


  router.post('/login',
  passport.authenticate('local-login', { 
    successRedirect: '/',
   failureRedirect: '/loginform' })
);


// router.post('/login',function(req,res,next){
//   if(req.body.myemail===authData.email && req.body.mypassword ===authData.password){
//     req.session.is_login=true;
//     req.session.nickname = authData.nickname;
//   }
//   else{
//     req.session.is_login=false;
//   }
//   req.session.save(function(err){
//     res.redirect('/');
//   });

// });





module.exports = router;

