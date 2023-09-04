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
      { query: `SELECT COUNT (DISTINCT id_user) AS count FROM specifics`, description: "Total number of users" ,title: "Users"},
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
  
  
  app.get('/api/getYearEarnings/:chooseYear', (req, res) => {
    const chooseYear = req.params.chooseYear;
    const query = `
      SELECT MONTH(date_payment) AS month, YEAR(date_payment) AS year, SUM(payment) AS earnings
      FROM payment
      WHERE YEAR(date_payment) = ?
      GROUP BY YEAR(date_payment), MONTH(date_payment) 
    `;
  
    db.query(query, [chooseYear],(error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });


  app.get('/api/getYearMoney', (req, res) => {
    const query = `
    SELECT YEAR(date_payment) AS year, SUM(payment) AS total_money
    FROM payment
    GROUP BY YEAR(date_payment);    
    `;
    db.query(query, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });

  app.get('/api/getYears/', (req, res) => {
    const query = `
    SELECT DISTINCT YEAR(date_payment) AS year FROM payment
    `;
    db.query(query, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });
  
app.get('/api/getMonthsUesrs/:chooseYear', (req, res) => {
    const chooseYear = req.params.chooseYear;
    const query = `
    SELECT YEAR(date_registered) AS year, MONTH(date_registered) AS month, COUNT(*) AS user_count 
    FROM user WHERE YEAR(date_registered) = ?
    GROUP BY YEAR(date_registered), MONTH(date_registered); 
    `;
   
    db.query(query, [chooseYear],(error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });

  app.get('/api/getYearUsers', (req, res) => {
    const query = `
    SELECT YEAR(date_registered) AS year, COUNT(*) AS total_users
    FROM user
    GROUP BY YEAR(date_registered);
    `;
    db.query(query, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });


  app.get('/api/getMoreInfoGroups', (req, res) => {
    const query = `
    SELECT 
      ns.id AS specific_id,
      ns.name AS specific_name,
      COUNT(g.id) AS group_count,
      SUM(CASE WHEN g.group_finished= 0 THEN 1 ELSE 0 END) AS unfinished_group_count
    FROM 
      name_specifics ns
    LEFT JOIN
      groups g ON g.id_specific = ns.id
    GROUP BY 
      ns.id, ns.name;
    `;
    db.query(query, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });

  app.get('/api/getGroupsWorking', (req, res) => {
    const query = `
    SELECT 
    COUNT(*) AS unfinished_group_count
    FROM 
      groups
    WHERE 
      groups.group_finished = 0;
    `;
    db.query(query, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });


  app.get('/api/getUserSpecificPayment/:selectIdGroup', (req, res) => {
    const selectIdGroup = req.params.selectIdGroup;
    const query = `
    SELECT * FROM ((user 
      INNER JOIN specifics ON user.id = specifics.id_user) 
      INNER JOIN payment ON payment.id_specific = specifics.id)
       WHERE specifics.id_group = ?
    `;
    db.query(query, [selectIdGroup],(error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });

  app.get('/api/getOldGroups', (req, res) => {
    const query = `
    SELECT * , groups.id AS IdGroup
    FROM groups
    INNER JOIN name_specifics ON groups.id_specific = name_specifics.id
    WHERE group_finished = 1;
    `;
    db.query(query, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });

  app.get('/api/getCurrentGroups', (req, res) => {
    const query = `
    SELECT * , groups.id AS IdGroup
    FROM groups
    INNER JOIN name_specifics ON groups.id_specific = name_specifics.id
    WHERE group_finished = 0;
    `;
    db.query(query, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });


  app.post('/api/validateWeekAll', (req, res) => {
    const requestData = req.body; // Access the entire object with both values
  
    // Access the individual values
    const checkedStudentIds = requestData.checkedStudentIds;
    const selectIdGroup = requestData.selectIdGroup;
    console.log(selectIdGroup)
    // Loop through the student IDs and update the validationWeek column
    checkedStudentIds.forEach((studentId) => {
      const updateQuery = 'UPDATE specifics SET validation_week = 1 WHERE id_user = ? AND id_group = ?';
      db.query(updateQuery, [studentId, selectIdGroup], (error, results) => {
        if (error) {
          console.error('Error updating validationWeek:', error);
        }
      });
    });
  
    res.json({ message: 'Validation updated successfully' });
  });
  


  app.post('/api/updateValidationWeek', (req, res) => {
    const { id_user } = req.body; // Assuming you're sending the user ID in the request body
    const updateQuery = 'UPDATE specifics SET validation_week = 1 WHERE id_user = ?';
    db.query(updateQuery, [id_user], (error, results) => {
      if (error) {
        console.error('Error updating validation_week:', error);
        res.status(500).json({ error: 'Error updating validation_week' });
      } else {
        res.json({ message: 'Validation week updated successfully' });
      }
    });
  });

  app.get('/api/getAllNameSpecifics', (req, res) => {
    const query = `SELECT * FROM name_specifics WHERE 1`;
    db.query(query, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });
  
  // get all teachers
  app.get('/api/getAllTeachers', (req, res) => {
    const query = `SELECT * FROM teachers WHERE 1`;
    db.query(query, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });

  // create group 

  app.post('/api/createGroup', (req, res) => {
    const requestData = req.body;
    const idSpecific = requestData.idSpecific;
    const inputValueName = requestData.inputValueName;
  
    // Step 1: Check if the group name already exists
    const checkGroupNameQuery = 'SELECT COUNT(*) as count FROM groups WHERE name_group = ?';
    db.query(checkGroupNameQuery, [inputValueName], (error, results) => {
      if (error) {
        console.error('Error checking group name:', error);
        res.status(500).json({ message: 'Error checking group name' });
        return;
      }
  
      const groupCount = results[0].count;
  
      // If groupCount is greater than 0, it means the group name already exists.
      if (groupCount == 0) {
       
     
  
      // Step 2: Insert into the 'groups' table
      const insertGroupQuery = 'INSERT INTO groups (id_specific, name_group, group_finished, date_created) VALUES (?, ?, ?, ?)';
      const currentDate = new Date();
      db.query(insertGroupQuery, [idSpecific, inputValueName, 0, currentDate], (error, results) => {
        if (error) {
          console.error('Error inserting into groups:', error);
          res.status(500).json({ message: 'Error inserting into groups' });
          return;
        }
  
        // Step 3: Fetch the last inserted ID
        db.query('SELECT LAST_INSERT_ID() as lastId', (error, results) => {
          if (error) {
            console.error('Error fetching last inserted ID:', error);
            res.status(500).json({ message: 'Error fetching last inserted ID' });
            return;
          }
  
          const lastInsertedId = results[0].lastId;
  
          // Step 4: Insert into the 'teacher_groups' table
          const insertTeachersGroupQuery = 'INSERT INTO teacher_groups (id_group, id_teacher) VALUES (?, ?)';
          db.query(insertTeachersGroupQuery, [lastInsertedId, requestData.idTeacher], (error, results) => {
            if (error) {
              console.error('Error inserting into teacher_groups:', error);
              res.status(500).json({ message: 'Error inserting into teacher_groups' });
              return;
            }
  
            res.json({ message: 'Group created successfully' });
          });
        });
      });
    }
    else
    {
      res.json({ message: 'Name of this group alredy exist' });
    }
    });
    
  });
  
  // finsih group

  app.put('/api/updateGroups/:idGroup', (req, res) => {
    const idGroup = req.params.idGroup;
    const updateSql = "UPDATE groups SET group_finished = 1, date_finished = ? WHERE id = ?";
    const currentDate = new Date();
    db.query(updateSql, [currentDate, idGroup], (selectErr, selectResult) => {
      if (selectErr) {
        console.log(selectErr);
        return res.json("Error");
      }
      return res.json(selectResult);
    });
  });
  

app.listen(8082, () => {
    console.log("Listening on port 8082 ok");
  });