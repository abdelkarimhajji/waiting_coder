// Server code
const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "waiting_coder"
});

app.use(express.json()); // Add this line to parse JSON in request body

app.post('/signup', (req, res) => {
  const selectSql = "SELECT * FROM `user` WHERE `firstName` = ? AND `password` = ?";
  const selectName = [req.body.name];
  const selectPassword = [req.body.password];
  db.query(selectSql, [selectName, selectPassword], (selectErr, selectResult) => {
    if (selectErr) {
      console.log(selectErr);
      return res.json("Error");
    }
    if (selectResult.length > 0) {
      // console.log(selectResult);
      const userId = selectResult[0].id;
      return res.json({ status: 1, userId });
    }
    else
      return res.json({ status: -1 });
  });
});


// Create an API endpoint for fetching data for a specific user's name specifics
app.get('/name_specifics/:id', (req, res) => {
  const id = req.params.id;
  const selectSql = `SELECT name_specifics.name ,name_specifics.id, specifics.study_now
                  FROM ((user INNER JOIN specifics ON user.id = specifics.id_user)
                  INNER JOIN name_specifics ON specifics.id_nameSpecifics = name_specifics.id) 
                  WHERE user.id = ?`;
  db.query(selectSql, [id], (selectErr, selectResult) => {
    if (selectErr) {
      console.error(selectErr);
      return res.status(500).json({ error: "An error occurred while fetching data." });
    }
    // console.log(selectResult);
    return res.json(selectResult);
  });
});

app.get('/api/get_levels/:id/:selectLocalStor', (req, res) => {
  const id = req.params.id;
  const selectLocalStor = req.params.selectLocalStor;
  const selectSql = `SELECT * FROM level WHERE id_user = ? AND id_specifics = ?`;
  db.query(selectSql, [id, selectLocalStor], (selectErr, selectResult) => {
    if (selectErr) {
      console.log(selectErr);
      return res.json("Error");
    }
    console.log(selectResult);
    return res.json(selectResult);
  });
});


app.get('/api/get_languages/:selectedOptionKey', (req, res) => {
  const selectedOptionKey = req.params.selectedOptionKey;
  const selectSql = `SELECT * FROM languages WHERE id_collection = ?`;
  db.query(selectSql, [selectedOptionKey], (selectErr, selectResult) => {
    if (selectErr) {
      console.log(selectErr);
      return res.json("Error");
    }
    // console.log(selectResult);
    return res.json(selectResult);
  });
});

app.get('/api/get_tools/:selectedOptionKey', (req, res) => {
  const selectedOptionKey = req.params.selectedOptionKey;
  const selectSql = `SELECT * FROM tools WHERE id_collection = ?`;
  db.query(selectSql, [selectedOptionKey], (selectErr, selectResult) => {
    if (selectErr) {
      console.log(selectErr);
      return res.json("Error");
    }
    // console.log(selectResult);
    return res.json(selectResult);
  });
});

app.get('/api/get_porject/:selectedOptionKey', (req, res) => {
  const selectedOptionKey = req.params.selectedOptionKey;
  const selectSql = `SELECT * FROM projects WHERE id_collection = ? AND display = 1`;
  db.query(selectSql, [selectedOptionKey], (selectErr, selectResult) => {
    if (selectErr) {
      console.log(selectErr);
      return res.json("Error");
    }
    // console.log(selectResult);
    return res.json(selectResult);
  });
});

app.get('/api/get_events', (req, res) => {
  const selectSql = `SELECT * FROM events WHERE display = 1`;
  db.query(selectSql, (selectErr, selectResult) => {
    if (selectErr) {
      console.log(selectErr);
      return res.json("Error");
    }
    // console.log(selectResult);
    return res.json(selectResult);
  });
});


app.get('/api/get_competitions', (req, res) => {
  const selectSql = `SELECT * FROM competitions WHERE display = 1`;
  db.query(selectSql, (selectErr, selectResult) => {
    if (selectErr) {
      console.log(selectErr);
      return res.json("Error");
    }
    // console.log(selectResult);
    return res.json(selectResult);
  });
});

// Create API endpoint for fetching data from the user table
app.get('/get_user/:id', (req, res) => {
  const id = req.params.id;
  const selectSql = "SELECT * FROM user WHERE id = ?";
  db.query(selectSql,[id], (selectErr, selectResult) => {
    if (selectErr) {
      console.log(selectErr);
      return res.json("Error");
    }
    return res.json(selectResult);
  });
});

app.listen(8081, () => {
  console.log("Listening on port 8081");
});
