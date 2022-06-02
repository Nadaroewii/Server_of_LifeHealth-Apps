const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./Serverjs/config/db');
const auth = require('./Serverjs/middleware/auth');
const errors = require('./Serverjs/middleware/errors');
//const mysql = require('mysql')
const unless = require('express-unless');
const app = express();
const port = 4000 || process.env.PORT
const host = '0.0.0.0';
//const cors = require('cors')
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
 useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
}).then(
   () => {
     console.log('Database connect');
    },
    (error) => {
      console.log('Database can`t be connected: ' + error);
    }
);

auth.authenticateToken.unless = unless;
app.use(
  auth.authenticateToken.unless({
    path: [
      {url : "/users/login", methods: ["POST"] },
      {url : "/users/register", methods: ["POST"] },
      {url : "/users/historydata", methods: ["GET"]}
    ],
  })
);

app.use(express.json());
// app.use(bodyParser.json());
app.use("/users", require('./Serverjs/routes/user.route'));
app.use(errors.errorHandler);
// app.use(bodyParser.urlencoded({ extended: false}))
app.listen(port, host, ()=>{
    console.log('Connect to port ' + port);
    console.log('Connect to host ' + host);
});
//nodemon agar saat file di save langsung reload file tanpa running dr awalrs 