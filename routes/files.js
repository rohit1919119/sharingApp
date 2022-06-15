const { response } = require('express');
const multer = require('multer')
const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
const router = require('express').Router();
const path = require('path');
const File = require('../models/file');
const { v4: uuid4 } = require('uuid');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
})
console.log("here we go");

let upload = multer({
    storage,
    limits: { fileSize: 1000000 * 100 },
}).single('myfile');



router.post('/', (req, res) => {


    // Store File

    upload(req, res, async (err) => {
        // Validate Data

        if (!req.file) {
            console.log("yo1");
            return response.json({ error: "All fields are required." });
        }

        if (err) {
            console.log("yo2 ");
            return res.status(500).send({ error: err.message });

        }
        // Store into Database

        console.log("om1");


        const file = new File({
            filename: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size,
        });

        console.log("om2");
        const response = await file.save();

        console.log("om3");

        return res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` })

    });


    // Send Respose
})


router.post('/send', async (req, res) => {

    const { uuid, emailTo, emailFrom } = req.body;

    // Validate request 
    if (!uuid || !emailTo || !emailFrom) {
        return res.status(422).send({ error: 'All fields are required!' });
    }

    // Get data from Database

    const file = await File.findOne({ uuid: uuid });

    if (file.sender) {
        return res.status(422).send({ error: 'Email already sent' });
    }

    file.sender = emailFrom;
    file.receiver = emailTo;
    const response = await file.save();


    // Send email

    const sendMail= require('../services/mailService');
    sendMail({
        from : emailFrom,
        to : emailTo,
        subject : 'inShare file sharing',
        text : `${emailFrom} shared a file with you.`,
        html : require('../services/emailTemplate')({
            emailFrom : emailFrom,
            downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
            size : parseInt(file.size/100) + 'KB',
            expires : '24 hours'
        })
    });


    // const log = console.log;

//     // Step 1
//     const auth = {
//         auth: {
//             api_key: process.env.API_KEY, // TODO: 
//             domain: process.env.DOMAIN  // TODO:
//         }
//     };

//     // Step 2
//     let transporter = nodemailer.createTransport(mailGun(auth));


//     // Step 3
//     let mailOptions = {
//         from: 'theunderrated17@gmail.com', // TODO: email sender
//         to: 'formalrohit002@gmail.com', // TODO: email receiver
//         subject: 'Nodemailer - Test',
//         text: 'Wooohooo it works!!'
//     };

//     // Step 4
//     transporter.sendMail(mailOptions, (err, data) => {
//         if (err) {
//             return log(err);
//         }
//         return log('Email sent!!!');
//     });


    return res.send({ success: true });

})



module.exports = router;