    const nodemailer = require('nodemailer');
    require('dotenv').config();
    const db = require("./db");

    function sendEmail(emailList, subject, message, emails) {

        // const query = 'SELECT  firstName, password FROM user WHERE id IN (?)';
        // db.query(query, [emails], (error, results) => {
        //     if (error) {
        //       console.error("Error fetching emails from database:", error);
        //       return res.status(500).json({ message: "Error fetching emails", error });
        //     }
        //   })
        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: process.env.NODEJS_APP_EMAIL,
        //         pass: process.env.NODEJS_APP_PASSWORD,
        //     },
        // });
    
        const mailOptions = {
            from: process.env.NODEJS_APP_EMAIL,
            to: emailList.join(','), 
            subject: subject,
            text: message,
        };
    
        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(info.response);
                }
            });
        });
    }
    
    module.exports = sendEmail;