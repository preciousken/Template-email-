const http = require('http');
const express = require("express");
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const app = express();

require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: "Gmail",  
    port: `${process.env.EMAIL_PORT}`, secure: true, auth: {
        user: `${process.env.USER}`, pass: `${process.env.PASS}`
    },
});


transporter.use('compile', hbs({
    viewEngine: {
        extname: '.hbs',
        layoutsDir: 'templates/',
        defaultLayout: false,
        partialsDir: 'templates/',
    }, viewPath: 'templates/', extName: '.hbs'
}));


app.get('/send-email', async (req, res) => {
    try {
        transporter.sendMail({
            from: `Anonymous Coder<${process.env.USER}>`,
            to: `${email}`,
            subject: 'Your first nodemail',
            template: 'email_template',
            context: {
                name: 'Anonymous Coder',
                school: 'Federal University of Technology, Akure......'
            }
        }, () => {
            res.status(200).send('Email sent')
        })
    } catch {
        return res.status(400).send('Email not sent')
    }
})


const server = http.createServer(app);

server.listen(process.env.PORT || 4000, () => {
    console.log(`Server running on port ${4000}`);
});