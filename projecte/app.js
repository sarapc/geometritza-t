var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs')
var https = require('https')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require('express-fileUpload');
var socol = require('socket.io');
var cors = require('cors');

var rutes = require('./routes/index');

var app = express();
app.use(cors());

var server = https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(4000, function () {
  console.log('Servidor escoltant pel port 4000');
});

var io = socol(server);

io.on('connection', function (client) {

  client.on('llista2', llista2);

  function llista2(){
    fs.readdir('./public/models3d', (err, files) => {
      client.emit('retornLlista2', JSON.stringify({ "llista": files }));
    });    
  }

});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

app.get('/', rutes.index);
app.get('/model', rutes.model);
app.get('/model3D', rutes.model3D);
app.get('/associacio', rutes.associacio);
app.get('/camera', rutes.camera);
app.get('/ajuda', rutes.ajuda);
app.get('/jmodel', rutes.jmodel);
app.get('/jmodel3D', rutes.jmodel3D);
app.get('/jassociacio', rutes.jassociacio);
app.get('/jcamera', rutes.jcamera);
app.get('/cindex', rutes.cindex);
app.get('/fons', rutes.fons);
app.get('/logo', rutes.logo);
app.get('/cub', rutes.cub);
app.get('/esfera', rutes.esfera);
app.get('/tetraedre', rutes.tetraedre);

app.post('/puja', async function(req,res){
  req.files.fitxer.mv(__dirname + '/public/models3d/' + req.files.fitxer.name);
  res.send('<script>alert("Fitxer pujat correctament"); window.location.href = "/model3D"; </script>');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
