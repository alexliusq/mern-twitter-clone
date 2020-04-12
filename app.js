const express = require("express");
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const users = require('./routes/api/users');
const tweets = require('./routes/api/tweets');
const User = require('./models/User');
const bodyParser = require('body-parser');

mongoose
  .connect(db, { useNewUrlParser: true})
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  const user = new User({
    handle: 'jim',
    email: 'jim@jim.com',
    password: 'jimisgreat123'
  })
  user.save();
  console.log(req);
  res.send("Hello World")
});

app.listen(port, () => console.log(`Server is running on port ${port}`));

app.use('/api/users', users);
app.use('/api/tweets', tweets);