// Server code
require('dotenv').config();
const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // Add this line

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
      const token = jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET); // Generate a JWT
      return res.json({ status: 1, userId, accessToken: token }); // Send the JWT to the client
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

app.get('/api/get_levels/:id', (req, res) => {
  const id = req.params.id;
  const selectSql = `SELECT * FROM level WHERE id_user = ?`;
  db.query(selectSql, [id], (selectErr, selectResult) => {
    if (selectErr) {
      console.log(selectErr);
      return res.json("Error");
    }
    // console.log(selectResult);
    return res.json(selectResult);
  });
});


app.get('/api/get_languages/:selectedOptionKey', (req, res) => {
  const selectedOptionKey = req.params.selectedOptionKey;
  const query = `
  SELECT *, l.id AS idLanguage, li.id AS idLinkLanguage
  FROM languages l
  LEFT JOIN links_languages li ON l.id = li.id_language
  WHERE l.id_collection = ?;
    `;

  db.query(query,[selectedOptionKey], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error fetching data from the database' });
      return;
    }
    // console.log("ddddd",results)
    const languageAndLinks = {};
    results.forEach(row => {
      if (!languageAndLinks[row.idLanguage]) {
        languageAndLinks[row.idLanguage] = {
          languageId: row.idLanguage,
          languageName: row.name_langauge,
          languageIcon: row.name_icon,
          languageDescription:row.description,
          languageIdCollection:row.id_collection,
          links: [],
        };
      }
      if (row.idLinkLanguage) {
        languageAndLinks[row.idLanguage].links.push({
          linkId: row.idLinkLanguage,
          linkIdLanguage: row.id_language,
          linkName: row.name_link,
          link: row.link,
        });
      }
    });

    const projectsArray = Object.values(languageAndLinks);
    res.json(projectsArray);
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
  const selectSql = `SELECT * FROM projects WHERE id_collection = ?`;
  db.query(selectSql, [selectedOptionKey], (selectErr, selectResult) => {
    if (selectErr) {
      console.log(selectErr);
      return res.json("Error"); 
    }
    return res.json(selectResult);
  });
});

app.get('/api/get_AllPorject/:idProject', (req, res) => {
  const idProject = req.params.idProject;
  const selectSql = `SELECT * FROM (projects INNER JOIN more_info_projects ON projects.id = more_info_projects.id_project) WHERE projects.id = ?;`;
  db.query(selectSql, [idProject], (selectErr, selectResult) => {
    if (selectErr) {
      console.log(selectErr);
      return res.json("Error"); 
    }
    return res.json(selectResult);
  });
});
app.get('/api/get_ressourcesPorject/:idProject', (req, res) => {
  const idProject = req.params.idProject;
  const selectSql = `SELECT * FROM ressources_projects WHERE id_project = ?;`;
  db.query(selectSql, [idProject], (selectErr, selectResult) => {
    if (selectErr) {
      console.log(selectErr);
      return res.json("Error"); 
    }
    // console.log(selectResult);
    return res.json(selectResult);
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

app.get('/api/get_idTeacher/:idUser', (req, res) => {

  const idUser = req.params.idUser;
  const selectSql = `SELECT teacher_groups.id_teacher 
  FROM (specifics INNER JOIN teacher_groups ON specifics.id_group = teacher_groups.id_group) 
  WHERE specifics.id_user = ?`;

  db.query(selectSql,[idUser], (selectErr, selectResult) => {
    if (selectErr) {
      console.log(selectErr);
      return res.json("Error");
    }
    return res.json(selectResult);
  });

});


app.post('/api/push_project', (req, res) => {
  const { message, idUser, idTeacher, timeSendMessage , idProject} = req.body; // Destructure the new fields from the request body

  const sql = 'INSERT INTO push_porojects (message_student, id_user, id_teacher, id_project, time_send_student) VALUES (?, ?, ?, ?, ?)'; // Adjust the SQL query to include the new fields

  const values = [message, idUser, idTeacher, idProject, timeSendMessage]; // Add the new field values to the array

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'Error inserting data' });
    } else {
      console.log('Data inserted successfully');
      res.json({ message: 'Data inserted successfully' });
    }
  });
});


