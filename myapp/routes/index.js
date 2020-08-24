var express = require('express');
var router = express.Router();
var session = require('express-session');
const { request } = require('../app');
var passport = require('passport');
var flash = require('connect-flash');
const User = require("../models/user");

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
  var email = req.user;
  var userStatus = '로그인하기';
  if(isOwner){
    userStatus = '로그아웃하기';
    res.render('index', { title: 'To do list', userStatus:userStatus ,isOwner:isOwner, email:email});
  }else{
    email='로그인을 해주세요.'
    res.render('index', { title: 'To do list', userStatus:userStatus ,isOwner:isOwner,email:email});
  }


    
});





router.get('/loginform',function(req,res,next){
  var isOwner = authIsOwner(req,res);
  var flash = req.flash();
  console.log(flash);
  var feedback = '';
  if(flash.error){
    feedback = flash.error[0];
  }

  if(!isOwner){
    res.render('join/loginform',{feedback : feedback});
  }else{
    req.logout();
    // req.session.destroy(function(err){
    //   res.redirect('/');
    // })
    req.session.save(function(err){
      res.redirect('/');
    })


  }

});



// 여기서 passport.authenticate 는 passport.js를 사용하는게 아니고 passport모듈을 직접 사용해야함
  router.post('/login',
  passport.authenticate('local-login', { 
    successRedirect: '/',
    failureRedirect: '/loginform',
    failureFlash : true })
);


router.get('/joinform', function(req,res){
  res.render('join/joinform');
})

router.post('/join',function(req,res){
  var email = req.body.email;
  var password1 = req.body.password1;
  var password2 = req.body.password2;
  var nickname = req.body.nickname;
  if (!email){
    req.flash('error','아이디를 입력하세요.');
    res.redirect('/joinform');
  }else{
    //아이디를 입력했을 경우 , db에 중복되는 아이디 있는지 확인
  }
  if (!password1){
    req.flash('error','비밀번호를 입력하세요.');
    res.redirect('/joinform');
  }
  if (!password2){
    req.flash('error','비밀번호 확인란을 채워주세요.');
    res.redirect('/joinform');
  }
  if(password1!==password2){
    //비밀번호1과 2가 같지 않을 때
  }
  var user = new User({
    name : req.body.username,
    password : req.body.userpassword,
    userid : req.body.userid,
    age : req.body.userage
  });

  User.create(user,function(err,user){
    if(err){
      console.error(err);
      res.status(404).send({
          message: err 
      });                 
  }

  else{
    console.log("register user success");  
    res.status(300).send({
        message:"register success"
    });
  }

  })


  console.log(email,password1,password2,nickname);
  res.send(email);
})


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

