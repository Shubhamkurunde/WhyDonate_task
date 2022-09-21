const jwt = require("jsonwebtoken");

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

const users = {
  "user1@email.com": "Userx123",
  "user2@email.com": "Userx456",
  "user3@email.com": "Userx789",
};

const api_key = "f5e2b2a";

const secret = "kjbgjfuyghklhkytdytfgihoig";

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(password, users[email]);
  if (password == users[email]) {
    const token = jwt.sign({ api_key }, secret);
    res.status(200).send({
      success: true,
      msg: "Login successfull",
      data: token,
    });
  } else {
    res.status(404).send({
      success: false,
      msg: "Invalid Username or password",
      data: [],
    });
  }
});

app.post('/api/search', (req,res) => {
  const token = req.headers('token');
  let decoded = undefined;
  try{
    decoded = jwt.verify(token, secret);
    let search_title = req.body.search_title;
    // todo : send get request to https://www.omdbapi.com/ with search_title and decoded.api_key. 
    // todo : forword responce received from https://www.omdbapi.com/ to client. 

  } catch(err){
    res.status(400).send({
      success:false,
      msg : "Invalid Login",
      data : []
    })
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