app.get('/api/get_events/:userId/:nameSpecifics', (req, res) => {
  const userId = req.params.userId;
  const nameSpecifics =  req.params.nameSpecifics;
  const selectSpecificsSql = `
  SELECT *
  FROM specifics 
  INNER JOIN groups ON specifics.id_group = groups.id
  where specifics.id_user = ? and specifics.id_nameSpecifics = ? and groups.group_finished = 0
  `;
  
  db.query(selectSpecificsSql, [userId, nameSpecifics],(specificsErr, specificsResult) => {
    if (specificsErr) {
      console.log(specificsErr);
      return res.json("Error");
    }
    if (specificsResult.length === 0) {
      return res.json("No specific events found.");
    }
    const firstSpecificEvent = specificsResult[0];

    if (firstSpecificEvent.group_finished === 0) {
      const selectEventsSql = `SELECT events.*, 
      CASE WHEN registrement_events.id_user IS NULL THEN 0 ELSE 1 END AS is_registered
      FROM events
      LEFT JOIN registrement_events ON events.id = registrement_events.id_event AND registrement_events.id_user = ?
      WHERE events.finished = 0
      ;
      `;
      db.query(selectEventsSql,[userId], (eventsErr, eventsResult) => {
        if (eventsErr) {
          console.log(eventsErr);
          return res.json("Error");
        }
  
        return res.json(eventsResult);
      });
    } else {
      return res.json([]);
    }
  });
});

app.post('/api/register_event', (req, res) => {
  const { id_user, id_event } = req.body;

  // Check if the registration already exists for the user and event
  const checkRegistrationSql = 'SELECT * FROM registrement_events WHERE id_user = ? AND id_event = ?';
  const checkRegistrationValues = [id_user, id_event];

  db.query(checkRegistrationSql, checkRegistrationValues, (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Error checking registration:', checkErr);
      res.status(500).json({ error: 'Error checking registration' });
    } else if (checkResult.length > 0) {
      // Registration already exists, return a message indicating that
      res.json({ message: 'User is already registered for this event' });
    } else {
      // Registration doesn't exist, insert the new registration
      const insertRegistrationSql = 'INSERT INTO registrement_events (id_user, id_event, valid) VALUES (?, ?, ?)';
      const insertRegistrationValues = [id_user, id_event, 0];

      db.query(insertRegistrationSql, insertRegistrationValues, (insertErr, insertResult) => {
        if (insertErr) {
          console.error('Error inserting data:', insertErr);
          res.status(500).json({ error: 'Error inserting data' });
        } else {
          console.log('Data inserted successfully');
          res.json({ message: 'Data inserted successfully' });
        }
      });
    }
  });
});

app.delete('/api/delete_registration', (req, res) => {
  const { id_user, id_event } = req.body;
  // Perform the delete operation in your database
  const deleteRegistrationSql = 'DELETE FROM registrement_events WHERE id_user = ? AND id_event = ?';
  const deleteRegistrationValues = [id_user, id_event];

  db.query(deleteRegistrationSql, deleteRegistrationValues, (deleteErr, deleteResult) => {
    if (deleteErr) {
      console.error('Error deleting registration:', deleteErr);
      res.status(500).json({ error: 'Error deleting registration' });
    } else {
      console.log('Registration deleted successfully');
      res.json({ message: 'Registration deleted successfully' });
    }
  });
});

app.delete('/api/delete_registration_competition', (req, res) => {
  const { id_user, id_competition } = req.body;
  
  // Perform the delete operation in your database
  const deleteRegistrationSql = 'DELETE FROM registrement_competition WHERE id_user = ? AND id_competition = ?';
  const deleteRegistrationValues = [id_user, id_competition];

  db.query(deleteRegistrationSql, deleteRegistrationValues, (deleteErr, deleteResult) => {
    if (deleteErr) {
      console.error('Error deleting registration:', deleteErr);
      res.status(500).json({ error: 'Error deleting registration' });
    } else {
      console.log('Registration deleted successfully');
      res.json({ message: 'Registration deleted successfully' });
    }
  });
});



