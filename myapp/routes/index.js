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
  if(req.session.is_login){
    return true;
  }else{
    return false;
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  var isOwner = authIsOwner(req,res);
  var nickname = req.session.nickname;
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

passport.use('local-login',new LocalStrategy({
  usernameField:'email',
  passwordField:'password',
}, function(email,password,done){
    console.log('local-login callback called');
    done(null,email);
  }
  ))

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

