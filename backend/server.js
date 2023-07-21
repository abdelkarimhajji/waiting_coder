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
          if (selectResult.length > 0)
              return res.json(1);
          else
              return res.json(-1);
      
      // const sql = "INSERT INTO `user`(`name`, `password`) VALUES (?, ?)";
      // const values = [
      //   req.body.name,
      //   req.body.password,
      // ];
      // db.query(sql, values, (err, data) => {
      //   if (err) {
      //     console.log(err);
      //     return res.json("Error");
      //   }
      //   console.log(data);
      //   return res.json("Data inserted successfully");
      // });
    });
  });

  app.listen(8081, () => {
    console.log("Listening on port 8081");
  });
