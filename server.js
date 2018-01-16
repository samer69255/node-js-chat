var express = require('express');
var http = require('http');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const fs = require("fs");


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
try {
var state = fs.readFileSync('appstate.json', 'utf8');
 state = {appState:JSON.parse(state)}

}
catch(e) {
  state = null;
}

state = state || {email: "u3u4r@cocovpn.com", password: "1222345"}
//console.log(state);
login(state, (err, api) => {
    if(err) {

    	setTimeout(run,5000);
    	return console.error(err);
    }


    fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
 
    api.listen((err, message) => {
      if (err) return console.log(err);
        //api.sendMessage(message.body, message.threadID);
        if (message.senderID == '100004711681483') {
        	//console.log(message);
        	//var c = message.body.match(/^c:([\w\W]+)/);
          var mess = message.body.trim().split(' ');
        	var cmd = mess[0];
           mess.shift();
          mess = mess || [];
  
        	if (cmd)
        	{
        		
        		
        		var res;

        	var cms = {
          };

            cms.re = function () {
              return mess[0];
            }

            cms.random = function () {
              makeid(mess,v[1]);
            }

            if (cms[cmd])
            {
              res = cms[cmd]();
            }
            else {
              res = "لم يتعرف على الامر";
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

function makeid(chr,l) {
  var text = "";
  var possible = chr || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < (l || 8); i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}