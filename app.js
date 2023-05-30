// WhatTheSocket

// var app = require("express")();
// var http = require("http").createServer(app);
// var io = require('socket.io')(http);

// var port = 3000;

// io.on('connection', function (socket) { // 클라이언트 연결되면
//   console.log('👤', socket.id, 'Connected'); // 연결됨을 콘솔에 출력
//   var id_message = {
//     id: `${socket.id} - ME`
//   }
//   socket.emit('check_con', id_message);

//   socket.on('msg', function (data) {
//     // 클라이언트에게 msg가 emit되면 실행
//     console.log(socket.id, data);

//     console.log("----------------------------");
//     console.log('id: ', data.id);
//     console.log('user: ', data.user);
//     console.log('msg: ', data.message);
//     console.log("----------------------------");
//     var message = {
//       msg1: `${data.id} - U`,
//       msg2: `👤 ${data.user}`,
//       msg3: `${data.message} 💬`
//     }
//     socket.emit('msg_to_client', message); // 클라이언트로 메시지 전송
//   });
//   socket.on('disconnect', function () { // 클라이언트 연결 끊어지면 자동 실행
//     console.log('❌', socket.id, 'disconnected');
//   })
// });

// http.listen(port, () => { // 클라이언트 대기
//   console.log("listening on * " + port);
// });

// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// // port setup
// app.set('port', process.env.PORT || 3000);

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;

// var server = app.listen(app.get('port'), function () {
//   console.log('Express server listening on port ' + server.address().port);
// });
// // 피니야.. socket.io 라이브러리 설치하려면 node와 express 버전을 높여야 해..
// // 내 기억으로는 노드는 14이상이였서..
// // 그러구.. 그래..

// WhatTheChat
// const express = require('express');
// const path = require('path');
// var app = express();
// var http = require('http').Server(app);

const express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));

// 서버 연결 시 콘솔에 로그 출력
console.log("◻️◽️▫️ Loading ▫️◽️◻️");

io.on('connection', function (socket) {

  // 클라이언트 로그인 시 출력 메시지
  var id = {
    id: '${socket.id} - ME'
  }

  // console.log('👤', socket.id, '- User Conncetion');

  socket.on('connect_user', function (user) {
    console.log('👤', socket.id, "- Connected user");
    socket.join(user['roomName']);
    console.log("👩🏻‍💻 USER NAME :", user['username']);
    console.log("🏷 ROOM NAME :", user['roomName']);
    // console.log("📦 STATE : ", socket.adapter.rooms);
    io.emit('connect_user', user);
  });


  // 메세지 입력하면 서버 로그 메시지 출력
  socket.on('chat_message', function (msg) {

    console.log(msg['name'], ">", msg['script'], "(",
      msg['today'], "-", msg['date_time'], ") *", msg['roomName']);

    io.to(msg['roomName']).emit('chat_message', msg);
    // 특정 클라이언트에게만 메시지를 전송한다.
  });

  socket.on('disconnect', function () { // 클라이언트 연결 끊어지면 자동 실행
    console.log('❌', socket.id, '- disconnected');
  });
});

// 처음에 서버 연결 시 몇 번 포트에 서버 연결 확인하는 출력 메시지
http.listen(app.get('port'), function () {
  console.log('🔴 Node app is running on port *', app.get('port'));
});