    const nodemailer = require('nodemailer');
    require('dotenv').config();

    function sendEmail(emailList, subject, message) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEJS_APP_EMAIL,
                pass: process.env.NODEJS_APP_PASSWORD,
            },
        });
    
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