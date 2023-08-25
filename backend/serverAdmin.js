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
    const selectSql = "SELECT * FROM `admin` WHERE `first_name` = ? AND `password` = ?";
    const selectName = [req.body.username];
    const selectPassword = [req.body.password];
    // console.log(selectName, "   ", selectPassword);
    db.query(selectSql, [selectName, selectPassword], (selectErr, selectResult) => {
      if (selectErr) {
        console.log(selectErr);
        return res.json("Error");
      }
    //   console.log(selectResult);
      if (selectResult.length > 0) {
        console.log(selectResult);
        const adminId = selectResult[0].id;
        return res.json({ status: 1, adminId });
      }
      else
        return res.json({ status: -1 });
    });
  });



  app.get('/api/get_admin/:id', (req, res) => {
    const id = req.params.id;
    const selectSql = "SELECT * FROM admin WHERE id = ?";
    db.query(selectSql,[id], (selectErr, selectResult) => {
      if (selectErr) {
        console.log(selectErr);
        return res.json("Error");
      }
      return res.json(selectResult);
    });
  });

  app.get('/api/search/:input', (req, res) => {
    const input = req.params.input;
    const selectSql = "SELECT id, firstName, lastName, image, userType FROM ( SELECT id, firstName, lastName, image, 'user' as userType FROM user WHERE firstName LIKE ? OR lastName LIKE ? UNION ALL SELECT id, first_name, last_name, image, 'admin' as userType FROM admin WHERE first_name LIKE ? OR last_name LIKE ? UNION ALL SELECT id, first_name, last_name, image, 'teacher' as userType FROM teachers WHERE first_name LIKE ? OR last_name LIKE ? ) AS combined_results ORDER BY LENGTH(firstName) LIMIT 7;";
    db.query(selectSql,[`${input}%`, `${input}%`, `${input}%`, `${input}%`, `${input}%`, `${input}%`], (selectErr, selectResult) => {
      if (selectErr) {
        console.log(selectErr);
        return res.json("Error");
      }
      return res.json(selectResult);
    });
  });

  app.get('/api/getAggregatedData', (req, res) => {
    const queriesWithDescriptions = [
      { query: `SELECT COUNT(DISTINCT id_user) AS count FROM specifics`, description: "Total number of users" ,title: "Users"},
      { query: `SELECT COUNT(*) AS count FROM groups WHERE 1`, description: "Total number of groups" ,title: "Groups"},
      { query: `SELECT COUNT(*) AS count FROM teachers WHERE 1`, description: "Total number of teachers",title: "Teachers" },
      { query: `SELECT COUNT(*) AS count FROM specifics WHERE study_now = 1`, description: "Number of users currently studying" , title: "Us now"},
      { query: `SELECT SUM(payment) AS count FROM payment`, description: "Total payment collected",title: "DH" },
      { query: `
        SELECT SUM(payment) AS count
        FROM payment
        WHERE YEAR(date_payment) = YEAR(CURRENT_DATE()) AND MONTH(date_payment) = MONTH(CURRENT_DATE())
      `, description: "Total earnings of the current month",title: "DH.M" }
    ];
  
    const results = {};
  
    // Helper function to execute a query and handle the result
    const executeQuery = (queryObject, callback) => {
      db.query(queryObject.query, (error, result) => {
        if (error) {
          console.error(error);
          callback(error);
        } else {
          Object.assign(results, { [queryObject.title]: { description: queryObject.description, data: result[0] } });
          callback();
        }
      });
    };
  
    // Execute queries in series
    const executeNextQuery = index => {
      if (index < queriesWithDescriptions.length) {
        executeQuery(queriesWithDescriptions[index], error => {
          if (error) {
            return res.json("Error");
          }
          executeNextQuery(index + 1);
        });
      } else {
        // console.log(results);
        return res.json(results);
      }
    };
  
    executeNextQuery(0);
  });
  
  
  
  

app.listen(8082, () => {
    console.log("Listening on port 8082 ok");
  });