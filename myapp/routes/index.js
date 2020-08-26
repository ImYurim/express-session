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

router.post('/join',function(req,res,next){
  console.log(req.body);
  var email = req.body.email;
  var password1 = req.body.password1;
  var password2 = req.body.password2;
  var nickname = req.body.nickname;
  // if (!email){
  //   console.log('id error');
  //   req.flash('error','아이디를 입력하세요.');
  //   res.redirect('/joinform');
  // }else{
  //   User.findOne({email:email},function(err,user){
  //     if(err){
  //       return next(err);
  //     }
  //     if(user){
  //       req.flash('사용자가 이미 있습니다.');
  //       return res.redirect('/joinform');
  //     }
  //   })
  // }
  // if (!password1){
  //   console.log('password1 error');
  //   req.flash('error','비밀번호를 입력하세요.');
  //   res.redirect('/joinform');
  // }
  // if (!password2){
  //   console.log('password2 error');
  //   req.flash('error','비밀번호 확인란을 채워주세요.');
  //   res.redirect('/joinform');
  // }
  // if(password1!==password2){
  //   //비밀번호1과 2가 같지 않을 때
  //   console.log('password correct error');
  // }
  var user = new User({
    nickname : req.body.nickname,
    password : req.body.password1,
    email : req.body.email,
  });
  //var user = new User(req.body);

  console.log(user);
  user.save(function(err,user){
    if(err){
      console.log(err);
      res.redirect('/joinform');
    }else{
      console.log('saved successfully');
      res.redirect('/');
    }
  })
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