app.post('/api/register_competition', (req, res) => {
  const { id_user, id_competition } = req.body;

  // Check if the registration already exists for the user and event
  const checkRegistrationSql = 'SELECT * FROM registrement_competition WHERE id_user = ? AND id_competition = ?';
  const checkRegistrationValues = [id_user, id_competition];

  db.query(checkRegistrationSql, checkRegistrationValues, (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Error checking registration:', checkErr);
      res.status(500).json({ error: 'Error checking registration' });
    } else if (checkResult.length > 0) {
      // Registration already exists, return a message indicating that
      res.json({ message: 'User is already registered for this event' });
    } else {
      // Registration doesn't exist, insert the new registration
      const insertRegistrationSql = 'INSERT INTO registrement_competition (id_user, id_competition, valid) VALUES (?, ?, ?)';
      const insertRegistrationValues = [id_user, id_competition, 0];

      db.query(insertRegistrationSql, insertRegistrationValues, (insertErr, insertResult) => {
        if (insertErr) {
          console.error('Error inserting data:', insertErr);
          res.status(500).json({ error: 'Error inserting data' });
        } else {
          console.log('Data inserted successfully');
          res.json({ message: 'Data inserted successfully' });
        }
      });
    }
  });
});



app.get('/api/get_competitions/:userId/:nameSpecifics', (req, res) => {
  const userId = req.params.userId;
  const nameSpecifics =  req.params.nameSpecifics;
  const selectSpecificsSql = `
  SELECT *
  FROM specifics 
  INNER JOIN groups ON specifics.id_group = groups.id
  where specifics.id_user = ? and specifics.id_nameSpecifics = ? and groups.group_finished = 0
  `;
  
  db.query(selectSpecificsSql, [userId, nameSpecifics],(specificsErr, specificsResult) => {
    if (specificsErr) {
      console.log(specificsErr);
      return res.json("Error");
    }
    if (specificsResult.length === 0) {
      return res.json([]);
    }
    const firstSpecificEvent = specificsResult[0];

    if (firstSpecificEvent.group_finished === 0) {
      const selectEventsSql = `SELECT competitions.*, CASE WHEN registrement_competition.id_user IS NULL THEN 0 ELSE 1 END AS is_registered FROM competitions LEFT JOIN registrement_competition ON competitions.id = registrement_competition.id_competition AND registrement_competition.id_user = 2 WHERE competitions.finished = 0;
      `;

      db.query(selectEventsSql,[userId], (eventsErr, eventsResult) => {
        if (eventsErr) {
          console.log(eventsErr);
          return res.json("Error");
        }
  
        return res.json(eventsResult);
      });
    } else {
      return res.json([]);
    }
  });
});

app.get('/get_user_levle/:now/:next', (req, res) => {
  const now = parseInt(req.params.now); // Convert to integer
  const next = parseInt(req.params.next); // Convert to integer
  const selectSql = 'SELECT user.*, level.level, (SELECT COUNT(DISTINCT id) FROM registrement_events WHERE id_user = user.id AND valid = 1) AS valid_event_count, (SELECT COUNT(DISTINCT id) FROM registrement_competition WHERE id_user = user.id AND valid = 1) AS valid_competition_count, COUNT(DISTINCT CASE WHEN validation_projects.valid_project = 1 THEN validation_projects.id ELSE NULL END) AS valid_project_count FROM user LEFT JOIN validation_projects ON user.id = validation_projects.id_user LEFT JOIN level ON user.id = level.id_user GROUP BY user.id LIMIT ? OFFSET ?';
  db.query(selectSql,[next, now], (selectErr, selectResult) => {
    if (selectErr) {
      console.log(selectErr);
      return res.json("Error");
    }
    console.log(selectResult)
    return res.json(selectResult);
  });
});



app.get('/get_each_user_levle/:id/', (req, res) => {
  const id = parseInt(req.params.id);
  const selectSql = `SELECT user.*, level.*, (SELECT COUNT(DISTINCT id) 
  FROM registrement_events WHERE id_user = user.id AND valid = 1) AS valid_event_count, 
  (SELECT COUNT(DISTINCT id) FROM registrement_competition 
  WHERE id_user = user.id AND valid = 1) AS valid_competition_count, 
  COUNT(DISTINCT CASE WHEN validation_projects.valid_project = 1 THEN validation_projects.id ELSE NULL END) 
  AS valid_project_count FROM user LEFT JOIN validation_projects ON user.id = validation_projects.id_user
  LEFT JOIN level ON user.id = level.id_user WHERE user.id = ? GROUP BY user.id`;
  db.query(selectSql,[id], (selectErr, selectResult) => {
    if (selectErr) {
      console.log(selectErr);
      return res.json("Error");
    }
    return res.json(selectResult);
  });
});



