const nodemailer = require('nodemailer');
require('dotenv').config();
// const db = require("./db");


function sendEmail(emailList, subject, message, emails) {
    console.log("do you see this messge i write it okkk bro :::===> ",process.env.NODEJS_APP_EMAIL, process.env.NODEJS_APP_PASSWORD)

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
