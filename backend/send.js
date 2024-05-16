    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'abdelkarim.hajji.2001@gmail.com',
        pass: 'hohuipseljskynal',
    },
    });

    const mailOptions = {
    from: 'abdelkarim.hajji.2001@gmail.com',
    to: 'salmi19971@gamil.com',
    subject: 'Hello from Node.js',
    text: 'This is a test email sent from Node.js using Nodemailer.',
    };

    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent:', info.response);
    }
    });
