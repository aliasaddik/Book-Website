var express = require('express');
var path = require('path');
var fs = require('fs');
var session = require('express-session') 
var cookieParser = require('cookie-parser');
var app = express();
//port number 
var PORT = process.env.port || 3000 ;

//session setup
app.use(cookieParser());
app.use(session({ 
    secret: 'Salmaaaa12132334', 
    resave: true,
    saveUninitialized: true,
})) ;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
///////////////////////////////////////////////////////////////////Milestone1
////////////////////////////////////////////////////////GetRequests
app.get('/', function(req,res){
  res.render('login' , {error: ""})
});

app.get('/registration', function(req,res){
  res.render('registration' , {error: "" })
});
app.get('/home', function(req,res){
  if (req.session.username && req.session.password){
  res.render('home');}
  else{
    res.redirect('/?error=you must login first');

  }
});
app.get('/novel', function(req,res){
  if (req.session.username && req.session.password){
    res.render('novel')}
    else{
      res.redirect('/?error=you must login first');
  
}});
app.get('/poetry', function(req,res){
  if (req.session.username && req.session.password){
    res.render('poetry')}
    else{
      res.redirect('/?error=you must login first');
  }
  });
app.get('/fiction', function(req,res){
  if (req.session.username && req.session.password){
  res.render('fiction')}
    else{
      res.redirect('/?error=you must login first');
  }
  });
app.get('/leaves', function(req,res){
  if (req.session.username && req.session.password){
    res.render('leaves',{error: "" })}
      else{
        res.redirect('/?error=you must login first');
    }
  
});
app.get('/sun', function(req,res){
  if (req.session.username && req.session.password){
    res.render('sun',{error: "" })}
      else{
        res.redirect('/?error=you must login first');
    }
  });
app.get('/dune', function(req,res){
  if (req.session.username && req.session.password){
    res.render('dune',{error: "" })}
      else{
        res.redirect('/?error=you must login first');
    }
  
});
app.get('/flies', function(req,res){
  if (req.session.username && req.session.password){
    res.render('flies',{error: "" })}
      else{
        res.redirect('/?error=you must login first');
    }
  
});
app.get('/grapes', function(req,res){
  if (req.session.username && req.session.password){
    res.render('grapes',{error: "" })}
      else{
        res.redirect('/?error=you must login first');
    }
  
});
app.get('/mockingbird', function(req,res){
  if (req.session.username && req.session.password){
    res.render('mockingbird',{error: "" })}
      else{
        res.redirect('/?error=you must login first');
    }
  });
app.get('/readlist', function(req,res){
  if (req.session.username && req.session.password){
    var readlist;
    var Data = fs.readFileSync('users.json');
    var dataString = Data.toString();
    var userslist = JSON.parse(dataString);
  for(i =0 ; i<userslist.length;i++){
      if(userslist[i].username==req.session.username && userslist[i].password==req.session.password){
        readlist= userslist[i].readlist;
      }
  }
  res.render('readlist',{
    readings : readlist 
  });}
      else{
         res.redirect('/?error=you must login first');
    }
  
});
app.get('/searchresults', function(req,res){
  if (req.session.username && req.session.password){
    res.render('searchresults',{searchres: "" })}
      else{
        res.redirect('/?error=you must login first');
    }
  
});