app.get('/api/getProjectsAndResources', (req, res) => {
  const query = `
  SELECT p.id AS projectId, p.name_project AS projectName, p.description AS projectDescription, p.image_project AS imgProject, p.id_collection AS idCollection, p.count_exp AS Xp,
  r.id AS resourceId, r.name_ressource AS resourceName, r.link_ressource AS resourceInfo, r.id_project AS idProjectR
FROM projects p
LEFT JOIN ressources_projects r ON p.id = r.id_project
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error fetching data from the database' });
      return;
    }
    const languageAndLinks = {};
    results.forEach(row => {
      if (!languageAndLinks[row.projectId]) {
        languageAndLinks[row.projectId] = {
          projectId: row.projectId,
          projectName: row.projectName,
          projectDescription: row.projectDescription,
          projectImgProject:row.imgProject,
          projectIdCollection:row.idCollection,
          projectXp:row.Xp,
          resources: [],
        };
      }
      if (row.resourceId) {
        languageAndLinks[row.projectId].resources.push({
          resourceId: row.resourceId,
          resourceName: row.resourceName,
          resourceInfo: row.resourceInfo,
          resourceIdProjectR: row.idProjectR,
        });
      }
    });

    const projectsArray = Object.values(languageAndLinks);
    res.json(projectsArray);
  });
});



app.get('/api/getLanguagesAndLinks/:idCollection', (req, res) => {
  const idCollection = req.params.idCollection;
  const query = `
  SELECT *, l.id AS idLanguage, li.id AS idLinkLanguage
  FROM languages l
  LEFT JOIN links_languages li ON l.id = li.id_language
  WHERE l.id_collection = ?;
    `;

  db.query(query,[idCollection], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error fetching data from the database' });
      return;
    }
    const languageAndLinks = {};
    results.forEach(row => {
      if (!languageAndLinks[row.idLanguage]) {
        languageAndLinks[row.idLanguage] = {
          languageId: row.idLanguage,
          languageName: row.name_language,
          languageIcon: row.name_icon,
          languageDescription:row.description,
          languageIdCollection:row.id_collection,
          links: [],
        };
      }
      if (row.idLinkLanguage) {
        languageAndLinks[row.idLanguage].links.push({
          linkId: row.idLinkLanguage,
          linkIdLanguage: row.id_language,
          linkName: row.name_link,
          link: row.link,
        });
      }
    });

    const projectsArray = Object.values(languageAndLinks);
    res.json(projectsArray);
  });
});

// api get tools and their links

app.get('/api/getToolsAndLinks/:idCollection', (req, res) => {
  const idCollection = req.params.idCollection;
  const query = `
  SELECT *, t.id AS idTool, lt.id AS idLinkTool
  FROM tools t
  LEFT JOIN links_tools lt ON t.id = lt.id_tools
  WHERE t.id_collection = ?;
    `;

  db.query(query,[idCollection], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error fetching data from the database' });
      return;
    }
    const languageAndLinks = {};
    results.forEach(row => {
      if (!languageAndLinks[row.idTool]) {
        languageAndLinks[row.idTool] = {
          toolId: row.idTool,
          toolName: row.name_tool,
          toolIcon: row.name_icon,
          toolDescription:row.description,
          toolIdCollection:row.id_collection,
          links: [],
        };
      }
      if (row.idLinkTool) {
        languageAndLinks[row.idTool].links.push({
          linkId: row.idLinkTool,
          linkIdTool: row.id_tools,
          linkName: row.name_link,
          link: row.link,
        });
      }
    });

    const projectsArray = Object.values(languageAndLinks);
    res.json(projectsArray);
  });
});



app.get('/api/search/:input', (req, res) => {
  const input = req.params.input;
  const selectSql = "SELECT * FROM user WHERE firstName LIKE ? OR lastName LIKE ? ORDER BY LENGTH(firstName) LIMIT 7;";
  db.query(selectSql,[`${input}%`, `${input}%`], (selectErr, selectResult) => {
    if (selectErr) {
      console.log(selectErr);
      return res.json("Error");
    }
    return res.json(selectResult);
  });
});

// Create API endpoint for fetching data from the user table

app.get('/api/get_skills/:id', (req, res) => {
  const id = req.params.id;
  const selectSql = `SELECT name_specifics.shurt_name, COALESCE(specifics.validation, 0) 
  AS validation, COALESCE(specifics.validation_week, 0) 
  AS validation_week FROM name_specifics LEFT JOIN specifics 
  ON name_specifics.id = specifics.id_nameSpecifics AND specifics.id_user = ?;`;
  db.query(selectSql,[id], (selectErr, selectResult) => {
    if (selectErr) {
      console.log(selectErr);
      return res.json("Error");
    }
    return res.json(selectResult);
  });
});

// try to get count of exp 

app.get('/api/get_count_exp/:id', (req, res) => {
  const id = req.params.id;
  const selectSql = 
  `SELECT SUM(projects.count_exp) / 100 as exp FROM validation_projects 
  INNER JOIN projects on validation_projects.id_project = projects.id  
  WHERE validation_projects.id_user = ?`;
  db.query(selectSql,[id], (selectErr, selectResult) => {
    if (selectErr) {
      console.log(selectErr);
      return res.json("Error");
    }
    console.log(selectResult);
    return res.json(selectResult);
  });
});

// try to update or inser the levl or updat it
app.post('/api/update_level/:id', (req, res) => {
  const { exp, id_user, background } = req.body;
  const id = req.params.id;

  // Use UPDATE statement instead of INSERT
  const sql = 'UPDATE level SET level = ?, background = ? WHERE id_user = ?';

  const values = [exp, background + 0, id_user];

    // console.log("background test : ",background);
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).json({ error: 'Error updating data' });
    } else {
      console.log('Data updated successfully');
      res.json({ message: 'Data updated successfully' });
    }
  });
});

// validtion specific
app.get('/api/validation_specific/:id/:idCollection', (req, res) => {
  const id = req.params.id;
  const idCollection = req.params.idCollection; // Corrected variable name
  const selectSql = `SELECT validation FROM specifics WHERE id_nameSpecifics = ? and id_user = ?`;

  db.query(selectSql, [idCollection, id], (selectErr, selectResult) => {
    if (selectErr) {
      console.log(selectErr);
      return res.json("Error");
    }
    console.log(selectResult);
    return res.json(selectResult);
  });
});


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

// Login with intra 42

app.post("/api/registerIntra", (req, res) => {
  let {userData } = req.body;
  const uploadedImage = req.file;
  const currentDate = new Date();
  console.log(userData)
  let valid =  0;
  const selectUser = 'SELECT id FROM user WHERE email = ?';
  db.query(selectUser, [userData.email], (error, idResult) => {
    if (error) {
      console.error('Error querying user:', error);
      res.status(500).json({ message: 'Error querying user' });
      return;
    }

    if (idResult.length !== 0) {
      console.log('User with the same email already exists');
      res.status(200).json({ message: 'User already exists' , idUser: idResult[0].id });
    } else {
      const insertUserQuery = 'INSERT INTO user(firstName, password, lastName, email, phone, image, date_registered) VALUES (?, ?, ?, ?, ?, ?, ?)';
      db.query(insertUserQuery, [userData.first_name, '@' + userData.login, userData.last_name, userData.email, "null",userData.image, currentDate], (insertError, userResult) => {
        if (insertError) {
          console.error('Error inserting into user:', insertError);
          res.status(500).json({ message: 'Error inserting into user'});
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
          db.query(insertSpecific, [userId, 3, 1, 0, 0, 20, currentDate], (specificError, specificResult) => {
            if (specificError) {
              console.error('Error inserting into specifics:', specificError);
              res.status(500).json({ message: 'Error inserting into specifics' });
              return;
            }
            // if(!payment)
            //   payment = 0;
            const insertPayment = 'INSERT INTO payment(payment, valid, date_payment, id_user) VALUES (?, ?, ?, ?)';
            db.query(insertPayment, [0 , valid, currentDate, userId], (paymentError, paymentResult) => {
              if (paymentError) {
                console.error('Error inserting into payment:', paymentError);
                res.status(500).json({ message: 'Error inserting into payment' });
                return;
              }

              res.status(200).json({ message: "Image uploaded successfully" ,idUser: userId });
            });
          });
        });
      });
    }
  });
});

app.listen(8081, () => {
  console.log("Listening on port 8081");
});
