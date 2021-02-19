const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const MongooseConfig = require('./config/mongoose.config');

require('dotenv').config();

// ====
const UserRoutes = require('./routes/user.routes');
// ====

const app = express();
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
// ====
app.listen(port, () => console.log('THE SERVER IS ALL FIRED UP ON PORT ' + port + ' ...'));