///////////////////////////////////////////////////////POSTLogin
app.post('/',function(req,res){
  //////////////saving session 
  user = req.body.username;
  pass = req.body.password;
  req.session.username = user;
  req.session.password = pass;
    var x = req.body.username ;
    var y = req.body.password ;
    if(fs.existsSync('users.json')){
    var o = fs.readFileSync("users.json");
    var p = JSON.parse(o);
    var count = 0 ;
    for( i = 0 ; i < p.length && count ==0 ; i++){
      count = 0 ;
      if(p[i].username == x && p[i].password == y){
        count++ ;
      }
      if(p[i].username == x && p[i].password != y){
        count = -1 ;
      }
   }
   if(count == 1){
    res.redirect('/home');
   }else
   if(count == 0)
   {
    res.render('login', {error: "username not found"});
   }else
   {
    res.render('login', {error: "incorrect password "});
   } 
}else {
  res.render('login', {error: "username not found"});
}
});
////////////////////////////////////////////PostRegister
app.post('/register',function(req,res){
  user = req.body.username;
  pass = req.body.password;
  req.session.username= user;
  req.session.password= pass;
  var x = req.body.username ;
  var y = req.body.password ;
  if(fs.existsSync('users.json')) {
    var o = fs.readFileSync("users.json");
    var count = 0 ;
    var p = JSON.parse(o);
    for( i = 0 ; i < p.length && count == 0 ; i++){
       count = 0 ;
       if(p[i].username == x){
         count++ ;
       }
    }
    if(count == 0){
      var a = {username: x , password: y , readlist: []} ;
      var o = fs.readFileSync("users.json");
      var c = JSON.parse(o);
      c.push(a);
      var b = JSON.stringify(c);
      fs.writeFileSync('users.json', b);
      res.redirect('/');
    }
    else{
      res.render('registration', {error: "username is already used"});
  }
}else{
  var arr1 = [] ;
    var a = {username: x , password: y , readlist:[]};
    arr1.push(a);
    var b = JSON.stringify(arr1);
    fs.writeFileSync('users.json', b);
     res.redirect('/');
}
});
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////milestone2
/////////////////////////////////////////////////////////////////////
app.post('/dune',function(req,res){
  if(req.session.username && req.session.password){
  var Data = fs.readFileSync('users.json');
  var dataString = Data.toString();
  var userslist = JSON.parse(dataString);
  for(i =0 ; i<userslist.length; i++){
    if (userslist[i].username==req.session.username && userslist[i].password==req.session.password){
      for(j =0 ; j<userslist[i].readlist.length;j++){
       if(userslist[i].readlist[j][0]=="/dune"){
        res.render('dune', {error: "Book already exists in your to read list !"});
        return;
      }
    } 
        userslist[i].readlist.push([req.url , "dune",'dune.jpg']);   
        fs.writeFileSync('users.json', JSON.stringify(userslist))
        res.redirect('readlist');
            return;
    }
  }}
});
app.post('/flies',function(req,res){
  var Data = fs.readFileSync('users.json');
  var dataString = Data.toString();
  var userslist = JSON.parse(dataString);
  for(i =0 ; i<userslist.length; i++){
    if (userslist[i].username==req.session.username && userslist[i].password==req.session.password){
      for(j =0 ; j<userslist[i].readlist.length;j++){
       if(userslist[i].readlist[j][0]=="/flies"){
        res.render('flies', {error: "Book already exists in your to read list !"});
        return;
      }
    } 
        userslist[i].readlist.push([req.url , "flies",'flies.jpg']);   
        fs.writeFileSync('users.json', JSON.stringify(userslist))
        res.redirect('readlist');
            return;
    }
  }
});
app.post('/grapes',function(req,res){
  var Data = fs.readFileSync('users.json');
  var dataString = Data.toString();
  var userslist = JSON.parse(dataString);
  for(i =0 ; i<userslist.length; i++){
    if (userslist[i].username==req.session.username && userslist[i].password==req.session.password){
      for(j =0 ; j<userslist[i].readlist.length;j++){
       if(userslist[i].readlist[j][0]=="/grapes"){
        res.render('grapes', {error: "Book already exists in your to read list !"});
        return;
      }
    } 
        userslist[i].readlist.push([req.url , "grapes",'grapes.jpg']);   
        fs.writeFileSync('users.json', JSON.stringify(userslist))
        res.redirect('readlist');
            return;
    }
  }
});
app.post('/leaves',function(req,res){
  var Data = fs.readFileSync('users.json');
  var dataString = Data.toString();
  var userslist = JSON.parse(dataString);
  for(i =0 ; i<userslist.length; i++){
    if (userslist[i].username==req.session.username && userslist[i].password==req.session.password){
      for(j =0 ; j<userslist[i].readlist.length;j++){
       if(userslist[i].readlist[j][0]=="/leaves"){
        res.render('leaves', {error: "Book already exists in your to read list !"});
        return;
      }
    } 
        userslist[i].readlist.push([req.url , "leaves",'leaves.jpg']);   
        fs.writeFileSync('users.json', JSON.stringify(userslist))
        res.redirect('readlist');
            return;
    }
  }
});
app.post('/mockingbird',function(req,res){
  var Data = fs.readFileSync('users.json');
  var userslist = JSON.parse(Data);
  for(i =0 ; i<userslist.length; i++){
    if (userslist[i].username==req.session.username && userslist[i].password==req.session.password){
      for(j =0 ; j<userslist[i].readlist.length;j++){
       if(userslist[i].readlist[j][0]=="/mockingbird"){
        res.render('mockingbird', {error: "Book already exists in your to read list !"});
        return;
      }
    } 
        userslist[i].readlist.push([req.url , "mockingbird",'mockingbird.jpg']);   
        fs.writeFileSync('users.json', JSON.stringify(userslist))
        res.redirect('readlist');
            return;
    }
  }
});
app.post('/sun',function(req,res){
  var Data = fs.readFileSync('users.json');
  var dataString = Data.toString();
  var userslist = JSON.parse(dataString);
  for(i =0 ; i<userslist.length; i++){
    if (userslist[i].username==req.session.username && userslist[i].password==req.session.password){
      for(j =0 ; j<userslist[i].readlist.length;j++){
       if(userslist[i].readlist[j][0]=="/sun"){
        res.render('sun', {error: "Book already exists in your to read list !"});
        return;
      }
    } 
        userslist[i].readlist.push([req.url, "sun",'sun.jpg']);   
        fs.writeFileSync('users.json', JSON.stringify(userslist))
        res.redirect('readlist');
            return;
    }
  }
});
//////////////////////////////////////////////search
app.post('/search',function(req,res){
  req.session.Search= req.body.Search;
  var s = req.session.Search;
  //console.log(s);
  var ss = s.toLowerCase();
  var books =[ {
    name :'dune',
    url : '/dune',
    image :'dune.jpg' 
  }, 
  { name : 'lord of the flies',
    url : '/flies',
    image : 'flies.jpg'
  },
  { name : 'the grapes of wrath', 
    url : 'grapes',
    image : 'grapes.jpg'
  },
  { name : 'leaves of grass', 
    url : '/leaves',
    image :'leaves.jpg'
  },
  { name : 'to kill a mockingbird', 
  url : '/mockingbird',
  image :'mockingbird.jpg'
  },
  {name :'the sun and her flowers', 
  url : '/sun',
  image :'sun.jpg'
  }
];
  var result = filterIt(books,ss);
  if(result.length==0){
    result.push({name : 'Book not found'
  ,url:'/home',
image : 'not-found.jpg'})
  }
  res.render('searchresults', {searchres: result});
});
function filterIt(arr, searchKey) {
  return arr.filter(function(obj) {
    return Object.keys(obj).some(function(key) {
      return obj[key].includes(searchKey);
    })
  });
}



 if (process.env.PORT){
   app.listen(process.env.PORT,function(){console.log('server started')});
 }
 else
 {
   app.listen(3000,function(){console.log('server started on port 3000')});
 }
