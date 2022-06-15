const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
const log = console.log;


module.exports = async ({from, to, subject, text, html})=> {


    // Step 1
    const auth = {
        auth: {
            api_key: process.env.API_KEY, // TODO: 
            domain: process.env.DOMAIN  // TODO:
        }
    };

    // Step 2
    let transporter = nodemailer.createTransport(mailGun(auth));


    // Step 3
    let mailOptions = {
        from: 'theunderrated17@gmail.com', // TODO: email sender
        to: 'formalrohit002@gmail.com', // TODO: email receiver
        subject: subject,
        text: text,
        html: html
    };

    // Step 4
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return log(err);
        }
        return log('Email sent!!!');
    });

}




















// var nodemailer = require('nodemailer');
// // send mail with password confirmation
// var transporter = nodemailer.createTransport( {
//     service:  'Mailgun',
//     auth: {
//      user: 'postmaster@sandboxXXXXXXXXXXXXXXXX.mailgun.org',
//      pass: 'XXXXXXXXXXXXXXXX'
//     }
// });
// var mailOpts = {
//     from: 'office@yourdomain.com',
//     to: 'user@gmail.com',
//     subject: 'test subject',
//     text : 'test message form mailgun',
//     html : '<b>test message form mailgun</b>'
// };
// transporter.sendMail(mailOpts, function (err, response) {
//     if (err) {
//      //ret.message = "Mail error.";
//     } else {
//      //ret.message = "Mail send.";
//     }
// });


















// // const nodemailer = require("nodemailer");


// // async function sendMail({from, to, subject, text, html}){


// //     // using sending blue thirrd party for host email


// //     let transporter = nodemailer.createTransport({
// //         host: process.env.SMTP_HOST,
// //         port: process.env.SMTP_PORT,
// //         secure: false, // true for 465, false for other ports
// //         auth: {
// //           user: process.env.MAIL_USER, // generated ethereal user
// //           pass: process.env.MAIL_PASSWORD, // generated ethereal password
// //         },
// //     });


// //     let info = await transporter.sendMail({
// //         from: `inShare <${from}>` , // sender address
// //         to, // list of receivers
// //         subject, // Subject line
// //         text, // plain text body
// //         html // html body
// //     });

// //     console.log("Message sent: %s", info.messageId);

// // }


// // module.exports = sendMail;



// // // const Sib = require('sib-api-v3-sdk')
// // // const client = Sib.ApiClient.instance
// // // const apiKey = client.authentications['api-key']
// // // apiKey.apiKey = process.env.API_KEY


// // // const tranEmailApi = new Sib.TransactionalEmailsApi()
// // // const sender = {
// // //     email: 'formalrohit002@gmail.com',
// // //     name: 'Rohit Rawat',
// // // }
// // // const receivers = [
// // //     {
// // //         email: 'theunderrated17@gmail.com',
// // //     },
// // // ]



// // // module.exports= tranEmailApi
// // //     .sendTransacEmail({
// // //         sender,
// // //         to: receivers,
// // //         subject: 'Subscribe to Cules Coding to become a developer',
// // //         textContent: `
// // //         Cules Coding will teach you how to become {{params.role}} a developer.
// // //         `,
// // //         htmlContent: `
// // //         <h1>Cules Coding</h1>
// // //         <a href="https://cules-coding.vercel.app/">Visit</a>
// // //                 `,
// // //         params: {
// // //             role: 'Frontend',
// // //         },
// // //     })
// // //     .then(console.log)
// // //     .catch(console.log)





