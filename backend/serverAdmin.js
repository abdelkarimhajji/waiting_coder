const express = require("express");
const db = require("./db");
const cors = require('cors');
const multer = require("multer");
const path = require("path");
const { keyframes } = require("@emotion/react");

const app = express();
app.use(cors());


  
app.use(express.json());



app.post('/signup', (req, res) => {
    const selectSql = "SELECT * FROM `admin` WHERE `first_name` = ? AND `password` = ?";
    const selectName = [req.body.username];
    const selectPassword = [req.body.password];
    db.query(selectSql, [selectName, selectPassword], (selectErr, selectResult) => {
      if (selectErr) {
        console.log(selectErr);
        return res.json("Error");
      }

      if (selectResult.length > 0) {
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
    const selectSql = `SELECT id, firstName, lastName, image, userType, phone FROM 
    ( 
        SELECT id, firstName, lastName, image, 'user' as userType, phone FROM user WHERE firstName LIKE ? OR lastName LIKE ? 
        UNION ALL 
        SELECT id, first_name as firstName, last_name as lastName, image, 'admin' as userType, NULL as phone FROM admin WHERE first_name LIKE ? OR last_name LIKE ? 
        UNION ALL 
        SELECT id, first_name as firstName, last_name as lastName, image, 'teacher' as userType, NULL as phone FROM teachers WHERE first_name LIKE ? OR last_name LIKE ? 
    ) AS combined_results 
    ORDER BY LENGTH(firstName) 
    LIMIT 7;`;
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
      { query: `SELECT COUNT(*) AS count FROM waiting_coder.\`groups\` WHERE 1`, description: "Total number of groups" ,title: "Groups"},
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
    waiting_coder.\`groups\` g ON g.id_specific = ns.id
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
    waiting_coder.\`groups\`
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
      INNER JOIN payment ON payment.id_user = user.id)
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
    SELECT * , groups.id AS IdGroup, name_specifics.id AS IdNameSpecific
    FROM waiting_coder.\`groups\`
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
    SELECT * , groups.id AS IdGroup, name_specifics.id AS IdNameSpecific
    FROM waiting_coder.\`groups\`
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
    const requestData = req.body;
  
    const checkedStudentIds = requestData.checkedStudentIds;
    const selectIdGroup = requestData.selectIdGroup;
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
    const { id_user } = req.body; 
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



  app.post('/api/createGroup', (req, res) => {
    const requestData = req.body;
    const idSpecific = requestData.idSpecific;
    const inputValueName = requestData.inputValueName;

    const checkGroupNameQuery = `SELECT COUNT(*) as count FROM waiting_coder.\`groups\` WHERE name_group = ?`;
    db.query(checkGroupNameQuery, [inputValueName], (error, results) => {
      if (error) {
        console.error('Error checking group name:', error);
        res.status(500).json({ message: 'Error checking group name' });
        return;
      }
  
      const groupCount = results[0].count;

      if (groupCount == 0) {

      const insertGroupQuery = 'INSERT INTO groups (id_specific, name_group, group_finished, date_created) VALUES (?, ?, ?, ?)';
      const currentDate = new Date();
      db.query(insertGroupQuery, [idSpecific, inputValueName, 0, currentDate], (error, results) => {
        if (error) {
          console.error('Error inserting into groups:', error);
          res.status(500).json({ message: 'Error inserting into groups' });
          return;
        }
  
        db.query('SELECT LAST_INSERT_ID() as lastId', (error, results) => {
          if (error) {
            console.error('Error fetching last inserted ID:', error);
            res.status(500).json({ message: 'Error fetching last inserted ID' });
            return;
          }
  
          const lastInsertedId = results[0].lastId;
  
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


  app.get('/api/getProjectSpecific/:idSpefific', (req, res) => {
    const idSpefific = req.params.idSpefific;
    const selectSql = "SELECT * FROM `projects` WHERE id_collection = ?";
    db.query(selectSql,[idSpefific], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });

  app.get('/api/getStudentsGroup/:idGroup/:idProject', (req, res) => {
    const idGroup = req.params.idGroup;
    const idProject = req.params.idProject;
    const selectSql = `SELECT 
    user.*, user.id as idOfUser, 
    specifics.*, 
    project.*, 
    validation_projects.*,
    payment.*
    FROM 
        user 
    INNER JOIN specifics ON user.id = specifics.id_user 
    INNER JOIN projects AS project ON project.id_collection = specifics.id_nameSpecifics 
    INNER JOIN payment ON payment.id_user = user.id 
    LEFT JOIN validation_projects ON 
        validation_projects.id_user = user.id 
        AND validation_projects.id_project = project.id -- Match on both user.id and project.id
    WHERE 
        specifics.id_group = ?
        AND project.id = ?`;
    db.query(selectSql,[idGroup, idProject], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });
  

  app.get('/api/getStudentsGroupOnly/:idGroup', (req, res) => {
    const idGroup = req.params.idGroup;
    const selectSql = `SELECT 
    user.*, user.id as idOfUser, 
    specifics.*,  
    payment.*
    FROM 
        user 
    INNER JOIN specifics ON user.id = specifics.id_user 
    INNER JOIN payment ON payment.id_user = user.id 
    WHERE 
        specifics.id_group = ?`;
    db.query(selectSql,[idGroup], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });

  app.put('/api/validEachProject/:idUser/:idProject', (req, res) => {
    const idUser = req.params.idUser;
    const idProject = req.params.idProject;
    const valid = 1;
    const selectSql = "SELECT id_user FROM validation_projects WHERE id_user = ? AND id_project = ?";
    db.query(selectSql, [idUser, idProject], (selectErr, selectResult) => {
      if (selectErr) {
        console.log(selectErr);
        return res.json("Error");
      }
  
      if (selectResult.length > 0) {
        const updateSql = "UPDATE validation_projects SET valid_project = ?, date_validation = ? WHERE id_user = ? AND id_project = ?";
        const currentDate = new Date();
        db.query(updateSql, [valid, currentDate, idUser, idProject], (updateErr, updateResult) => {
          if (updateErr) {
            console.log(updateErr);
            return res.json("Error");
          }
          
          return res.json(updateResult);
        });
      } else {
        const insertSql = "INSERT INTO validation_projects (id_user, id_project, id_teacher_validation, valid_project, date_validation) VALUES (?, ?, ?, ?, ?)";
        const currentDate = new Date();
        db.query(insertSql, [idUser, idProject, 2, valid, currentDate], (insertErr, insertResult) => {
          if (insertErr) {
            console.log(insertErr);
            return res.json("Error");
          }
          return res.json(insertResult);
        });
      }
    });
  });
  
  app.put('/api/validAllProject/:idGroup/:idProject', (req, res) => {
    const idProject = req.params.idProject;
    const idGroup = req.params.idGroup;
    const selectedIDs  = req.body
  const currentDate = new Date();
  const updateSql = "UPDATE validation_projects SET valid_project = 1, date_validation = ? WHERE id_user = ? AND id_project = ?";
  const insertSql = "INSERT INTO validation_projects (id_user, id_project, id_teacher_validation, valid_project, date_validation) VALUES (?, ?, 2, 1, ?)";
  
  selectedIDs.forEach((userID) => {
    const checkUserSql = "SELECT COUNT(*) AS count FROM validation_projects WHERE id_user = ? AND id_project = ?";
    db.query(checkUserSql, [userID, idProject], (checkErr, checkResult) => {
      if (checkErr) {
        console.log(checkErr);
        return res.json("Error");
      }
      
      const userExists = checkResult[0].count > 0;
      
      if (!userExists) {
        db.query(insertSql, [userID, idProject, currentDate], (insertErr, insertResult) => {
          if (insertErr) {
            console.log(insertErr);
            return res.json("Error");
          }
        });
      } else {
        db.query(updateSql, [currentDate, userID, idProject], (updateErr, updateResult) => {
          if (updateErr) {
            console.log(updateErr);
            return res.json("Error");
          }
        });
      }
    });
  });
  
  return res.json("Success");
});

app.get('/api/getStudentsGroup2/:idGroup/:idProject', (req, res) => {
  const idGroup = req.params.idGroup;
  const idProject = req.params.idProject;
  const selectSql = `SELECT 
  user.*, user.id as idOfUser, 
  specifics.*, 
  project.*, 
  validation_projects.*,
  payment.*
  FROM 
      user 
  INNER JOIN specifics ON user.id = specifics.id_user 
  INNER JOIN projects AS project ON project.id_collection = specifics.id_nameSpecifics 
  INNER JOIN payment ON payment.id_user = user.id 
  LEFT JOIN validation_projects ON 
      validation_projects.id_user = user.id 
      AND validation_projects.id_project = project.id -- Match on both user.id and project.id
  WHERE 
      specifics.id_group = ?
      AND project.id = ?`;
  db.query(selectSql,[idGroup, idProject], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/get_pushProject/:idProject/:idUser', (req, res) => {
  const idProject = req.params.idProject;
  const idUser = req.params.idUser;
  const selectSql = `SELECT *
  FROM ((push_porojects
  INNER JOIN user ON user.id = push_porojects.id_user)
  INNER JOIN teachers ON teachers.id = push_porojects.id_teacher)
  WHERE push_porojects.id_project = ? and push_porojects.id_user = ?
  ORDER BY push_porojects.id ASC`;
  db.query(selectSql, [idProject, idUser], (selectErr, selectResult) => {
    if (selectErr) {
      console.log(selectErr);
      return res.json("Error"); 
    }
    return res.json(selectResult);
  });
});

app.post("/api/send_messageFromTeacher", (req, res) => {
  const { id_user, id_teacher, message, id_project, time_send } = req.body;
  const sql = "INSERT INTO push_porojects (id_user, id_teacher, id_project, message_teacher, time_send_teacher) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [id_user, id_teacher, id_project, message, time_send], (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Error inserting data" });
    }
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});


app.put('/api/validAllStudentSepcific/:idGroup/:idSpefific', (req, res) => {
  const idSpefific = req.params.idSpefific;
  const idGroup = req.params.idGroup;
  const selectedIDs  = req.body;
const currentDate = new Date();
const updateSql = "UPDATE specifics SET validation = 1, date_validation = ? WHERE id_user = ? AND id_nameSpecifics = ?";

selectedIDs.forEach((userID) => {
  
      db.query(updateSql, [currentDate, userID, idSpefific], (insertErr, insertResult) => {
        if (insertErr) {
          console.log(insertErr);
          return res.json("Error");
        }
  });
});
return res.json("Success");
});



app.put('/api/validEachStudentSpecific/:idUser/:idSpefific', (req, res) => {
  const idUser = req.params.idUser;
  const idSpecific = req.params.idSpefific;
  
  const updateSql = "UPDATE specifics SET validation = 1, date_validation = ? WHERE id_user = ? AND id_nameSpecifics = ?";
  const currentDate = new Date();
  
  db.query(updateSql, [currentDate, idUser, idSpecific], (insertErr, insertResult) => {
    if (insertErr) {
      console.log(insertErr);
      res.json({ status: "Error" });
    } else {
      res.json({ status: "Success" });
    }
  });
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = path.join(__dirname, "../../waiting_coder/src/imgs");
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });


app.post("/api/upload", upload.single("image"), (req, res) => {
  let { firstName, lastName, email, number, idSpecific, idGroup, payment } = req.body;
  const uploadedImage = req.file;
  const currentDate = new Date();
  let valid = payment === '300' ? 1 : 0;

  const selectUser = 'SELECT id FROM user WHERE email = ?';
  db.query(selectUser, [email], (error, idResult) => {
    if (error) {
      console.error('Error querying user:', error);
      res.status(500).json({ message: 'Error querying user' });
      return;
    }

    if (idResult.length !== 0) {
      console.log('User with the same email already exists');
      res.status(409).json({ message: 'User already exists' });
    } else {
      const insertUserQuery = 'INSERT INTO user(firstName, password, lastName, email, phone, image, date_registered) VALUES (?, ?, ?, ?, ?, ?, ?)';
      db.query(insertUserQuery, [firstName, '@' + lastName + 'code', lastName, email, number, uploadedImage.filename, currentDate], (insertError, userResult) => {
        if (insertError) {
          console.error('Error inserting into user:', insertError);
          res.status(500).json({ message: 'Error inserting into user' });
          return;
        }

        const userId = userResult.insertId;

        const insertLevelQuery = 'INSERT INTO level (id_user, level, background) VALUES (?, ?, ?)';
        db.query(insertLevelQuery, [userId, 0, '0'], (levelInsertError, levelResult) => {
          if (levelInsertError) {
            console.error('Error inserting into level:', levelInsertError);
            res.status(500).json({ message: 'Error inserting into level' });
            return;
          }

          const insertSpecific = 'INSERT INTO specifics(id_user, id_nameSpecifics, study_now, validation, validation_week, id_group, date_register) VALUES (?, ?, ?, ?, ?, ?, ?)';
          db.query(insertSpecific, [userId, idSpecific, 1, 0, 0, idGroup, currentDate], (specificError, specificResult) => {
            if (specificError) {
              console.error('Error inserting into specifics:', specificError);
              res.status(500).json({ message: 'Error inserting into specifics' });
              return;
            }
            if(!payment)
              payment = 0;
            const insertPayment = 'INSERT INTO payment(payment, valid, date_payment, id_user) VALUES (?, ?, ?, ?)';
            db.query(insertPayment, [payment , valid, currentDate, userId], (paymentError, paymentResult) => {
              if (paymentError) {
                console.error('Error inserting into payment:', paymentError);
                res.status(500).json({ message: 'Error inserting into payment' });
                return;
              }

              res.status(200).json({ message: "Image uploaded successfully" });
            });
          });
        });
      });
    }
  });
});


app.get('/api/getGroupsConditonSpecific/:idSpecific', (req, res) => {
  const idSpecific = req.params.idSpecific;
  const query = `SELECT groups.id, groups.name_group 
  FROM waiting_coder.\`groups\` LEFT JOIN ( SELECT id_group, COUNT(*) as count_specifics 
  FROM specifics WHERE specifics.id_nameSpecifics = ? GROUP BY id_group ) 
  AS grouped_specifics ON groups.id = grouped_specifics.id_group 
  WHERE (grouped_specifics.count_specifics <= 12 OR grouped_specifics.count_specifics IS NULL) 
  AND (groups.id_specific = ?)`;

  db.query(query, [idSpecific, idSpecific], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/usersAndSpecifics/:idGroup', (req, res) => {
  const idGroup = req.params.idGroup;
  console.log("idgroup", idGroup);
  const query = `SELECT user.id, user.firstName, user.lastName, user.phone, 
  user.image, user.email, name_specifics.name FROM user INNER JOIN specifics
  On user.id = specifics.id_user INNER JOIN name_specifics 
  On name_specifics.id = specifics.id_nameSpecifics WHERE specifics.id_group = ?;`;
  db.query(query, [idGroup], (error, results) => {
    if(error)
    {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
    else
    {
      res.json(results);
      console.log(results)
    }
  })
})

app.put('/api/updatePayment/:idUser/:newPayment', (req, res) => {
  const newPayment = req.params.newPayment;
  const idUser = req.params.idUser;
  const currentDate = new Date();
  const newPaymentValue = parseInt(newPayment);

  if (isNaN(newPaymentValue)) {
    res.status(400).json({ message: 'Invalid newPayment value' });
    return;
  }

  const selectSql = `SELECT payment FROM payment WHERE id_user = ?`;

  db.query(selectSql, [idUser], (selectError, selectResult) => {
    if (selectError) {
      console.error('Error selecting payment:', selectError);
      res.status(500).json({ message: 'Error selecting payment' });
      return;
    }

    if (selectResult.length === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const currentPayment = selectResult[0].payment;

    const updatedPayment = currentPayment + newPaymentValue;

    const updateSql = `UPDATE payment
                       SET payment = ?, date_payment = ?
                       WHERE id_user = ?`;

    db.query(updateSql, [updatedPayment, currentDate, idUser], (updateError, updateResult) => {
      if (updateError) {
        console.error('Error updating payment:', updateError);
        res.status(500).json({ message: 'Error updating payment' });
        return;
      }


      return res.json({ message: 'Success' });
    });
  });
});




app.listen(8082, () => {
    console.log("Listening on port 8082 ok");
  });

