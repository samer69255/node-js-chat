var express = require('express');
var http = require('http');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var port = (process.env.PORT || '8000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}


app.get('/',function (req,res) {
	res.send('hi');
});

app.use(function (req,res) {
	res.send('not found');
});



const login = require("facebook-chat-api");
 
 function run() {
 
// Create simple echo bot 
console.log('login ...');
login({email: "jack.jimmy.923519", password: "1222345"}, (err, api) => {
    if(err) {

    	setTimeout(run,1000);
    	return console.error(err);
    }
 
    api.listen((err, message) => {
        //api.sendMessage(message.body, message.threadID);
        if (message.senderID == '100004711681483') {
        	//console.log(message);
        	//var c = message.body.match(/^c:([\w\W]+)/);
        	var cmd = message.body.match(/^([\w\W]+):([\w\W\b+-]+)/);
  
        	if (cmd)
        	{
        		var v = cmd[2];
        		cmd = cmd[1];
        		
        		var res;

        		if (cmd == 'sub')
        		{
        			res = (v);
        		}
        		else if (cmd == 'getEmail')
        		{
        			var em = extractEmails(v);
        			res = v.join('\n');
        		}

        		else if (cmd == 'random')
        		{
        			if (v.length < 1 || v == '~')
        				var v = undefined;
        			res = makeid(v);
        		}


        		else {
        			res = v;
      
        		}

        		api.sendMessage(res, message.threadID);
        	}
        	
        }
    });
});


 }

 run();

function extractEmails (text)
{
    return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}

function makeid(chr) {
  var text = "";
  var possible = chr || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}