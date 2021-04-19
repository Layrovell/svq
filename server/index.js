const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "sherrie",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24 * 10000,
    },
  })
);

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "admin",
  database: "quiz_db",
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password);

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO users (username, password) VALUES (?,?)",
      [username, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("userId");
  res.send({ message: "User are log out" });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            res.send(result);
          } else {
            res.send({ message: "Wrong username/password combination!" });
            console.log("req", req.session);
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});

app.get('/topics', (req, res) => {
  db.query(
    "SELECT * FROM topics",
    (err, result) => {
      if (err) {
        res.send({err});
      }

      if (result.length) {
        res.send({ topics: result });
      }
    }
  );
});

app.get('/questions', (req, res) => {
  const topic = req.query.topic;

  db.query(
    "SELECT * FROM questions WHERE topic_id = ?",
    topic,
    (err, result) => {
      if (err) {
        res.send({ err });
        return;
      }

      if (result.length) {
        const questions = [];
        result.forEach(question => {
          const questionWithAnswers = {
            ...question,
            answerOptions: [],
          };

          db.query(
            "SELECT * FROM answers WHERE question_id = ?",
            question.id,
            (err, answers) => {
              if (err) {
                res.send({err});
                return;
              }

              if (answers.length) {
                questionWithAnswers.answerOptions = JSON.parse(JSON.stringify(answers));
                questions.push(questionWithAnswers);
              }
            }
          );
        });
        setTimeout(() => {
          res.send(questions);
        }, 1000);
      }
    }
    )
});

app.post("/results", (req, res) => {
  const user_id = req.body.user_id;
  const question_id = req.body.question_id;
  const answer_id = req.body.answer_id;
  const date = req.body.date;
  console.log('from ...: ', user_id, question_id, answer_id);

  db.query(
    'INSERT INTO user_questions (user_id, question_id, answer_id, date) VALUES (?,?,?,?)',
    [user_id, question_id, answer_id, date],
    (err, result) => {
      console.log(err);
    }
  );
});

app.post("/session", (req, res) => {
  const status = req.body.status;
  const id_user = req.body.id_user;
  console.log('status ...: ', status);

  db.query(
    'INSERT INTO run_session (status, id_user) VALUES (?,?)',
    [status, id_user],
    (err, result) => {
      console.log(err);
    }
  );
});

app.listen(3003, () => {
  console.log("running server");
});
