const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const MongooseConfig = require('./config/mongoose.config');
const http = require('http');
const socketIO = require('socket.io');

require('dotenv').config();

// ====
const UserRoutes = require('./routes/user.routes');
const ArticleRoutes = require('./routes/article.routes');
// ====

const app = express();
const server = http.createServer(app);
const io = socketIO(server, { cors: true });

const port = 8000;
// ====
const database = 'fixme';
// ====

app.use(
  express.json(),
  express.urlencoded({ extended: true }),
  cookieParser(),
  cors({ credentials: true, origin: 'http://localhost:3000' })
);

MongooseConfig(database);
// ====
UserRoutes(app);
ArticleRoutes(app);
// ====
server.listen(port, () => console.log('THE SERVER IS ALL FIRED UP ON PORT ' + port + ' ...'));

io.on('connection', socket => {
  socket.on('addComment', data => {
    console.log('USER ADDED A COMMENT!');
    socket.broadcast.emit('getComment', data);
  });
});
