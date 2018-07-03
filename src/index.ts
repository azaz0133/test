var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors())
// app.use(express.static(path.resolve(__dirname,'..',"build")))
const eventpath = '../routes/Event/'
const articlepath = '../routes/Article/'
const authenpath = '../routes/Authen/'
const gallery='../routes/Gallery/'
const slidepath='../routes/Slide/'

app.use('/slide',require('../routes/slidesRoutes'))
app.use('/api/v1/user',require('../routes/usersRoutes'))
app.use('/api/v1/event',require('../routes/eventRoutes'))
app.use('/api/v1/role',require('../routes/rolesRoutes'))
app.use('/api/v1/tag',require('../routes/tagsRoutes'))
app.use('/api/v1/gallery',require('../routes/galleriesRoutes'))
app.use('/api/v1/permission',require('../routes/permissionsRoutes'))
app.use('/article',require('../routes/articlesRoutes'))
app.use('/api/v1/regisevent',require('../routes/userAndEvents'))
app.use('/api/v1/loginRoute',require('../routes/loginRoutes'))
app.use('/register',require('../routes/regisEvent'))
app.use('/event',require('../routes/eventShow'))
// app.use('/api/v1/articlewithevent',require('../routes/relationEventArticle'))
// app.get('*',(req,res)=>{
//   res.sendFile(path.resolve(__dirname,'..','build','index.html'))

// })

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

app.listen(9000,()=>{
    console.log("===========ready==============")
})
