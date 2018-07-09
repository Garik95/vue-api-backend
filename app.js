var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var port = process.env.PORT;
var cors = require('cors');
var session = require('express-session')

app.use(cors());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   extended: true
// }));

app.use(express.json());

var sess = {
  secret: 'keyboard cat',
  cookie: {}
}
 
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
 
app.use(session(sess));

app.post('/posts', function (req, res) {
   
  console.log(req.body);
  if(req.body.login == '1234'){
  	res.json({status:"ok",token:req.sessionID});}
  else
	res.json({status:"nok"});
});

app.get('/', function(req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    console.log(req.sessionID);
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
});

/*app.options('/*', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
});*/

app.listen(8888, function () {
  console.log('Example app listening on port ' + port + '!');
});