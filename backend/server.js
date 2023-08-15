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

app.get('/api/get_levels/:id', (req, res) => {
  const id = req.params.id;
  const selectSql = `SELECT * FROM level WHERE id_user = ?`;
  db.query(selectSql, [id], (selectErr, selectResult) => {
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
  const selectSql = `SELECT * FROM projects WHERE id_collection = ?`;
  db.query(selectSql, [selectedOptionKey], (selectErr, selectResult) => {
    if (selectErr) {
      console.log(selectErr);
      return res.json("Error"); 
    }
    // console.log(selectResult);
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
    // console.log(selectResult);
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
    console.log(selectResult);
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
  WHERE push_porojects.id_project = ? and push_porojects.id_user = ?`;
  db.query(selectSql, [idProject, idUser], (selectErr, selectResult) => {
    if (selectErr) {
      console.log(selectErr);
      return res.json("Error"); 
    }
    // console.log(selectResult);
    return res.json(selectResult);
  });
});

app.get('/api/get_idTeacher/:idUser', (req, res) => {

  const idUser = req.params.idUser;
  const selectSql = `SELECT teacher_groups.id_teacher FROM (specifics INNER JOIN teacher_groups ON specifics.id_group = teacher_groups.id_group) WHERE specifics.id_user = ?`;

  db.query(selectSql,[idUser], (selectErr, selectResult) => {
    if (selectErr) {
      console.log(selectErr);
      return res.json("Error");
    }
    // console.log(selectResult);
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
  console.log("look", userId)
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
      const selectEventsSql = `SELECT * FROM events where finished = 0`;

      db.query(selectEventsSql, (eventsErr, eventsResult) => {
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

app.get('/get_user_levle/:now/:next', (req, res) => {
  const now = parseInt(req.params.now); // Convert to integer
  const next = parseInt(req.params.next); // Convert to integer
  const selectSql = 'SELECT user.*, level.level, (SELECT COUNT(DISTINCT id) FROM registrement_events WHERE id_user = user.id AND valid = 1) AS valid_event_count, (SELECT COUNT(DISTINCT id) FROM registrement_competition WHERE id_user = user.id AND valid = 1) AS valid_competition_count, COUNT(DISTINCT CASE WHEN validation_projects.valid = 1 THEN validation_projects.id ELSE NULL END) AS valid_project_count FROM user LEFT JOIN validation_projects ON user.id = validation_projects.id_user LEFT JOIN level ON user.id = level.id_user GROUP BY user.id LIMIT ? OFFSET ?';
  db.query(selectSql,[next, now], (selectErr, selectResult) => {
    if (selectErr) {
      console.log(selectErr);
      return res.json("Error");
    }
    return res.json(selectResult);
  });
});



app.get('/get_each_user_levle/:id/', (req, res) => {
  const id = parseInt(req.params.id);
  const selectSql = 'SELECT user.*, level.*, (SELECT COUNT(DISTINCT id) FROM registrement_events WHERE id_user = user.id AND valid = 1) AS valid_event_count, (SELECT COUNT(DISTINCT id) FROM registrement_competition WHERE id_user = user.id AND valid = 1) AS valid_competition_count, COUNT(DISTINCT CASE WHEN validation_projects.valid = 1 THEN validation_projects.id ELSE NULL END) AS valid_project_count FROM user LEFT JOIN validation_projects ON user.id = validation_projects.id_user LEFT JOIN level ON user.id = level.id_user WHERE user.id = ? GROUP BY user.id';
  db.query(selectSql,[id], (selectErr, selectResult) => {
    if (selectErr) {
      console.log(selectErr);
      return res.json("Error");
    }
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
